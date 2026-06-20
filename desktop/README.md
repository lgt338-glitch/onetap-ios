# OneTap ReBoot — MVP installer

Apple 공식 CDN 에서 iOS 펌웨어를 받아오는 단일 `.exe` 데스크탑 앱.

## 동작

```
사용자        OneTapReBoot.exe         onetap-ios.pages.dev      Apple CDN
  │                  │                          │                    │
  ├──── 실행 ─────→  │                          │                    │
  │                  ├─ /firmware/iPhone15,2 ─→ │                    │
  │                  │ ←── { signed: [{url}] }  │                    │
  │                  ├─────────── GET (Apple-signed URL) ──────────→ │
  │                  │ ←─────────  6GB IPSW 스트림 ─────────────────  │
  │                  ├── SHA1 검증               │                    │
  ├←── 완료 ───────  │                          │                    │
```

## 빌드 (개발자용)

```bash
cd desktop
npm install --no-save @yao-pkg/pkg
npm run build:win
# → dist/OneTapReBoot-Setup.exe (~45MB, Node 22 런타임 포함)
```

## 실행 (사용자)

`.exe` 더블클릭 → 모델 선택 → y 입력 → 다운로드 + 검증 → `~/OneTap/firmware/` 에 저장.

## 다음 단계

- [ ] USB 연결된 iPhone 자동 감지 (libimobiledevice 통합)
- [ ] 실제 복구 모드 진입 + 펌웨어 플래싱 (idevicerestore 통합)
- [ ] GUI 화 (Tauri 또는 Neutralino)
- [ ] 코드 서명 (Windows SmartScreen 회피)
- [ ] 자동 업데이트 (`/api/latest/reboot` 활용)
