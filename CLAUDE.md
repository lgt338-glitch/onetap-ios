# CLAUDE.md — OneTap iOS 상세페이지 작업 지침

> VS Code Claude Code 가 이 저장소에서 **제품 상세페이지**를 작업할 때 따라야 하는 지침서.
> 목표: "전문 디자이너가 작업한 듯한 트렌디한 상세페이지"를 일관된 톤으로 양산한다.

---

## 0. 프로젝트 한눈에 보기

- **사이트**: OneTap iOS (정적 HTML/CSS/JS, 외부 빌드 도구 없음)
- **다국어**: `i18n.js` — `ko / en / zh` 3종 (T.en, T.zh 사전 갱신 필수)
- **공용 자산**: `styles.css`, `i18n.js`, `auth.js`
- **기존 상세계열 페이지**: `복구솔루션.html`, `암호해제.html`, `데이터전송.html`, `베스트세일.html`
- **신규 상세페이지** 파일명 규칙: `제품명-detail.html` (예: `OneTap-ReBoot-detail.html`)
- **배포**: GitHub Pages → 코드 수정 후 자동 `git push`

---

## 1. 상세페이지 필수 섹션 (위→아래 순서 고정)

| # | 섹션 | 내용 | 비고 |
|---|---|---|---|
| 1 | **Hero** | 제품명·한 줄 카피·CTA 2개·메인 제품샷 | full-bleed gradient bg |
| 2 | **Trust bar** | 별점·다운로드 수·미디어 로고·보증 마크 | 회색조 한 줄 |
| 3 | **Pain → Solution** | "이런 문제 있죠? → 우린 이렇게 해결" 3블록 | 좌우 split |
| 4 | **Feature Showcase** | 핵심 기능 3~6개 (아이콘 + 스크린샷) | 카드 그리드 |
| 5 | **How it Works** | 1·2·3·4 단계, 각 단계마다 GIF/스틸 1장 | 가로 스크롤 가능 |
| 6 | **Before / After** | 슬라이더 또는 비교 카드 | 시각 차이 큰 케이스 |
| 7 | **Spec & Compatibility** | 지원 iOS · 기기 · 파일 형식 표 | 단순 table |
| 8 | **Pricing** | 1개월 · 1년 · 평생 (할인율, 추천 배지) | 카드 3개 |
| 9 | **Reviews** | 실 사용자 후기 6~9개 (별점 + 출처) | masonry |
| 10 | **FAQ** | 아코디언 6~10문항 | `<details>` 사용 |
| 11 | **Final CTA** | 대형 배너 + 무료체험/구매 버튼 | 풀 배경 |

> 순서를 함부로 바꾸지 말 것. 카피만 제품에 맞게 갈아끼운다.

---

## 2. 디자인 시스템 (트렌디 톤 고정값)

### 컬러
```
--bg            : #ffffff
--bg-soft       : #fafafa
--ink           : #1d1d1f      /* 본문 */
--ink-soft      : #515154
--brand         : #007aff      /* iOS blue, primary CTA */
--brand-deep    : #0051d5
--accent        : #ff6b00      /* 할인·HOT */
--danger        : #ff3b30
--success       : #34c759
--line          : #ececec
```
브랜드 그라데이션: `linear-gradient(135deg, #007aff 0%, #5ac8fa 100%)`
Hero 배경 그라데이션: `linear-gradient(135deg, #f8fbff 0%, #ffffff 60%, #fff5ec 100%)`

### 타이포
- 본문 폰트는 **styles.css 의 body 폰트 스택 그대로** 사용 (변경 금지)
- 스케일: `12 / 14 / 16 / 20 / 28 / 40 / 64`
- Hero h1: `64px / weight 800 / letter-spacing -1.5px / line-height 1.05`
- Section title: `40px / weight 800 / letter-spacing -0.8px`
- Body: `16px / 1.7 / color var(--ink-soft)`

### 레이아웃
- 컨테이너: `max-width 1280px; padding: 0 24px;` (styles.css `.container` 재사용)
- 섹션 수직 패딩: `padding: 120px 0;` (모바일 `64px 0`)
- 그리드 간격: `gap: 24px` (카드) / `gap: 16px` (텍스트)
- 라운드: 카드 `16px`, 버튼 `999px`, 이미지 `20px`

### 그림자
```
--shadow-sm : 0 2px 8px rgba(0,0,0,0.04)
--shadow-md : 0 8px 24px rgba(0,0,0,0.06)
--shadow-lg : 0 18px 48px rgba(0,0,0,0.12)
--shadow-brand: 0 12px 36px rgba(0,122,255,0.25)
```

### 모션 (과하지 않게)
- 호버: `transition: transform .2s ease, box-shadow .2s ease`
- 스크롤 등장: `IntersectionObserver` + `opacity 0→1 / translateY 16px→0` (0.5s ease-out)
- Hero 제품샷: `transform: translateY(0)` + 마우스 패럴랙스 6px 이내
- **금지**: bounce, 무한 회전, autoplay 영상 사운드 on

### 트렌드 디테일 (꼭 1개 이상 넣기)
- Hero 뒤 **soft blob blur** (`filter: blur(80px)` 의 큰 원형 그라데이션)
- Feature 카드 hover 시 **3D tilt** (`transform: perspective(800px) rotateX/Y`)
- 섹션 사이 **noise overlay** (`background-image: url(data:image/svg+xml; … noise)`, opacity 0.03)
- 큰 영문 outline 타이포 1줄 (예: `FEATURES.`) section divider
- 둥근 마키(marquee) — 사용자 로고/별점이 천천히 흐름

---

## 3. 이미지 — Claude / Gemini API 연동

### 3-1. 두 API 의 역할 분담 (기본 정책)

| 용도 | 선택 모델 | 이유 |
|---|---|---|
| **실제 사진 같은 컷** (제품 무드샷, 라이프스타일) | **Gemini 2.5 Flash Image (nano-banana)** | 사진 합성 강함 |
| **UI 모킹·일러스트·아이콘** | **Claude (Imagen via API 또는 SVG 코드 생성)** | 벡터·아이콘 정밀 |
| **iPhone 목업에 스크린샷 합성** | Gemini (편집 모드) | reference image 입력 가능 |

> 둘 중 하나라도 키가 없으면 다른 쪽 + Unsplash 백업으로 자동 폴백.

### 3-2. 폴더 구조

```
/assets
  /generated      ← API 가 생성한 원본 (커밋 O)
    /reboot
      hero-1920.webp
      feature-1.webp
      step-1.webp
    /unlock
      ...
  /prompts        ← 각 이미지의 프롬프트 .txt (재현 가능성)
/scripts
  gen-images.mjs  ← Node.js 실행 스크립트
```

### 3-3. `scripts/gen-images.mjs` 동작 사양

1. `assets/prompts/<product>/<filename>.txt` 를 읽는다.
2. 첫 줄 = 모델 선택 토큰 (`#gemini` 또는 `#claude`)
3. 나머지 = 프롬프트 본문 + 사이즈 지정 (`@1920x1080`)
4. 환경 변수
   - `GEMINI_API_KEY`
   - `ANTHROPIC_API_KEY`
5. 결과는 WebP (q=82) 로 저장, 같은 베이스명.
6. 캐시: 동일 prompt hash 가 이미 존재하면 스킵.
7. 실패 시 `assets/generated/<product>/<filename>.placeholder.svg` 로 마커 생성 후 다음 파일 진행.

CLI 예시:
```bash
node scripts/gen-images.mjs --product reboot
node scripts/gen-images.mjs --all --force
```

### 3-4. 프롬프트 작성 규칙 (디자이너 톤 유지)

모든 사진 프롬프트에 **항상** 다음 베이스라인을 끝에 붙인다:

```
Studio quality, professional product photography,
clean composition, soft natural lighting from upper left,
shallow depth of field, ultra-detailed, 8k, color graded with
warm highlights + cool shadows, no text, no logo, no watermark.
```

UI 일러스트 프롬프트 끝에는:
```
Flat vector style, iOS Human Interface Guidelines feel,
2-color brand palette (#007aff + #5ac8fa), generous whitespace,
no text, centered composition.
```

### 3-5. HTML 안에서 이미지 쓰는 법

```html
<picture>
  <source srcset="assets/generated/reboot/hero-1920.webp" type="image/webp">
  <img src="assets/generated/reboot/hero-1920.jpg"
       alt="iPhone 화면 복구 데모"
       loading="lazy" width="1920" height="1080">
</picture>
```

- Hero 만 `loading="eager"` + `fetchpriority="high"`
- 모든 `<img>` 에 `width / height` 명시 (CLS 방지)
- 대체 텍스트는 **상품 가치**가 드러나게 (파일명 그대로 X)

---

## 4. 새 상세페이지 만들 때 표준 절차

1. `복구솔루션.html` 을 템플릿으로 복사 → `<제품명>-detail.html`
2. **§1 의 11개 섹션 골격**을 모두 채운다 (빈 섹션 금지)
3. 카피는 한국어 기준으로 작성 → 즉시 `i18n.js` 의 **T.en, T.zh** 에 동일 키로 번역 추가
4. `assets/prompts/<product>/` 폴더에 이미지별 `.txt` 프롬프트 작성
5. `node scripts/gen-images.mjs --product <product>` 실행
6. 생성 결과 확인 → 마음에 안 들면 프롬프트만 수정 후 재실행 (코드 변경 X)
7. 로컬 시각 확인 → 라이트하우스 모바일 점수 **85 이상** 확인
8. `git add . && git commit -m "feat(detail): <제품명> 상세페이지 추가" && git push`
9. GitHub Pages URL 열기

---

## 5. 코드 품질 규칙

- 외부 CSS/JS 프레임워크 추가 **금지** (현재 무의존성 유지)
- 인라인 스타일은 최소화, 공용 토큰은 `styles.css` 에 추가
- 동일 디자인 컴포넌트가 2번 이상 나오면 클래스로 추출
- 1500줄 넘는 HTML 은 섹션 주석 `<!-- ============ HERO ============ -->` 로 구분
- **금지**: jQuery, 광고/추적 스크립트, 알 수 없는 외부 폰트 CDN
- 한국어 텍스트는 직접 박지 말고 `data-i18n="key"` 사용 (자동 번역 대상)

---

## 6. 합/불 체크리스트 (Push 직전 자가 점검)

- [ ] §1 의 11개 섹션이 모두 존재한다
- [ ] Hero 가 1초 안에 LCP 발생 (이미지 eager + WebP)
- [ ] CTA 버튼이 화면 4곳 이상에 자연스럽게 노출된다
- [ ] 다크모드에서 깨지지 않는다 (또는 명시적으로 dark 미지원 선언)
- [ ] 모바일 320px 폭에서 가로 스크롤이 발생하지 않는다
- [ ] 모든 이미지에 `width/height` + 의미 있는 `alt`
- [ ] `T.en`, `T.zh` 키가 한국어 키 개수와 일치한다
- [ ] 새로 만든 모든 이미지는 `/assets/generated/` 안에 있다 (외부 URL 직링크 X)

---

## 7. 자주 하는 실수 (Claude 가 반복하지 말아야 할 것)

- 섹션을 줄여서 페이지가 짧아지는 것 — **무조건 11섹션**
- 색을 임의로 바꾸는 것 — **§2 토큰만 사용**
- Hero 에 stock 사진 가져다 쓰는 것 — **반드시 API 로 생성**
- 한국어만 채우고 i18n 키 누락 — **3개 언어 동시 입력 필수**
- API 키를 HTML/JS 에 박는 것 — **항상 `process.env` (Node 스크립트)에서만**
- `<button onclick="...">` 직접 박기 — **이벤트는 별도 `<script>` 끝에 위임**

---

## 8. 모델/도구 빠른 참조

- 현재 IDE: VS Code + Claude Code 확장
- 대화 모델 권장: **Claude Opus 4.7** (디자인 판단력) / **Sonnet 4.6** (빠른 양산)
- 이미지 모델 권장: **Gemini 2.5 Flash Image** (사진 합성) + **Imagen 4** (스튜디오 컷)
- 한 번에 너무 많이 만들지 말고, **1제품 = 1 PR** 로 끝까지 마감하고 다음 제품으로.

---

작성 완료. 이 문서가 모호하면 *문서를 먼저 고치고* 그 다음 코드를 만질 것.
