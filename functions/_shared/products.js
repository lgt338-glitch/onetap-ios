// 제품 슬러그 → release 태그 prefix 매핑.
// 새 제품 출시 시 여기에 한 줄만 추가하면 /download/{slug}/{platform} 라우팅이 자동 동작합니다.
//
// release 태그 컨벤션: "<slug>-v<버전>"  예) reboot-v1.2.0, unlock-v1.0.5
// 에셋 파일명 컨벤션: 플랫폼 키워드가 파일명에 들어가야 함.
//   Windows: -windows-, -win-, .exe, .msi
//   macOS  : -mac-, -macos-, .dmg, .pkg
//   Linux  : -linux-, .AppImage, .deb

export const REPO = "lgt338-glitch/onetap-ios";

export const PRODUCTS = {
  reboot:     { tag: "reboot-",     name: "OneTap ReBoot" },
  recover:    { tag: "recover-",    name: "OneTap Recover" },
  cleaner:    { tag: "cleaner-",    name: "OneTap Cleaner" },
  unlock:     { tag: "unlock-",     name: "OneTap UnLock" },
  unlockpro:  { tag: "unlockpro-",  name: "OneTap UnLock Pro" },
  screentime: { tag: "screentime-", name: "OneTap ScreenTime" },
  transfer:   { tag: "transfer-",   name: "OneTap Transfer" },
  chatback:   { tag: "chatback-",   name: "OneTap ChatBack" },
  mirror:     { tag: "mirror-",     name: "OneTap Mirror" },
  pretty:     { tag: "pretty-",     name: "OneTap Pretty" },
  pdfai:      { tag: "pdfai-",      name: "OneTap PDF AI" },
  translator: { tag: "translator-", name: "OneTap Translator" },
  locsync:    { tag: "locsync-",    name: "OneTap LocSync" },
};

export const PLATFORM_PATTERNS = {
  win:   [/-win(dows)?[-.]/i, /\.exe$/i, /\.msi$/i],
  mac:   [/-mac(os)?[-.]/i, /\.dmg$/i, /\.pkg$/i],
  linux: [/-linux[-.]/i, /\.AppImage$/i, /\.deb$/i],
};

// 공통: 해당 제품의 최신 (draft 제외, 태그 prefix 일치) release 한 건을 찾는다.
export async function findLatestRelease(slug) {
  const product = PRODUCTS[slug];
  if (!product) return { error: "product not found", status: 404 };

  const url = `https://api.github.com/repos/${REPO}/releases?per_page=30`;
  let releases;
  try {
    const r = await fetch(url, {
      headers: {
        "User-Agent": "onetap-ios-pages",
        Accept: "application/vnd.github+json",
      },
      cf: { cacheEverything: true, cacheTtl: 300 },
    });
    if (!r.ok) return { error: `github api ${r.status}`, status: 502, product };
    releases = await r.json();
  } catch {
    return { error: "github unreachable", status: 502, product };
  }

  const release = releases.find(
    (rel) => rel.tag_name?.startsWith(product.tag) && !rel.draft
  );
  if (!release) return { error: "no release yet", status: 404, product };

  return { release, product };
}
