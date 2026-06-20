#!/usr/bin/env node
// OneTap ReBoot — MVP installer (v0.1.0)
// ----------------------------------------
// 흐름:
//   1. 사용자에게 iPhone 모델 선택받기 (USB 자동 감지는 차후 libimobiledevice 통합)
//   2. https://onetap-ios.pages.dev/firmware/{모델} 호출 → Apple 서명된 IPSW 목록
//   3. Apple CDN (updates.cdn-apple.com) 에서 IPSW 직접 다운로드 (스트리밍, 진행률 표시)
//   4. SHA1 검증
//   5. ~/OneTap/firmware/ 에 저장 — 다음 단계 (실제 복구 실행) 의 입력이 됨
//
// 의존성 없음 (Node 내장 모듈만 사용) → 단일 .exe 패키징 용이.

"use strict";

const https = require("https");
const fs = require("fs");
const path = require("path");
const crypto = require("crypto");
const readline = require("readline");
const os = require("os");

const API = "https://onetap-ios.pages.dev";

// 주요 iPhone 모델 (확장 가능). identifier 는 Apple 의 공식 모델 코드.
const DEVICES = [
  { id: "iPhone17,1", name: "iPhone 16 Pro" },
  { id: "iPhone17,2", name: "iPhone 16 Pro Max" },
  { id: "iPhone17,3", name: "iPhone 16" },
  { id: "iPhone17,4", name: "iPhone 16 Plus" },
  { id: "iPhone16,1", name: "iPhone 15 Pro" },
  { id: "iPhone16,2", name: "iPhone 15 Pro Max" },
  { id: "iPhone15,4", name: "iPhone 15" },
  { id: "iPhone15,5", name: "iPhone 15 Plus" },
  { id: "iPhone15,2", name: "iPhone 14 Pro" },
  { id: "iPhone15,3", name: "iPhone 14 Pro Max" },
  { id: "iPhone14,7", name: "iPhone 14" },
  { id: "iPhone14,8", name: "iPhone 14 Plus" },
  { id: "iPhone14,2", name: "iPhone 13 Pro" },
  { id: "iPhone14,3", name: "iPhone 13 Pro Max" },
  { id: "iPhone14,5", name: "iPhone 13" },
  { id: "iPhone14,4", name: "iPhone 13 mini" },
];

const C = {
  reset: "\x1b[0m", dim: "\x1b[2m", bold: "\x1b[1m",
  blue: "\x1b[34m", cyan: "\x1b[36m", green: "\x1b[32m",
  yellow: "\x1b[33m", red: "\x1b[31m", gray: "\x1b[90m",
};

function banner() {
  console.log(`
${C.cyan}${C.bold}  ╔════════════════════════════════════════════════╗${C.reset}
${C.cyan}${C.bold}  ║          OneTap ReBoot   v0.1.0                ║${C.reset}
${C.cyan}${C.bold}  ║   iOS 시스템 복구 — Apple 공식 펌웨어 사용     ║${C.reset}
${C.cyan}${C.bold}  ╚════════════════════════════════════════════════╝${C.reset}
`);
}

function prompt(question) {
  const rl = readline.createInterface({ input: process.stdin, output: process.stdout });
  return new Promise((resolve) => {
    rl.question(question, (answer) => { rl.close(); resolve(answer.trim()); });
  });
}

function fetchJSON(url) {
  return new Promise((resolve, reject) => {
    https.get(url, { headers: { "User-Agent": "OneTapReBoot/0.1.0" } }, (res) => {
      if (res.statusCode !== 200) {
        reject(new Error(`HTTP ${res.statusCode} from ${url}`));
        return;
      }
      const chunks = [];
      res.on("data", (c) => chunks.push(c));
      res.on("end", () => {
        try { resolve(JSON.parse(Buffer.concat(chunks).toString("utf8"))); }
        catch (e) { reject(e); }
      });
      res.on("error", reject);
    }).on("error", reject);
  });
}

function fmtBytes(n) {
  if (n >= 1024 ** 3) return (n / 1024 ** 3).toFixed(2) + " GB";
  if (n >= 1024 ** 2) return (n / 1024 ** 2).toFixed(0) + " MB";
  if (n >= 1024) return (n / 1024).toFixed(0) + " KB";
  return n + " B";
}

function fmtTime(seconds) {
  if (!isFinite(seconds) || seconds < 0) return "?";
  if (seconds < 60) return `${Math.round(seconds)}s`;
  const m = Math.floor(seconds / 60), s = Math.round(seconds % 60);
  return `${m}m ${s}s`;
}

function progressBar(received, total) {
  const width = 30;
  const ratio = total > 0 ? received / total : 0;
  const filled = Math.round(ratio * width);
  return `[${"█".repeat(filled)}${C.gray}${"·".repeat(width - filled)}${C.reset}]`;
}

function downloadToFile(url, outPath, expectedSize) {
  return new Promise((resolve, reject) => {
    let redirectsLeft = 5;
    const get = (u) => {
      const req = https.get(u, { headers: { "User-Agent": "OneTapReBoot/0.1.0" } }, (res) => {
        if (res.statusCode >= 300 && res.statusCode < 400 && res.headers.location) {
          if (redirectsLeft-- <= 0) { reject(new Error("Too many redirects")); return; }
          res.resume();
          const next = new URL(res.headers.location, u).toString();
          get(next);
          return;
        }
        if (res.statusCode !== 200) {
          reject(new Error(`HTTP ${res.statusCode}`));
          return;
        }
        const total = expectedSize || Number(res.headers["content-length"]) || 0;
        let received = 0;
        const startedAt = Date.now();
        const out = fs.createWriteStream(outPath);
        let lastPaint = 0;

        res.on("data", (chunk) => {
          received += chunk.length;
          const now = Date.now();
          if (now - lastPaint > 200 || received === total) {
            lastPaint = now;
            const elapsed = (now - startedAt) / 1000;
            const speed = received / 1024 / 1024 / elapsed;
            const remaining = total > 0 && speed > 0 ? (total - received) / 1024 / 1024 / speed : NaN;
            const pct = total > 0 ? (received / total * 100).toFixed(1).padStart(5) : "  ?  ";
            process.stdout.write(
              `\r  ${progressBar(received, total)} ${pct}%  ` +
              `${fmtBytes(received).padStart(8)} / ${fmtBytes(total).padEnd(8)}  ` +
              `${speed.toFixed(1)} MB/s  ETA ${fmtTime(remaining).padEnd(8)}`
            );
          }
        });

        res.pipe(out);
        out.on("finish", () => { process.stdout.write("\n"); out.close(() => resolve()); });
        out.on("error", reject);
        res.on("error", reject);
      });
      req.on("error", reject);
    };
    get(url);
  });
}

function sha1File(filePath) {
  return new Promise((resolve, reject) => {
    const hash = crypto.createHash("sha1");
    fs.createReadStream(filePath)
      .on("data", (d) => hash.update(d))
      .on("end", () => resolve(hash.digest("hex")))
      .on("error", reject);
  });
}

async function pause(msg) {
  await prompt(`${C.dim}${msg}${C.reset}`);
}

async function main() {
  banner();
  console.log(`${C.dim}이 프로그램은 Apple 공식 CDN 에서만 펌웨어를 받습니다.\n` +
              `펌웨어 트래픽은 Apple 인프라가 부담합니다.${C.reset}\n`);

  console.log(`${C.bold}[1/4]${C.reset} 복구할 iPhone 모델을 선택하세요:\n`);
  DEVICES.forEach((d, i) => {
    console.log(`   ${String(i + 1).padStart(2)}. ${d.name.padEnd(24)} ${C.gray}${d.id}${C.reset}`);
  });
  const sel = parseInt(await prompt(`\n   번호 입력 > `), 10);
  const device = DEVICES[sel - 1];
  if (!device) {
    console.log(`${C.red}잘못된 선택입니다.${C.reset}`);
    await pause("\n엔터를 눌러 종료...");
    process.exit(1);
  }

  console.log(`\n${C.bold}[2/4]${C.reset} ${C.cyan}${device.name}${C.reset} 의 최신 펌웨어 정보 조회 중...\n`);
  const meta = await fetchJSON(`${API}/firmware/${device.id}`);
  if (!meta.signed || meta.signed.length === 0) {
    console.log(`${C.red}현재 Apple 에서 서명 중인 펌웨어가 없습니다.${C.reset}`);
    await pause("\n엔터를 눌러 종료...");
    process.exit(1);
  }
  const fw = meta.signed[0];
  console.log(`   ${C.green}✓${C.reset} iOS ${C.bold}${fw.version}${C.reset}  (build ${fw.buildid})`);
  console.log(`   ${C.green}✓${C.reset} 용량: ${C.bold}${fmtBytes(fw.filesize)}${C.reset}`);
  console.log(`   ${C.green}✓${C.reset} SHA1: ${C.gray}${fw.sha1}${C.reset}`);
  console.log(`   ${C.green}✓${C.reset} 출처: ${C.gray}${new URL(fw.url).hostname}${C.reset}`);

  const confirm = await prompt(`\n   계속 진행하시겠습니까? (y/n) > `);
  if (confirm.toLowerCase() !== "y" && confirm !== "ㅛ") {
    console.log(`${C.dim}취소되었습니다.${C.reset}`);
    process.exit(0);
  }

  const outDir = path.join(os.homedir(), "OneTap", "firmware");
  fs.mkdirSync(outDir, { recursive: true });
  const outPath = path.join(outDir, `${device.id}_${fw.version}_${fw.buildid}.ipsw`);

  console.log(`\n${C.bold}[3/4]${C.reset} Apple CDN 에서 다운로드:\n   ${C.gray}${outPath}${C.reset}\n`);
  await downloadToFile(fw.url, outPath, fw.filesize);

  console.log(`\n${C.bold}[4/4]${C.reset} SHA1 검증 중...`);
  const hash = await sha1File(outPath);
  if (hash.toLowerCase() === fw.sha1.toLowerCase()) {
    console.log(`   ${C.green}✓ 검증 성공${C.reset} — 펌웨어 무결성 확인됨`);
  } else {
    console.log(`   ${C.red}✗ 검증 실패${C.reset}`);
    console.log(`   받은 SHA1 : ${hash}`);
    console.log(`   예상 SHA1 : ${fw.sha1}`);
    await pause("\n엔터를 눌러 종료...");
    process.exit(1);
  }

  console.log(`\n${C.green}${C.bold}완료.${C.reset}`);
  console.log(`${C.dim}펌웨어는 ${outPath} 에 저장되었습니다.${C.reset}`);
  console.log(`${C.dim}다음 업데이트에서 실제 iPhone 복구 (idevicerestore 통합) 가 추가됩니다.${C.reset}\n`);
  await pause("엔터를 눌러 종료...");
}

main().catch(async (err) => {
  console.error(`\n${C.red}오류:${C.reset} ${err.message}`);
  if (process.env.DEBUG) console.error(err.stack);
  await pause("\n엔터를 눌러 종료...");
  process.exit(1);
});
