# OneTap (desktop)

오픈소스 기반 iOS 디바이스 유틸리티. PoC.

## Stack
- Electron (UI)
- Python sidecar: [pymobiledevice3](https://github.com/doronz88/pymobiledevice3) (MIT)

## 사전 요구사항
- Node.js 18+
- Python 3.10+
- iTunes (Apple Mobile Device USB driver 용)
- iPhone 을 USB 로 연결, "이 컴퓨터를 신뢰" 허용

## 설치
```powershell
cd onetap-app
npm install
npm run py:setup
```

## 실행
```powershell
npm start
```

## 현재 기능 (Week 1-2 PoC)
- 연결된 iPhone/iPad 모델·iOS 버전·UDID·시리얼·저장공간·배터리 표시
- 5초마다 자동 새로 고침

## 다음 단계 (Week 3+)
- 복구 모드 / DFU 진입 자동화 (`idevicerestore`)
- iTunes 백업 추출 (`pymobiledevice3 backup2`)
- IPSW 다운로드 + 복원
