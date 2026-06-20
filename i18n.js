(function() {
  'use strict';

  const LANG_KEY = 'onetap_lang';

  const LANGS = {
    ko: { name: '한국어', flag: '🇰🇷' },
    en: { name: 'English', flag: '🇺🇸' },
    zh: { name: '中文',    flag: '🇨🇳' },
  };

  // ──────────────────────────────────────────────────────────────
  // 번역 사전 — 키: 한국어 원본(trim), 값: 번역
  // ──────────────────────────────────────────────────────────────
  const T = {
    en: {
      // ── 페이지 타이틀 ──
      'OneTap iOS - iOS 시스템 문제 한 번에 해결': 'OneTap iOS — Solve iOS Issues in One Tap',
      '복구 솔루션 - OneTap iOS': 'Recovery Solutions - OneTap iOS',
      '데이터 전송 - OneTap iOS': 'Data Transfer - OneTap iOS',
      '암호 해제 - OneTap iOS': 'Unlock Solutions - OneTap iOS',
      '🔥 베스트 세일 - OneTap iOS': '🔥 Best Sale - OneTap iOS',

      // ── 상단바 ──
      '🎉 신규 회원 가입 시': '🎉 Sign up & get a',
      '50% 할인 쿠폰': '50% off coupon',
      '증정!': 'free!',
      '📞 24/7 고객지원 운영 중': '📞 24/7 Customer Support',
      '스토어': 'Store',
      '고객센터': 'Support Center',

      // ── 헤더 네비게이션 ──
      '제품': 'Products',
      '복구 솔루션': 'Recovery',
      '데이터 전송': 'Transfer',
      '암호 해제': 'Unlock',
      '꿀팁 모음': 'Guides',
      '🔥 베스트 세일': '🔥 Best Sale',
      '로그인': 'Sign in',

      // ── 메가 메뉴 ──
      '전체 제품': 'All Products',
      'iOS 시스템 문제 150종 한 번에 복구': 'Fix 150+ iOS system issues in one go',
      '아이폰 잠금·비밀번호 해제': 'Unlock iPhone passcodes',
      '기종 변경 시 데이터 이동·백업': 'Transfer & back up data when switching devices',
      '삭제한 사진·메시지·연락처 복구': 'Recover deleted photos, messages, contacts',
      '아이폰 GPS 위치 자유롭게 변경': 'Change iPhone GPS location freely',
      'PC로 화면 미러링·녹화': 'Mirror & record screen to PC',
      '카카오톡·라인 대화 백업·복원': 'Back up & restore KakaoTalk / LINE chats',
      '아이폰 저장공간 정리·최적화': 'Clean & optimize iPhone storage',
      '전체 제품 보기 →': 'See all products →',
      '시스템 / 데이터 복구': 'System / Data Recovery',
      'iOS 시스템·부팅·복구 모드': 'iOS system, boot & recovery mode',
      '삭제 데이터 35종 복구': 'Recover 35+ types of deleted data',
      '저장공간 정리·최적화': 'Storage cleanup & optimization',
      '백업 / 전송 도구': 'Backup / Transfer Tools',
      '사진·연락처·음악 무제한 이동': 'Unlimited photos / contacts / music transfer',
      '카톡·라인 대화 백업·복원': 'KakaoTalk / LINE chat backup & restore',
      'PC↔폰 화면 미러링·녹화': 'PC ↔ phone screen mirroring / recording',
      '잠금 해제 솔루션': 'Unlock Solutions',
      '화면 잠금·비밀번호 해제': 'Screen lock & passcode removal',
      'Apple ID·MDM 잠금 해제': 'Apple ID & MDM unlock',
      '스크린 타임 비밀번호 우회': 'Bypass Screen Time passcode',

      // ── HERO 슬라이드 1 (ReBoot) ──
      '⚡ iOS 27 완벽 지원': '⚡ Full iOS 27 Support',
      'iOS 시스템 문제,': 'iOS system issues,',
      '한 번의 탭으로': 'in just one tap',
      '완벽 해결': 'solved.',
      'iPhone, iPad가 멈췄거나 부팅이 안 되나요?': 'iPhone or iPad stuck or won\'t boot?',
      'OneTap ReBoot로 단 30초 만에 모든 iOS 문제를 해결하세요.': 'OneTap ReBoot fixes any iOS issue in just 30 seconds.',
      '150가지 이상의 iOS 시스템 문제 해결': 'Fix 150+ iOS system problems',
      '데이터 손실 없이 안전한 복구': 'Safe recovery without data loss',
      'iOS 27 베타 및 iPhone 17 시리즈 지원': 'Supports iOS 27 Beta & iPhone 17 series',
      '무료 다운로드 →': 'Free Download →',
      '▶ 사용법 보기': '▶ Watch How-To',

      // ── HERO 슬라이드 2 (메가 세일) ──
      '🔥 한정 메가 세일': '🔥 Limited Mega Sale',
      '전 제품': 'All products',
      '최대 70% OFF': 'up to 70% OFF',
      '지금이 기회!': 'Don\'t miss out!',
      '1년에 단 한 번! OneTap iOS 전 제품 라이센스를': 'Once a year only — every OneTap iOS lifetime license',
      '역대 최저가로 만나보세요. 3일 한정 특가.': 'at the lowest price ever. 3-day limited offer.',
      'OneTap ReBoot 평생 라이센스 ₩29,900 (정가 ₩99,000)': 'OneTap ReBoot lifetime ₩29,900 (was ₩99,000)',
      '전 제품 패키지 50% 할인': '50% off on the all-products bundle',
      '추가 3개월 무료 업데이트 보장': '+3 months of free updates included',
      '지금 할인 받기 →': 'Get the Discount →',
      '전 제품 보기': 'View All Products',

      // ── HERO 슬라이드 3 (ChatBack) ──
      '✨ NEW · 신제품 출시': '✨ NEW · Just Released',
      '카카오톡 5년 대화,': '5 years of KakaoTalk chats,',
      '한 번에 백업': 'backed up in one shot',
      '완료': '',
      '기종 변경할 때마다 카톡 백업 끊기셨죠?': 'Sick of losing KakaoTalk history every time you switch phones?',
      'OneTap ChatBack은 모든 대화·사진·동영상을 완벽 보존합니다.': 'OneTap ChatBack preserves every chat, photo & video — perfectly.',
      '카카오톡 · 라인 대화 무제한 백업': 'Unlimited KakaoTalk / LINE chat backups',
      '안드로이드 ↔ 아이폰 양방향 전송': 'Two-way Android ↔ iPhone transfer',
      'PC에서 카톡 대화 검색·열람': 'Search & read KakaoTalk chats on PC',
      '무료 체험 시작 →': 'Start Free Trial →',
      '자세히 보기': 'Learn More',

      // ── HERO 슬라이드 4 (Recover) ──
      '💾 데이터 복구 전문': '💾 Data Recovery Experts',
      '실수로 지운 사진,': 'Accidentally deleted photos —',
      '백업 없이도': 'recover them without',
      '복구': 'a backup',
      '"5년 치 추억이 한순간에…" 그런 절망, 이제 끝.': '"5 years of memories — gone in a second." Not anymore.',
      'OneTap Recover는 백업 없어도 35가지 데이터를 살려냅니다.': 'OneTap Recover restores 35+ data types — even without a backup.',
      '사진·동영상·연락처·메모 100% 복구': '100% recovery of photos, videos, contacts & notes',
      '카카오톡·인스타·라인 메시지 복원': 'Restore KakaoTalk / Instagram / LINE messages',
      '물에 빠지거나 깨진 폰에서도 복구': 'Recovers from water-damaged or broken phones',
      '무료 스캔 시작 →': 'Start Free Scan →',
      '복구 사례 보기': 'See Success Stories',

      // ── HERO 슬라이드 5 (UnLock) ──
      '🔓 잠금 해제 솔루션': '🔓 Unlock Solutions',
      '비밀번호 잊은 아이폰,': 'Forgot your iPhone passcode?',
      'AS 센터 갈 필요 없어요': 'No need to visit a service center',
      'Face ID도 안 먹히고 비밀번호도 까먹었나요?': 'Face ID not working and passcode forgotten?',
      'OneTap UnLock으로 집에서 5분 안에 안전하게 해제하세요.': 'OneTap UnLock safely unlocks your phone in 5 minutes — from home.',
      '4자리·6자리·문자 비밀번호 모두 해제': 'Removes 4-digit, 6-digit & alphanumeric passcodes',
      'Apple ID 잠금 해제 (비밀번호 분실 시)': 'Unlock Apple ID (when password is lost)',
      '스크린 타임·MDM 잠금 우회': 'Bypass Screen Time & MDM locks',
      '잠금 해제하기 →': 'Unlock Now →',
      '사용 가이드': 'User Guide',

      // ── HERO 슬라이드 6 (Transfer) ──
      '📤 데이터 전송 #1': '📤 #1 Data Transfer',
      '새 폰 샀는데,': 'Got a new phone? Moving',
      '데이터 옮기기': 'your data',
      '30분이 30초로': 'now takes 30 seconds',
      'iCloud 용량 부족? 백업 끊김? 그런 거 없어요.': 'iCloud full? Backup interrupted? Forget about it.',
      'OneTap Transfer는 무선·고속으로 모든 걸 옮깁니다.': 'OneTap Transfer moves everything — wireless & high-speed.',
      '사진·음악·동영상 무제한 전송': 'Unlimited photo / music / video transfer',
      'iCloud 없이 무료 전체 백업': 'Free full backups — no iCloud needed',
      '안드로이드 ↔ 아이폰 양방향 지원': 'Two-way Android ↔ iPhone support',
      '기능 비교': 'Compare Features',

      // ── HERO 슬라이드 7 (iPhone 17) ──
      '🎉 iPhone 17 시리즈 완벽 호환': '🎉 Fully compatible with iPhone 17',
      'iPhone 17 Pro Max도': 'iPhone 17 Pro Max,',
      '한 번에 해결': 'handled in one tap',
      '최신 iPhone 17 시리즈와 iOS 27까지 완벽 지원.': 'Full support for the latest iPhone 17 series and iOS 27.',
      '전 제품 라인업이 최신 디바이스에 최적화됐습니다.': 'Our entire lineup is optimized for the newest devices.',
      'iPhone 17 / 17 Air / 17 Pro / Pro Max 지원': 'Supports iPhone 17 / 17 Air / 17 Pro / Pro Max',
      'iOS 27 베타 ~ iOS 13 모든 버전 호환': 'Compatible from iOS 13 to iOS 27 Beta',
      'M5 칩셋 Mac · Apple Silicon 네이티브': 'Native on M5-chip Macs and Apple Silicon',
      '호환 기기 확인 →': 'Check Compatibility →',

      // ── Trust Bar ──
      '1,200만+': '12M+',
      '누적 다운로드 수': 'Total Downloads',
      '370만+': '3.7M+',
      '월간 활성 사용자': 'Monthly Active Users',
      '2026년 기준 한국 사용자 증가율': 'Korean User Growth in 2026',
      '4.8점': '4.8',
      '/ 5.0': '/ 5.0',
      '리뷰 평점': 'Average Rating',

      // ── 인기 제품 섹션 ──
      '인기 제품 — 스마트폰 문제 완벽 해결': 'Popular Products — Solve Every Phone Issue',
      '시스템 복구 & 암호 해제': 'System Recovery & Unlock',
      '데이터 복구': 'Data Recovery',
      'AI 도구': 'AI Tools',
      '무료 다운로드': 'Free Download',
      '지금 구매하기': 'Buy Now',

      // ── 인기 카드 설명 ──
      'iOS, iPadOS, tvOS에서 발생하는 150가지 이상의 문제를 복구하며, 최신 iOS 27 베타까지 지원합니다.':
        'Recovers 150+ issues on iOS, iPadOS and tvOS — supports the latest iOS 27 Beta.',
      'OneTap UnLock for Android':
        'OneTap UnLock for Android',
      'Android 기기의 비밀번호, PIN, 지문, 얼굴 인식, 패턴 잠금을 해제할 수 있으며, 최신 Android 16까지 지원합니다.':
        'Unlock passcodes, PINs, fingerprints, face & pattern locks on Android — supports Android 16.',
      'OneTap UnLock for iOS':
        'OneTap UnLock for iOS',
      '비밀번호, Touch ID, Face ID 없이 iPhone/iPad/iPod의 화면 잠금을 몇 분 만에 해제할 수 있는 프로그램으로, 데이터 손실 없이 스크린 타임 암호 해제도 지원합니다.':
        'Unlocks iPhone / iPad / iPod screens in minutes without passcode, Touch ID or Face ID — and bypasses Screen Time without data loss.',
      '음악, 사진, 동영상, 연락처 등 다양한 데이터를 iPhone과 PC 간에 자유롭게 전송하고 무료 백업까지 가능합니다.':
        'Freely move music, photos, videos & contacts between iPhone and PC — with free backup too.',
      '카카오톡, 라인의 대화 내용·사진·동영상을 완벽 백업하고, 안드로이드↔아이폰 양방향으로 옮길 수 있습니다.':
        'Backs up KakaoTalk & LINE chats, photos and videos — moves them both ways between Android and iPhone.',
      'iPhone/Android 화면을 PC로 미러링하여 큰 화면에서 보고 녹화하며, 게임/회의/강의 콘텐츠 제작에 최적화되어 있습니다.':
        'Mirror your iPhone / Android screen to a PC — view & record on a big screen, optimized for games, meetings & lectures.',
      'OneTap Recover for iOS': 'OneTap Recover for iOS',
      '백업이 없어도 iPhone에서 삭제된 사진·동영상·메시지·연락처 등 35가지 이상 데이터 유형을 복구할 수 있습니다.':
        'Recover photos, videos, messages, contacts and 35+ data types from your iPhone — no backup required.',
      'OneTap Recover for Android': 'OneTap Recover for Android',
      'Android 디바이스·SD카드에서 사라진 사진·문서·동영상을 빠르게 스캔하고 복구합니다. 깨진 기기에서도 작동합니다.':
        'Quickly scan Android devices and SD cards for lost photos, documents and videos — works even on broken devices.',
      'OneTap Recover for PC': 'OneTap Recover for PC',
      'PC, 외장 하드, USB, SD카드에서 2,000가지 이상의 데이터 형식을 복구합니다. 포맷·바이러스 손상도 대응합니다.':
        'Recover 2,000+ file formats from PC, external drives, USB and SD cards — handles formatting and virus damage.',
      'AI 엔진으로 배경 제거·색상 보정·이미지 확장·AI 생성까지. 일괄 편집으로 수십 장 사진을 한 번에 가공할 수 있습니다.':
        'AI background removal, color correction, image extension and AI generation — batch-edit dozens of photos at once.',
      'AI 기반 PDF 읽기·요약·번역과 99% 정확도의 OCR을 제공합니다. PDF 편집·변환·병합까지 한 곳에서.':
        'AI-powered PDF reading, summarizing & translation with 99% accurate OCR — plus editing, conversion and merging in one place.',
      '이미지 속 텍스트를 실시간으로 인식하고 번역합니다. 80개 이상 언어를 지원하며 메뉴판·간판도 즉시 한국어로.':
        'Recognize and translate text inside images in real time — supports 80+ languages including menus and signs.',

      // ── 최신 버전 ──
      '최신 버전': 'Latest Release',
      '신규 출시': 'New Release',
      'OneTap Pretty — AI 사진 편집의 새로운 기준': 'OneTap Pretty — A New Standard in AI Photo Editing',
      '최신 AI 엔진으로 배경 제거, 색상 보정, 일괄 편집은 물론 이미지 확장과 AI 생성 기능까지 간편하게 사용할 수 있습니다. 많은 사진도 빠르게 처리하여 일관된 고퀄리티 결과를 완성해 보세요.':
        'A cutting-edge AI engine for background removal, color correction, batch editing, image extension and AI generation. Process large photo sets quickly and get consistent, high-quality results.',
      '자세히 보기 →': 'Learn more →',

      // ── 리뷰 ──
      '사용자 후기 & 미디어 리뷰': 'Customer Reviews & Media Coverage',
      '사용자 후기': 'Customer Reviews',
      'SNS 반응': 'Social Buzz',
      '미디어 리뷰': 'Press Reviews',
      'iPhone 아이폰이 갑자기 애플 로고에서 멈춰서 엄청 당황했는데, OneTap ReBoot 사용하니까 몇 분 만에 바로 해결됐어요. 데이터도 안 날아가서 진짜 다행입니다 :)':
        'My iPhone suddenly got stuck on the Apple logo — I panicked. OneTap ReBoot fixed it in minutes and I didn\'t lose any data. So relieved :)',
      '김유미': 'Yumi Kim',
      '아이폰 바꾸면서 데이터 옮겨야 해서 OneTap Transfer 써봤는데, 케이블만 꽂으면 돼서 진짜 편했어요. 처음이라 걱정했는데 생각보다 쉽게 끝났네요~':
        'Used OneTap Transfer when switching iPhones — just plug in the cable and you\'re done. Way easier than I expected!',
      '김마리': 'Mari Kim',
      '비밀번호를 잊어버려서 아이폰 잠금이 안 풀렸는데, OneTap UnLock으로 금방 해결됐어요. 진작 알았으면 좋았을 텐데요!':
        'Forgot my iPhone passcode — OneTap UnLock cracked it open in no time. Wish I\'d known about this sooner!',
      '박지훈': 'Jihoon Park',
      '인스타 사진 실수로 다 지웠다가 OneTap Recover로 살려냄ㅠㅠ 진짜 천재 프로그램. 친구들한테 다 추천했어요 #OneTapiOS':
        'Accidentally wiped all my Instagram photos — OneTap Recover saved them 😭 Genius app. Already told all my friends. #OneTapiOS',
      '트위터에서 추천받고 써봤는데 카톡 5년 치 백업 한 번에 됨ㅋㅋ 기종변경 두렵지 않다 이제. 별 다섯개 만점!!':
        'Saw it recommended on Twitter — backed up 5 years of KakaoTalk in one go lol. Phone upgrades no longer scary. 5 stars!',
      '유튜브에서 보고 산 OneTap UnLock... 진짜 5분 만에 잠금 풀림. 비싸지도 않고 한국어 지원도 좋고 만족 200%':
        'Bought OneTap UnLock after seeing it on YouTube… unlocked in 5 minutes. Not pricey, great Korean support — 200% satisfied.',
      '"OneTap iOS의 한 번 클릭 복구는 일반 사용자도 부담 없이 사용할 수 있는 가장 직관적인 솔루션이다."':
        '"OneTap iOS\'s one-click recovery is the most intuitive solution — easy enough for any user."',
      '디지털타임스': 'Digital Times',
      '"국내 iOS 복구 도구 중 가장 빠른 처리 속도와 높은 성공률을 기록. 특히 한국어 고객 지원이 인상적."':
        '"Top processing speed and success rate among iOS recovery tools — Korean customer support stands out."',
      '테크플러스': 'Tech Plus',
      '"기업용으로도 활용 가능한 안정성. 데이터 보존율이 업계 최고 수준이며 보안 인증도 갖추고 있다."':
        '"Enterprise-grade stability. Industry-leading data retention and full security certification."',
      'IT 비즈니스': 'IT Business',

      // ── 블로그/꿀팁 ──
      '📚 꿀팁 모음': '📚 Tips & Guides',
      '아이폰 활용 가이드': 'iPhone Power-User Guides',
      'iPhone, iPad를 200% 활용하는 노하우': 'Get 200% more out of your iPhone & iPad',
      '📱 iOS 27': '📱 iOS 27',
      'iOS 27 가이드': 'iOS 27 Guide',
      'iOS 27 업데이트, 지금 해도 될까? 4단계 체크리스트': 'Should you update to iOS 27 now? A 4-step checklist',
      '📖 5분 읽기': '📖 5 min read',
      '💾 데이터 복구': '💾 Data Recovery',
      '실수로 삭제한 사진, 백업 없이도 복구하는 5가지 방법': '5 ways to recover deleted photos — even without a backup',
      '📖 7분 읽기': '📖 7 min read',
      '🔓 잠금 해제': '🔓 Unlock',
      '잠금 해제': 'Unlock',
      '아이폰 비밀번호를 잊었을 때 가장 안전한 해결법': 'The safest way to handle a forgotten iPhone passcode',
      '📖 6분 읽기': '📖 6 min read',

      // ── CTA ──
      '지금 시작하세요': 'Get started today',
      'OneTap iOS와 함께 모든 iPhone 문제를 30초 안에 해결하세요.': 'Solve every iPhone problem in 30 seconds with OneTap iOS.',
      '무료 체험 시작하기 →': 'Start Free Trial →',
      '이번 기회를 놓치지 마세요': 'Don\'t miss this deal',
      '30일 무료 환불 보장 · 1:1 한국어 고객지원 · 평생 무료 업데이트': '30-day money-back guarantee · 1:1 support · Free lifetime updates',
      '지금 할인가로 구매하기 →': 'Buy at Sale Price →',
      '30일 무료 환불 보장 · 1:1 한국어 고객지원': '30-day money-back guarantee · 1:1 customer support',

      // ── 푸터 ──
      'iOS 시스템 문제를 한 번의 탭으로 해결하는 가장 빠른 방법.': 'The fastest way to solve iOS issues — in a single tap.',
      '2020년 설립 이후 전 세계 5,000만+ 사용자가 신뢰합니다.': 'Trusted by 50M+ users worldwide since 2020.',
      '인기 제품': 'Top Products',
      '회사 소개': 'About',
      '회사 정보': 'Company',
      '파트너십': 'Partnerships',
      '채용 정보': 'Careers',
      '언론 보도': 'Press',
      '제휴 문의': 'Partner With Us',
      '고객 지원': 'Support',
      '자주 묻는 질문': 'FAQ',
      '환불 정책': 'Refund Policy',
      '1:1 문의': '1:1 Contact',
      '이용 약관': 'Legal',
      '개인정보 처리방침': 'Privacy Policy',
      '서비스 이용약관': 'Terms of Service',
      '라이센스 약관': 'License Terms',
      '쿠키 정책': 'Cookie Policy',
      '🔒 SSL 보안': '🔒 SSL Secured',
      '✅ 검증된 결제': '✅ Verified Payments',
      '🛡️ DMCA 보호': '🛡️ DMCA Protected',

      // ── 복구솔루션 페이지 ──
      '🔧 복구 솔루션': '🔧 Recovery Solutions',
      'iOS 시스템 & 데이터 복구': 'iOS System & Data Recovery',
      '아이폰이 멈췄을 때, 부팅이 안 될 때, 데이터를 잃어버렸을 때': 'When your iPhone freezes, won\'t boot, or loses data',
      'OneTap iOS의 강력한 복구 도구로 한 번에 해결하세요.': 'OneTap iOS\'s powerful recovery tools solve it in one go.',
      '🔧 OneTap ReBoot': '🔧 OneTap ReBoot',
      'iOS 시스템 문제': 'iOS system issues',
      '한 번에 복구': 'recovered in one go',
      '애플 로고에서 멈췄거나, 검은 화면, 무한 재부팅, 흰 화면 등 iOS, iPadOS, tvOS의':
        'Stuck on the Apple logo, black screen, boot loop, white screen — iOS, iPadOS and tvOS',
      '150가지 이상의 문제': '150+ types of issues',
      '를 데이터 손실 없이 복구합니다.': ' fixed with zero data loss.',
      '30초 만에 복구 모드 진입/해제': 'Enter / exit recovery mode in 30 seconds',
      'iOS 27 베타 및 iPhone 17 Pro Max 지원': 'Supports iOS 27 Beta and iPhone 17 Pro Max',
      '다운그레이드 / 업그레이드 모두 가능': 'Downgrade or upgrade — both supported',
      '비활성화된 디바이스도 복구': 'Recovers even disabled devices',
      '💾 OneTap Recover': '💾 OneTap Recover',
      '실수로 지운 데이터,': 'Accidentally deleted data —',
      '한 번에 복구한 번에 복구': 'recovered in one go',
      '사진을 실수로 삭제하셨나요? 카톡 대화가 사라졌나요? 백업이 없어도 OneTap Recover가':
        'Deleted a photo by mistake? KakaoTalk chats vanished? Even without backups, OneTap Recover restores',
      '35가지 이상의 데이터 유형': '35+ types of data',
      '을 복구해 드립니다.': ' for you.',
      '백업 없이도 삭제된 데이터 복구': 'Recovers deleted data without backups',
      '카카오톡 / 라인 / 인스타그램 메시지 복원': 'Restores KakaoTalk / LINE / Instagram messages',
      '사진·동영상·메모·연락처 100% 복구': '100% recovery of photos, videos, notes & contacts',
      '물에 빠지거나 깨진 iPhone에서도 복구 가능': 'Works on water-damaged or broken iPhones',
      '🧹 OneTap Cleaner': '🧹 OneTap Cleaner',
      '아이폰 저장공간,': 'iPhone storage,',
      '한 번에 정리': 'cleaned in one go',
      '"저장 공간이 부족합니다" 알림에 지치셨나요? OneTap Cleaner로': 'Tired of "Storage almost full" alerts? OneTap Cleaner clears',
      '중복 사진, 큰 파일, 캐시': 'duplicate photos, large files & cache',
      '를 한 번에 정리하세요.': ' all in one go.',
      '중복 사진 자동 감지 및 일괄 삭제': 'Auto-detects & bulk-deletes duplicate photos',
      '20MB 이상 큰 파일 빠른 검색': 'Quickly finds files larger than 20MB',
      '앱 캐시 / 정크 파일 안전 제거': 'Safely removes app cache and junk files',
      '최대 50% 저장공간 확보': 'Reclaims up to 50% of storage',

      // ── 데이터전송 페이지 ──
      '📤 데이터 전송': '📤 Data Transfer',
      '새 폰으로 옮길 때, 한 번에': 'Switching phones, made one-tap easy',
      '기종 변경할 때마다 백업이 끊기고 사진이 사라졌던 분들께': 'If you\'ve lost backups or photos every time you switched phones —',
      'OneTap Transfer가 모든 걸 한 번에 옮겨드립니다.': 'OneTap Transfer moves everything at once.',
      '📤 OneTap Transfer': '📤 OneTap Transfer',
      '새 폰으로 옮길 때': 'Switch phones —',
      '한 번에 전송': 'transfer in one tap',
      '기종 변경할 때마다 번거로우셨죠? OneTap Transfer로': 'Tired of the hassle every time you upgrade? With OneTap Transfer,',
      '카카오톡, 사진, 연락처, 음악': 'KakaoTalk, photos, contacts & music',
      '까지 모든 데이터를 한 번에 옮기세요.': ' — move all your data at once.',
      '카카오톡 / 라인 대화 백업 및 복원': 'Back up & restore KakaoTalk / LINE chats',
      'WhatsApp 데이터 안드로이드↔아이폰 전송': 'Transfer WhatsApp data between Android and iPhone',
      '음악·사진·동영상 무제한 전송': 'Unlimited music, photo & video transfer',
      'iCloud 없이 무료 백업': 'Free backup — no iCloud required',
      '💬 OneTap ChatBack': '💬 OneTap ChatBack',
      '한 번에 백업한 번에 백업': 'backed up in one go',
      '기종 변경할 때마다 카톡 백업이 끊겼나요? OneTap ChatBack은 모든': 'KakaoTalk backups breaking every time you switch? OneTap ChatBack perfectly preserves all your',
      '카카오톡 / 라인 대화·사진·동영상': 'KakaoTalk / LINE chats, photos & videos',
      '을 완벽하게 보존합니다.': '.',
      'PC에서 카톡 대화 검색·열람': 'Search & read KakaoTalk chats on PC',
      '특정 대화방만 선택 백업 가능': 'Selectively back up specific chat rooms',
      '📱 OneTap Mirror': '📱 OneTap Mirror',
      'PC로 화면 미러링 ·': 'Mirror to PC ·',
      '고화질 녹화': 'HD recording',
      'iPhone / Android 화면을 PC로 미러링하여': 'Mirror iPhone / Android screens to your PC and',
      '큰 화면에서 보고 녹화': 'view & record on a big screen',
      '하세요. 게임 방송, 회의, 강의 콘텐츠 제작에 최적화됐습니다.': '. Optimized for game streaming, meetings and lectures.',
      'iPhone / Android 화면 PC로 무선 미러링': 'Wireless iPhone / Android screen mirroring to PC',
      '4K 60fps 고화질 녹화': '4K 60fps HD recording',
      '실시간 게임·앱 방송 송출': 'Live game & app streaming',
      '줌·Teams 회의에서 화면 공유': 'Screen-share in Zoom / Teams meetings',

      // ── 암호해제 페이지 ──
      '🔓 암호 해제': '🔓 Unlock',
      '잠긴 iPhone, 안전하게 해제': 'Safely unlock your iPhone',
      '비밀번호를 잊었거나, Face ID·Touch ID가 작동하지 않을 때': 'When you\'ve forgotten the passcode or Face ID / Touch ID stops working,',
      'OneTap UnLock으로 데이터 손실 없이 안전하게 해제하세요.': 'OneTap UnLock removes it safely — without data loss.',
      '🔐 OneTap UnLock': '🔐 OneTap UnLock',
      '잠긴 iPhone,': 'Locked iPhone —',
      '비밀번호 없이 해제': 'unlocked without a passcode',
      '비밀번호를 잊으셨나요? Face ID / Touch ID가 작동하지 않나요? OneTap UnLock으로': 'Forgot your passcode? Face ID / Touch ID not working? OneTap UnLock safely removes',
      '모든 종류의 iPhone 잠금': 'every kind of iPhone lock',
      '을 안전하게 해제하세요.': '.',
      '화면 잠금 비밀번호 해제 (4자리/6자리/문자)': 'Remove screen-lock passcodes (4-digit / 6-digit / alphanumeric)',
      'Apple ID 해제 (비밀번호 분실 시)': 'Unlock Apple ID (when password is lost)',
      'MDM 잠금 해제 (학교/회사 제한)': 'Remove MDM locks (school / corporate restrictions)',
      '🆔 OneTap UnLock Pro': '🆔 OneTap UnLock Pro',
      'Apple ID / MDM 잠금': 'Apple ID / MDM locks —',
      '전문가용 해제': 'pro-grade removal',
      '중고로 산 아이폰의 Apple ID가 안 풀리나요? 학교·회사에서 받은 기기의 MDM 잠금에 걸려있나요?': 'Stuck with an Apple ID on a used iPhone? MDM lock on a school / work device?',
      '전문가용 고급 해제': 'pro-grade advanced unlocking',
      '를 사용하세요.': ' — that\'s what this does.',
      '이전 소유자 Apple ID 영구 제거': 'Permanently remove the previous owner\'s Apple ID',
      'MDM(원격 관리) 잠금 우회': 'Bypass MDM (remote management) locks',
      'iPhone 5s ~ 최신 17 Pro Max 지원': 'Supports iPhone 5s through the latest 17 Pro Max',
      'iCloud 계정 변경 가능': 'Lets you change the iCloud account',
      '⏰ OneTap ScreenTime': '⏰ OneTap ScreenTime',
      '스크린 타임 비밀번호,': 'Screen Time passcode —',
      '안전하게 해제': 'safely removed',
      '자녀가 설정한 스크린 타임 암호를 잊으셨나요? 부모 통제 비밀번호가 안 풀리나요?': 'Forgot the Screen Time passcode your child set? Parental controls won\'t budge?',
      '데이터 손실 없이': 'Without data loss',
      '한 번에 해제하세요.': ' — fix it in one go.',
      '스크린 타임 4자리 비밀번호 우회': 'Bypass the 4-digit Screen Time passcode',
      '제한 사항 비밀번호 제거': 'Remove the Restrictions passcode',
      '패밀리 공유 잠금 해제': 'Unlock Family Sharing restrictions',
      'iOS 12 ~ iOS 27 베타 지원': 'Supports iOS 12 through iOS 27 Beta',

      // ── 베스트세일 페이지 ──
      '한정 특가 · 최대 70% OFF': 'Limited Sale · Up to 70% OFF',
      '1년에 단 한 번! OneTap iOS 전 제품 라이센스를 역대 최저가로 만나보세요.': 'Once a year only — every OneTap iOS license at our lowest price ever.',
      '지금 가입하시면 50% 할인 쿠폰까지 함께!': 'Sign up now and get a 50% off coupon on top!',
      '🎉 신규 가입 한정! 전 제품 50% 할인': '🎉 Sign-up Only! 50% off everything',
      '지금 가입하시면 OneTap iOS 전 제품 라이센스를 반값에!': 'Sign up now and get every OneTap iOS license at half price!',
      '일': 'Days',
      '시간': 'Hrs',
      '분': 'Min',
      '초': 'Sec',
      '🏷️ 전 제품 할인가': '🏷️ Site-wide Discount',
      '지금 구매하시면 정가 대비 50% ~ 70% 할인된 가격으로 평생 라이센스를 받으실 수 있습니다.': 'Buy now and lock in a lifetime license at 50–70% off the regular price.',
      'iOS 시스템 문제 150종 한 번에 복구': 'Fix 150+ iOS system issues in one go',
      '아이폰 잠금·비밀번호 해제': 'Unlock iPhone passcodes',
      '사진·연락처·음악 무제한 이동': 'Unlimited photo / contact / music transfer',
      '삭제 데이터 35종 복구': 'Recover 35 types of deleted data',
      '카톡·라인 대화 백업·복원': 'KakaoTalk / LINE chat backup',
      'AI 사진 편집·배경 제거': 'AI photo editing & background removal',
      '🎁 SUPER DEAL': '🎁 SUPER DEAL',
      '전 제품 통합 패키지': 'All-Products Bundle',
      'OneTap iOS 모든 제품을 평생 라이센스로 한 번에!': 'Every OneTap iOS product, lifetime license — all in one bundle!',
      '개별 구매보다 80% 저렴합니다.': '80% cheaper than buying them separately.',
      '전 제품 평생 라이센스 받기 →': 'Get the Lifetime Bundle →',

      // ── Alt 텍스트 (이미지) ──
      'iPhone 시스템 복구': 'iPhone system repair',
      '신규 가입 50% 할인': 'Sign-up 50% discount',
      '카카오톡 대화 백업': 'KakaoTalk chat backup',
      '삭제된 사진 데이터 복구': 'Deleted photo data recovery',
      '잠긴 아이폰 해제': 'Unlocking a locked iPhone',
      '새 아이폰으로 데이터 전송': 'Transferring data to a new iPhone',
      'iPhone 17 Pro Max': 'iPhone 17 Pro Max',
      '원본': 'Original',
      '편집 후': 'Edited',
      'AI 사진 편집 OneTap Pretty': 'OneTap Pretty AI photo editing',
      'iOS 27 업데이트 가이드': 'iOS 27 update guide',
      '데이터 복구 가이드': 'Data recovery guide',
      '아이폰 잠금 해제': 'iPhone unlock',
      'iOS 시스템 복구': 'iOS system recovery',
      '삭제된 데이터 복구': 'Deleted data recovery',
      '아이폰 저장공간 정리': 'iPhone storage cleanup',
      '새 폰으로 데이터 전송': 'Data transfer to a new phone',
      '카카오톡 라인 대화 백업': 'KakaoTalk / LINE chat backup',
      'PC로 화면 미러링 녹화': 'Screen mirroring & recording to PC',
      '잠긴 iPhone 잠금 해제': 'Unlocking a locked iPhone',
      'Apple ID MDM 잠금 해제': 'Apple ID / MDM unlock',
      '스크린 타임 비밀번호 해제': 'Screen Time passcode removal',

      // ── auth.js 모달 ──
      '회원가입': 'Sign up',
      '이메일 주소': 'Email address',
      '비밀번호': 'Password',
      '자동 로그인': 'Stay signed in',
      '비밀번호 찾기': 'Forgot password',
      '또는 SNS로 시작': 'Or continue with',
      '💬 카카오톡으로 시작': '💬 Continue with KakaoTalk',
      'N 네이버로 시작': 'N Continue with Naver',
      'G 구글로 시작': 'G Continue with Google',
      '🎉 신규 가입 시 50% 할인 쿠폰 즉시 증정!': '🎉 Sign up & get a 50% off coupon instantly!',
      '이름': 'Name',
      '비밀번호 (8자 이상)': 'Password (8+ characters)',
      '비밀번호 확인': 'Confirm password',
      '이용약관': 'Terms of Service',
      '및': 'and',
      '에 동의합니다 (필수)': ' (required)',
      '이벤트 / 할인 정보 수신 동의 (선택)': 'I agree to receive event / promotion emails (optional)',
      '닫기': 'Close',
    },

    zh: {
      // ── 页面标题 ──
      'OneTap iOS - iOS 시스템 문제 한 번에 해결': 'OneTap iOS — 一键解决 iOS 系统问题',
      '복구 솔루션 - OneTap iOS': '修复方案 - OneTap iOS',
      '데이터 전송 - OneTap iOS': '数据传输 - OneTap iOS',
      '암호 해제 - OneTap iOS': '密码解锁 - OneTap iOS',
      '🔥 베스트 세일 - OneTap iOS': '🔥 限时特惠 - OneTap iOS',

      // ── 顶栏 ──
      '🎉 신규 회원 가입 시': '🎉 新用户注册即送',
      '50% 할인 쿠폰': '50% 折扣券',
      '증정!': '!',
      '📞 24/7 고객지원 운영 중': '📞 24/7 客户服务',
      '스토어': '商店',
      '고객센터': '客服中心',

      // ── 导航 ──
      '제품': '产品',
      '복구 솔루션': '修复方案',
      '데이터 전송': '数据传输',
      '암호 해제': '密码解锁',
      '꿀팁 모음': '使用教程',
      '🔥 베스트 세일': '🔥 限时特惠',
      '로그인': '登录',

      // ── 巨型菜单 ──
      '전체 제품': '全部产品',
      'iOS 시스템 문제 150종 한 번에 복구': '一键修复 150 多种 iOS 系统问题',
      '아이폰 잠금·비밀번호 해제': '解锁 iPhone 密码',
      '기종 변경 시 데이터 이동·백업': '换机时数据迁移与备份',
      '삭제한 사진·메시지·연락처 복구': '恢复已删除的照片、消息、联系人',
      '아이폰 GPS 위치 자유롭게 변경': '自由更改 iPhone GPS 位置',
      'PC로 화면 미러링·녹화': '将屏幕镜像并录制到电脑',
      '카카오톡·라인 대화 백업·복원': '备份并恢复 KakaoTalk / LINE 对话',
      '아이폰 저장공간 정리·최적화': '清理与优化 iPhone 存储空间',
      '전체 제품 보기 →': '查看全部产品 →',
      '시스템 / 데이터 복구': '系统 / 数据修复',
      'iOS 시스템·부팅·복구 모드': 'iOS 系统、开机与恢复模式',
      '삭제 데이터 35종 복구': '恢复 35 种以上已删除数据',
      '저장공간 정리·최적화': '存储清理与优化',
      '백업 / 전송 도구': '备份 / 传输工具',
      '사진·연락처·음악 무제한 이동': '照片 / 联系人 / 音乐无限传输',
      '카톡·라인 대화 백업·복원': 'KakaoTalk / LINE 聊天记录备份',
      'PC↔폰 화면 미러링·녹화': '电脑 ↔ 手机屏幕镜像 / 录制',
      '잠금 해제 솔루션': '解锁方案',
      '화면 잠금·비밀번호 해제': '屏幕锁与密码移除',
      'Apple ID·MDM 잠금 해제': 'Apple ID 与 MDM 解锁',
      '스크린 타임 비밀번호 우회': '绕过屏幕时间密码',

      // ── 轮播 1 ──
      '⚡ iOS 27 완벽 지원': '⚡ 完美支持 iOS 27',
      'iOS 시스템 문제,': 'iOS 系统问题,',
      '한 번의 탭으로': '一键',
      '완벽 해결': '完美解决',
      'iPhone, iPad가 멈췄거나 부팅이 안 되나요?': 'iPhone 或 iPad 卡死、无法开机?',
      'OneTap ReBoot로 단 30초 만에 모든 iOS 문제를 해결하세요.': 'OneTap ReBoot 仅需 30 秒即可修复任何 iOS 问题。',
      '150가지 이상의 iOS 시스템 문제 해결': '修复 150+ 种 iOS 系统问题',
      '데이터 손실 없이 안전한 복구': '无数据丢失,安全修复',
      'iOS 27 베타 및 iPhone 17 시리즈 지원': '支持 iOS 27 Beta 与 iPhone 17 系列',
      '무료 다운로드 →': '免费下载 →',
      '▶ 사용법 보기': '▶ 观看教程',

      // ── 轮播 2 ──
      '🔥 한정 메가 세일': '🔥 限时大促',
      '전 제품': '全产品',
      '최대 70% OFF': '最高立减 70%',
      '지금이 기회!': '机会难得!',
      '1년에 단 한 번! OneTap iOS 전 제품 라이센스를': '一年仅一次! OneTap iOS 全产品终身授权',
      '역대 최저가로 만나보세요. 3일 한정 특가.': '历史最低价开放购买,3 天限时。',
      'OneTap ReBoot 평생 라이센스 ₩29,900 (정가 ₩99,000)': 'OneTap ReBoot 终身版 ₩29,900 (原价 ₩99,000)',
      '전 제품 패키지 50% 할인': '全产品套装 5 折优惠',
      '추가 3개월 무료 업데이트 보장': '额外 3 个月免费更新保障',
      '지금 할인 받기 →': '立即抢购 →',
      '전 제품 보기': '查看全部产品',

      // ── 轮播 3 ──
      '✨ NEW · 신제품 출시': '✨ NEW · 新品上市',
      '카카오톡 5년 대화,': '5 年 KakaoTalk 对话,',
      '한 번에 백업': '一键备份',
      '완료': '',
      '기종 변경할 때마다 카톡 백업 끊기셨죠?': '换机时 KakaoTalk 备份总是中断?',
      'OneTap ChatBack은 모든 대화·사진·동영상을 완벽 보존합니다.': 'OneTap ChatBack 完美保留每一条对话、照片和视频。',
      '카카오톡 · 라인 대화 무제한 백업': 'KakaoTalk / LINE 对话无限备份',
      '안드로이드 ↔ 아이폰 양방향 전송': '安卓 ↔ iPhone 双向互传',
      'PC에서 카톡 대화 검색·열람': '在电脑上搜索 / 查看 KakaoTalk 对话',
      '무료 체험 시작 →': '免费体验 →',
      '자세히 보기': '了解详情',

      // ── 轮播 4 ──
      '💾 데이터 복구 전문': '💾 专业数据恢复',
      '실수로 지운 사진,': '不小心删除的照片,',
      '백업 없이도': '无需备份',
      '복구': '即可恢复',
      '"5년 치 추억이 한순간에…" 그런 절망, 이제 끝.': '"5 年回忆瞬间消失……" 那种绝望,到此为止。',
      'OneTap Recover는 백업 없어도 35가지 데이터를 살려냅니다.': 'OneTap Recover 在无备份情况下仍可恢复 35 种数据。',
      '사진·동영상·연락처·메모 100% 복구': '100% 恢复照片 / 视频 / 联系人 / 备忘录',
      '카카오톡·인스타·라인 메시지 복원': '恢复 KakaoTalk / Instagram / LINE 消息',
      '물에 빠지거나 깨진 폰에서도 복구': '进水或损坏的手机也能恢复',
      '무료 스캔 시작 →': '免费扫描 →',
      '복구 사례 보기': '查看成功案例',

      // ── 轮播 5 ──
      '🔓 잠금 해제 솔루션': '🔓 解锁方案',
      '비밀번호 잊은 아이폰,': '忘记密码的 iPhone,',
      'AS 센터 갈 필요 없어요': '无需前往售后中心',
      'Face ID도 안 먹히고 비밀번호도 까먹었나요?': 'Face ID 失效 + 密码遗忘?',
      'OneTap UnLock으로 집에서 5분 안에 안전하게 해제하세요.': 'OneTap UnLock 在家 5 分钟内安全解锁。',
      '4자리·6자리·문자 비밀번호 모두 해제': '解锁 4 位 / 6 位 / 字母密码',
      'Apple ID 잠금 해제 (비밀번호 분실 시)': 'Apple ID 解锁 (密码丢失时)',
      '스크린 타임·MDM 잠금 우회': '绕过屏幕时间 / MDM 锁',
      '잠금 해제하기 →': '立即解锁 →',
      '사용 가이드': '使用指南',

      // ── 轮播 6 ──
      '📤 데이터 전송 #1': '📤 #1 数据传输',
      '새 폰 샀는데,': '换新机',
      '데이터 옮기기': '数据迁移',
      '30분이 30초로': '30 分钟变 30 秒',
      'iCloud 용량 부족? 백업 끊김? 그런 거 없어요.': 'iCloud 空间不足? 备份中断? 不会再有。',
      'OneTap Transfer는 무선·고속으로 모든 걸 옮깁니다.': 'OneTap Transfer 无线高速迁移所有数据。',
      '사진·음악·동영상 무제한 전송': '照片 / 音乐 / 视频无限传输',
      'iCloud 없이 무료 전체 백업': '无需 iCloud 即可免费全量备份',
      '안드로이드 ↔ 아이폰 양방향 지원': '安卓 ↔ iPhone 双向支持',
      '기능 비교': '功能对比',

      // ── 轮播 7 ──
      '🎉 iPhone 17 시리즈 완벽 호환': '🎉 完美兼容 iPhone 17 系列',
      'iPhone 17 Pro Max도': 'iPhone 17 Pro Max',
      '한 번에 해결': '一键解决',
      '최신 iPhone 17 시리즈와 iOS 27까지 완벽 지원.': '完美支持最新 iPhone 17 系列与 iOS 27。',
      '전 제품 라인업이 최신 디바이스에 최적화됐습니다.': '全产品线已针对最新设备深度优化。',
      'iPhone 17 / 17 Air / 17 Pro / Pro Max 지원': '支持 iPhone 17 / 17 Air / 17 Pro / Pro Max',
      'iOS 27 베타 ~ iOS 13 모든 버전 호환': '兼容 iOS 13 至 iOS 27 Beta',
      'M5 칩셋 Mac · Apple Silicon 네이티브': '原生支持 M5 芯片 Mac 和 Apple Silicon',
      '호환 기기 확인 →': '查看兼容机型 →',

      // ── 信任数据 ──
      '1,200만+': '1200万+',
      '누적 다운로드 수': '累计下载量',
      '370만+': '370万+',
      '월간 활성 사용자': '月活用户',
      '2026년 기준 한국 사용자 증가율': '2026 年韩国用户增长率',
      '4.8점': '4.8 分',
      '/ 5.0': '/ 5.0',
      '리뷰 평점': '用户评分',

      // ── 热门产品 ──
      '인기 제품 — 스마트폰 문제 완벽 해결': '热门产品 — 完美解决手机问题',
      '시스템 복구 & 암호 해제': '系统修复 & 解锁',
      '데이터 복구': '数据恢复',
      'AI 도구': 'AI 工具',
      '무료 다운로드': '免费下载',
      '지금 구매하기': '立即购买',

      'iOS, iPadOS, tvOS에서 발생하는 150가지 이상의 문제를 복구하며, 최신 iOS 27 베타까지 지원합니다.':
        '修复 iOS、iPadOS、tvOS 上 150 多种问题,支持最新 iOS 27 Beta。',
      'OneTap UnLock for Android': 'OneTap UnLock for Android',
      'Android 기기의 비밀번호, PIN, 지문, 얼굴 인식, 패턴 잠금을 해제할 수 있으며, 최신 Android 16까지 지원합니다.':
        '解锁安卓设备的密码、PIN、指纹、人脸识别和图案锁,支持最新 Android 16。',
      'OneTap UnLock for iOS': 'OneTap UnLock for iOS',
      '비밀번호, Touch ID, Face ID 없이 iPhone/iPad/iPod의 화면 잠금을 몇 분 만에 해제할 수 있는 프로그램으로, 데이터 손실 없이 스크린 타임 암호 해제도 지원합니다.':
        '无需密码、Touch ID 或 Face ID,几分钟即可解锁 iPhone / iPad / iPod 屏幕,并可无损解除屏幕时间密码。',
      '음악, 사진, 동영상, 연락처 등 다양한 데이터를 iPhone과 PC 간에 자유롭게 전송하고 무료 백업까지 가능합니다.':
        '在 iPhone 与 PC 之间自由传输音乐、照片、视频和联系人,还可免费备份。',
      '카카오톡, 라인의 대화 내용·사진·동영상을 완벽 백업하고, 안드로이드↔아이폰 양방향으로 옮길 수 있습니다.':
        '完整备份 KakaoTalk、LINE 的聊天记录、照片和视频,支持安卓 ↔ iPhone 双向迁移。',
      'iPhone/Android 화면을 PC로 미러링하여 큰 화면에서 보고 녹화하며, 게임/회의/강의 콘텐츠 제작에 최적화되어 있습니다.':
        '将 iPhone / 安卓屏幕镜像至 PC,大屏观看与录制,专为游戏、会议、课程内容创作优化。',
      'OneTap Recover for iOS': 'OneTap Recover for iOS',
      '백업이 없어도 iPhone에서 삭제된 사진·동영상·메시지·연락처 등 35가지 이상 데이터 유형을 복구할 수 있습니다.':
        '即便没有备份,也可从 iPhone 恢复照片、视频、消息、联系人等 35 种以上数据类型。',
      'OneTap Recover for Android': 'OneTap Recover for Android',
      'Android 디바이스·SD카드에서 사라진 사진·문서·동영상을 빠르게 스캔하고 복구합니다. 깨진 기기에서도 작동합니다.':
        '快速扫描安卓设备 / SD 卡,恢复消失的照片、文档和视频。损坏设备也能恢复。',
      'OneTap Recover for PC': 'OneTap Recover for PC',
      'PC, 외장 하드, USB, SD카드에서 2,000가지 이상의 데이터 형식을 복구합니다. 포맷·바이러스 손상도 대응합니다.':
        '从 PC、移动硬盘、USB、SD 卡恢复 2000+ 种文件格式,可应对格式化与病毒损坏。',
      'AI 엔진으로 배경 제거·색상 보정·이미지 확장·AI 생성까지. 일괄 편집으로 수십 장 사진을 한 번에 가공할 수 있습니다.':
        'AI 引擎实现背景去除、色彩校正、图像扩展和 AI 生成。批量编辑数十张照片一气呵成。',
      'AI 기반 PDF 읽기·요약·번역과 99% 정확도의 OCR을 제공합니다. PDF 편집·변환·병합까지 한 곳에서.':
        'AI 驱动的 PDF 阅读、摘要、翻译,搭配 99% 准确度的 OCR。编辑、转换、合并一站搞定。',
      '이미지 속 텍스트를 실시간으로 인식하고 번역합니다. 80개 이상 언어를 지원하며 메뉴판·간판도 즉시 한국어로.':
        '实时识别并翻译图像中的文字,支持 80 多种语言,菜单、招牌即拍即译。',

      // ── 最新版本 ──
      '최신 버전': '最新版本',
      '신규 출시': '新品上市',
      'OneTap Pretty — AI 사진 편집의 새로운 기준': 'OneTap Pretty — AI 照片编辑的全新标准',
      '최신 AI 엔진으로 배경 제거, 색상 보정, 일괄 편집은 물론 이미지 확장과 AI 생성 기능까지 간편하게 사용할 수 있습니다. 많은 사진도 빠르게 처리하여 일관된 고퀄리티 결과를 완성해 보세요.':
        '采用最新 AI 引擎,轻松完成背景去除、色彩校正、批量编辑,还支持图像扩展和 AI 生成。海量照片高速处理,呈现一致高品质效果。',
      '자세히 보기 →': '了解详情 →',

      // ── 评价 ──
      '사용자 후기 & 미디어 리뷰': '用户评价 & 媒体报道',
      '사용자 후기': '用户评价',
      'SNS 반응': '社交反响',
      '미디어 리뷰': '媒体评论',
      'iPhone 아이폰이 갑자기 애플 로고에서 멈춰서 엄청 당황했는데, OneTap ReBoot 사용하니까 몇 분 만에 바로 해결됐어요. 데이터도 안 날아가서 진짜 다행입니다 :)':
        'iPhone 突然卡在苹果 logo 上吓了我一跳,用 OneTap ReBoot 几分钟就修好了,数据也没丢,太感谢了 :)',
      '김유미': '金宥美',
      '아이폰 바꾸면서 데이터 옮겨야 해서 OneTap Transfer 써봤는데, 케이블만 꽂으면 돼서 진짜 편했어요. 처음이라 걱정했는데 생각보다 쉽게 끝났네요~':
        '换 iPhone 时用 OneTap Transfer 迁移数据,插上数据线就行,真的太方便!第一次用还担心,结果意外地简单~',
      '김마리': '金玛丽',
      '비밀번호를 잊어버려서 아이폰 잠금이 안 풀렸는데, OneTap UnLock으로 금방 해결됐어요. 진작 알았으면 좋았을 텐데요!':
        '忘了 iPhone 密码解不开锁,用 OneTap UnLock 一下子就搞定了。早知道就好了!',
      '박지훈': '朴志勋',
      '인스타 사진 실수로 다 지웠다가 OneTap Recover로 살려냄ㅠㅠ 진짜 천재 프로그램. 친구들한테 다 추천했어요 #OneTapiOS':
        '不小心删了 Ins 全部照片,用 OneTap Recover 救回来了😭真的是神器,已经推荐给所有朋友 #OneTapiOS',
      '트위터에서 추천받고 써봤는데 카톡 5년 치 백업 한 번에 됨ㅋㅋ 기종변경 두렵지 않다 이제. 별 다섯개 만점!!':
        '推特推荐的,试了一下 KakaoTalk 5 年记录一次备份成功 lol 换机不再可怕,五星好评!!',
      '유튜브에서 보고 산 OneTap UnLock... 진짜 5분 만에 잠금 풀림. 비싸지도 않고 한국어 지원도 좋고 만족 200%':
        'YouTube 看到买的 OneTap UnLock……真的 5 分钟解锁。价格也不贵,韩语支持也好,200% 满意。',
      '"OneTap iOS의 한 번 클릭 복구는 일반 사용자도 부담 없이 사용할 수 있는 가장 직관적인 솔루션이다.":':
        '"OneTap iOS 的一键修复是普通用户也能轻松上手的最直观方案。"',
      '"OneTap iOS의 한 번 클릭 복구는 일반 사용자도 부담 없이 사용할 수 있는 가장 직관적인 솔루션이다."':
        '"OneTap iOS 的一键修复是普通用户也能轻松上手的最直观方案。"',
      '디지털타임스': 'Digital Times',
      '"국내 iOS 복구 도구 중 가장 빠른 처리 속도와 높은 성공률을 기록. 특히 한국어 고객 지원이 인상적."':
        '"国内 iOS 修复工具中处理速度最快、成功率最高,韩语客服尤其令人印象深刻。"',
      '테크플러스': 'Tech Plus',
      '"기업용으로도 활용 가능한 안정성. 데이터 보존율이 업계 최고 수준이며 보안 인증도 갖추고 있다."':
        '"企业级稳定性,数据保留率行业领先,并具备完整安全认证。"',
      'IT 비즈니스': 'IT Business',

      // ── 博客 ──
      '📚 꿀팁 모음': '📚 实用教程',
      '아이폰 활용 가이드': 'iPhone 使用指南',
      'iPhone, iPad를 200% 활용하는 노하우': '把 iPhone / iPad 用到极致的诀窍',
      '📱 iOS 27': '📱 iOS 27',
      'iOS 27 가이드': 'iOS 27 指南',
      'iOS 27 업데이트, 지금 해도 될까? 4단계 체크리스트': 'iOS 27 更新现在能升吗?4 步检查清单',
      '📖 5분 읽기': '📖 5 分钟阅读',
      '💾 데이터 복구': '💾 数据恢复',
      '실수로 삭제한 사진, 백업 없이도 복구하는 5가지 방법': '误删照片?5 种方法无备份也能恢复',
      '📖 7분 읽기': '📖 7 分钟阅读',
      '🔓 잠금 해제': '🔓 解锁',
      '잠금 해제': '解锁',
      '아이폰 비밀번호를 잊었을 때 가장 안전한 해결법': '忘记 iPhone 密码时最安全的解决办法',
      '📖 6분 읽기': '📖 6 分钟阅读',

      // ── CTA ──
      '지금 시작하세요': '立即开始',
      'OneTap iOS와 함께 모든 iPhone 문제를 30초 안에 해결하세요.': '与 OneTap iOS 一起,30 秒解决所有 iPhone 问题。',
      '무료 체험 시작하기 →': '免费试用 →',
      '이번 기회를 놓치지 마세요': '别错过这次机会',
      '30일 무료 환불 보장 · 1:1 한국어 고객지원 · 평생 무료 업데이트': '30 天无理由退款 · 1:1 客服 · 终身免费更新',
      '지금 할인가로 구매하기 →': '立即享受优惠 →',
      '30일 무료 환불 보장 · 1:1 한국어 고객지원': '30 天无理由退款 · 1:1 客户服务',

      // ── 页脚 ──
      'iOS 시스템 문제를 한 번의 탭으로 해결하는 가장 빠른 방법.': '一键解决 iOS 问题最快捷的方式。',
      '2020년 설립 이후 전 세계 5,000만+ 사용자가 신뢰합니다.': '自 2020 年成立以来,获得全球 5000 万 + 用户信赖。',
      '인기 제품': '热门产品',
      '회사 소개': '关于公司',
      '회사 정보': '公司信息',
      '파트너십': '合作伙伴',
      '채용 정보': '招聘信息',
      '언론 보도': '媒体报道',
      '제휴 문의': '合作咨询',
      '고객 지원': '客户支持',
      '자주 묻는 질문': '常见问题',
      '환불 정책': '退款政策',
      '1:1 문의': '1:1 咨询',
      '이용 약관': '使用条款',
      '개인정보 처리방침': '隐私政策',
      '서비스 이용약관': '服务条款',
      '라이센스 약관': '授权条款',
      '쿠키 정책': 'Cookie 政策',
      '🔒 SSL 보안': '🔒 SSL 加密',
      '✅ 검증된 결제': '✅ 安全支付',
      '🛡️ DMCA 보호': '🛡️ DMCA 保护',

      // ── 修复方案页 ──
      '🔧 복구 솔루션': '🔧 修复方案',
      'iOS 시스템 & 데이터 복구': 'iOS 系统与数据修复',
      '아이폰이 멈췄을 때, 부팅이 안 될 때, 데이터를 잃어버렸을 때': '当 iPhone 死机、无法开机或数据丢失时,',
      'OneTap iOS의 강력한 복구 도구로 한 번에 해결하세요.': '使用 OneTap iOS 强大的修复工具一次解决。',
      '🔧 OneTap ReBoot': '🔧 OneTap ReBoot',
      'iOS 시스템 문제': 'iOS 系统问题',
      '한 번에 복구': '一键修复',
      '애플 로고에서 멈췄거나, 검은 화면, 무한 재부팅, 흰 화면 등 iOS, iPadOS, tvOS의':
        '卡在苹果 logo、黑屏、无限重启、白屏等 iOS、iPadOS、tvOS 上的',
      '150가지 이상의 문제': '150+ 类问题',
      '를 데이터 손실 없이 복구합니다.': ',零数据丢失修复。',
      '30초 만에 복구 모드 진입/해제': '30 秒进入 / 退出恢复模式',
      'iOS 27 베타 및 iPhone 17 Pro Max 지원': '支持 iOS 27 Beta 与 iPhone 17 Pro Max',
      '다운그레이드 / 업그레이드 모두 가능': '降级 / 升级均可',
      '비활성화된 디바이스도 복구': '已停用设备也能修复',
      '💾 OneTap Recover': '💾 OneTap Recover',
      '실수로 지운 데이터,': '不小心删除的数据,',
      '사진을 실수로 삭제하셨나요? 카톡 대화가 사라졌나요? 백업이 없어도 OneTap Recover가':
        '误删了照片? KakaoTalk 对话消失了? 没有备份,OneTap Recover 也能恢复',
      '35가지 이상의 데이터 유형': '35+ 种数据类型',
      '을 복구해 드립니다.': '。',
      '백업 없이도 삭제된 데이터 복구': '无需备份也能恢复已删除数据',
      '카카오톡 / 라인 / 인스타그램 메시지 복원': '恢复 KakaoTalk / LINE / Instagram 消息',
      '사진·동영상·메모·연락처 100% 복구': '照片 / 视频 / 备忘录 / 联系人 100% 恢复',
      '물에 빠지거나 깨진 iPhone에서도 복구 가능': '进水或损坏的 iPhone 也可恢复',
      '🧹 OneTap Cleaner': '🧹 OneTap Cleaner',
      '아이폰 저장공간,': 'iPhone 存储空间,',
      '한 번에 정리': '一键清理',
      '"저장 공간이 부족합니다" 알림에 지치셨나요? OneTap Cleaner로': '厌倦了"存储空间不足"提示? 用 OneTap Cleaner',
      '중복 사진, 큰 파일, 캐시': '重复照片、大文件、缓存',
      '를 한 번에 정리하세요.': '一键清理。',
      '중복 사진 자동 감지 및 일괄 삭제': '自动检测并批量删除重复照片',
      '20MB 이상 큰 파일 빠른 검색': '快速查找 20MB 以上大文件',
      '앱 캐시 / 정크 파일 안전 제거': '安全清除应用缓存与垃圾文件',
      '최대 50% 저장공간 확보': '最高释放 50% 存储空间',

      // ── 数据传输页 ──
      '📤 데이터 전송': '📤 数据传输',
      '새 폰으로 옮길 때, 한 번에': '换新机时,一键迁移',
      '기종 변경할 때마다 백업이 끊기고 사진이 사라졌던 분들께': '如果你每次换机都丢备份、丢照片,',
      'OneTap Transfer가 모든 걸 한 번에 옮겨드립니다.': 'OneTap Transfer 一次性把所有数据迁移过去。',
      '📤 OneTap Transfer': '📤 OneTap Transfer',
      '새 폰으로 옮길 때': '换机时',
      '한 번에 전송': '一键传输',
      '기종 변경할 때마다 번거로우셨죠? OneTap Transfer로': '每次换机都很麻烦吧?用 OneTap Transfer',
      '카카오톡, 사진, 연락처, 음악': 'KakaoTalk、照片、联系人、音乐',
      '까지 모든 데이터를 한 번에 옮기세요.': '等所有数据一次性迁移。',
      '카카오톡 / 라인 대화 백업 및 복원': 'KakaoTalk / LINE 对话备份与恢复',
      'WhatsApp 데이터 안드로이드↔아이폰 전송': '安卓 ↔ iPhone 的 WhatsApp 数据互传',
      '음악·사진·동영상 무제한 전송': '音乐 / 照片 / 视频无限传输',
      'iCloud 없이 무료 백업': '无需 iCloud 即可免费备份',
      '💬 OneTap ChatBack': '💬 OneTap ChatBack',
      '기종 변경할 때마다 카톡 백업이 끊겼나요? OneTap ChatBack은 모든': '换机时 KakaoTalk 备份总中断? OneTap ChatBack 完整保留所有',
      '카카오톡 / 라인 대화·사진·동영상': 'KakaoTalk / LINE 对话、照片、视频',
      '을 완벽하게 보존합니다.': '。',
      '특정 대화방만 선택 백업 가능': '可选择性备份特定聊天室',
      '📱 OneTap Mirror': '📱 OneTap Mirror',
      'PC로 화면 미러링 ·': '屏幕镜像到 PC ·',
      '고화질 녹화': '高清录制',
      'iPhone / Android 화면을 PC로 미러링하여': '把 iPhone / 安卓屏幕镜像到 PC,',
      '큰 화면에서 보고 녹화': '大屏观看并录制',
      '하세요. 게임 방송, 회의, 강의 콘텐츠 제작에 최적화됐습니다.': '。专为游戏直播、会议、课程内容创作优化。',
      'iPhone / Android 화면 PC로 무선 미러링': 'iPhone / 安卓屏幕无线镜像至 PC',
      '4K 60fps 고화질 녹화': '4K 60fps 高清录制',
      '실시간 게임·앱 방송 송출': '实时游戏 / 应用直播',
      '줌·Teams 회의에서 화면 공유': 'Zoom / Teams 会议屏幕共享',

      // ── 解锁页 ──
      '🔓 암호 해제': '🔓 密码解锁',
      '잠긴 iPhone, 안전하게 해제': '锁定的 iPhone,安全解锁',
      '비밀번호를 잊었거나, Face ID·Touch ID가 작동하지 않을 때': '忘记密码或 Face ID / Touch ID 无法识别时,',
      'OneTap UnLock으로 데이터 손실 없이 안전하게 해제하세요.': '用 OneTap UnLock 无损解锁。',
      '🔐 OneTap UnLock': '🔐 OneTap UnLock',
      '잠긴 iPhone,': '锁定的 iPhone,',
      '비밀번호 없이 해제': '无需密码解锁',
      '비밀번호를 잊으셨나요? Face ID / Touch ID가 작동하지 않나요? OneTap UnLock으로': '忘记密码? Face ID / Touch ID 失灵? 用 OneTap UnLock 安全解除',
      '모든 종류의 iPhone 잠금': '所有类型的 iPhone 锁',
      '을 안전하게 해제하세요.': '。',
      '화면 잠금 비밀번호 해제 (4자리/6자리/문자)': '解除屏幕锁密码 (4 位 / 6 位 / 字母)',
      'Apple ID 해제 (비밀번호 분실 시)': 'Apple ID 解锁 (密码丢失时)',
      'MDM 잠금 해제 (학교/회사 제한)': '解除 MDM 锁 (学校 / 公司限制)',
      '🆔 OneTap UnLock Pro': '🆔 OneTap UnLock Pro',
      'Apple ID / MDM 잠금': 'Apple ID / MDM 锁',
      '전문가용 해제': '专业级解锁',
      '중고로 산 아이폰의 Apple ID가 안 풀리나요? 학교·회사에서 받은 기기의 MDM 잠금에 걸려있나요?': '二手 iPhone 上的 Apple ID 解不开? 学校 / 公司发的设备被 MDM 锁住?',
      '전문가용 고급 해제': '专业级高级解锁',
      '를 사용하세요.': '在此为你解决。',
      '이전 소유자 Apple ID 영구 제거': '永久移除上一任所有者的 Apple ID',
      'MDM(원격 관리) 잠금 우회': '绕过 MDM (远程管理) 锁',
      'iPhone 5s ~ 최신 17 Pro Max 지원': '支持 iPhone 5s 至最新 17 Pro Max',
      'iCloud 계정 변경 가능': '可更换 iCloud 账户',
      '⏰ OneTap ScreenTime': '⏰ OneTap ScreenTime',
      '스크린 타임 비밀번호,': '屏幕时间密码,',
      '안전하게 해제': '安全解除',
      '자녀가 설정한 스크린 타임 암호를 잊으셨나요? 부모 통제 비밀번호가 안 풀리나요?': '忘了孩子设的屏幕时间密码? 家长控制密码解不开?',
      '데이터 손실 없이': '无数据丢失',
      '한 번에 해제하세요.': ',一次解除。',
      '스크린 타임 4자리 비밀번호 우회': '绕过屏幕时间 4 位密码',
      '제한 사항 비밀번호 제거': '移除访问限制密码',
      '패밀리 공유 잠금 해제': '解除家人共享限制',
      'iOS 12 ~ iOS 27 베타 지원': '支持 iOS 12 至 iOS 27 Beta',

      // ── 特惠页 ──
      '한정 특가 · 최대 70% OFF': '限时特惠 · 最高立减 70%',
      '1년에 단 한 번! OneTap iOS 전 제품 라이센스를 역대 최저가로 만나보세요.': '一年仅一次! OneTap iOS 全产品授权,历史最低价。',
      '지금 가입하시면 50% 할인 쿠폰까지 함께!': '现在注册再得 50% 折扣券!',
      '🎉 신규 가입 한정! 전 제품 50% 할인': '🎉 仅限新注册! 全产品 5 折',
      '지금 가입하시면 OneTap iOS 전 제품 라이센스를 반값에!': '现在注册即可半价购买 OneTap iOS 全部产品授权!',
      '일': '天',
      '시간': '时',
      '분': '分',
      '초': '秒',
      '🏷️ 전 제품 할인가': '🏷️ 全产品折扣价',
      '지금 구매하시면 정가 대비 50% ~ 70% 할인된 가격으로 평생 라이센스를 받으실 수 있습니다.': '立即购买可享 50%~70% 折扣的终身授权。',
      'iOS 시스템 문제 150종 한 번에 복구': '一键修复 150 种 iOS 系统问题',
      'AI 사진 편집·배경 제거': 'AI 照片编辑 / 背景去除',
      '🎁 SUPER DEAL': '🎁 超级套餐',
      '전 제품 통합 패키지': '全产品整合套装',
      'OneTap iOS 모든 제품을 평생 라이센스로 한 번에!': 'OneTap iOS 全部产品终身授权,一次拿下!',
      '개별 구매보다 80% 저렴합니다.': '比单独购买便宜 80%。',
      '전 제품 평생 라이센스 받기 →': '获取全产品终身授权 →',

      // ── Alt 文本 ──
      'iPhone 시스템 복구': 'iPhone 系统修复',
      '신규 가입 50% 할인': '新用户 50% 折扣',
      '카카오톡 대화 백업': 'KakaoTalk 对话备份',
      '삭제된 사진 데이터 복구': '已删除的照片数据恢复',
      '잠긴 아이폰 해제': '锁定的 iPhone 解锁',
      '새 아이폰으로 데이터 전송': '向新 iPhone 传输数据',
      'iPhone 17 Pro Max': 'iPhone 17 Pro Max',
      '원본': '原图',
      '편집 후': '编辑后',
      'AI 사진 편집 OneTap Pretty': 'AI 照片编辑 OneTap Pretty',
      'iOS 27 업데이트 가이드': 'iOS 27 更新指南',
      '데이터 복구 가이드': '数据恢复指南',
      '아이폰 잠금 해제': 'iPhone 解锁',
      'iOS 시스템 복구': 'iOS 系统修复',
      '삭제된 데이터 복구': '已删除数据恢复',
      '아이폰 저장공간 정리': 'iPhone 存储清理',
      '새 폰으로 데이터 전송': '向新机传输数据',
      '카카오톡 라인 대화 백업': 'KakaoTalk / LINE 对话备份',
      'PC로 화면 미러링 녹화': '屏幕镜像录制到 PC',
      '잠긴 iPhone 잠금 해제': '解锁锁定的 iPhone',
      'Apple ID MDM 잠금 해제': 'Apple ID / MDM 解锁',
      '스크린 타임 비밀번호 해제': '屏幕时间密码解除',

      // ── auth.js 模态框 ──
      '회원가입': '注册',
      '이메일 주소': '邮箱地址',
      '비밀번호': '密码',
      '자동 로그인': '自动登录',
      '비밀번호 찾기': '找回密码',
      '또는 SNS로 시작': '或使用社交账号',
      '💬 카카오톡으로 시작': '💬 使用 KakaoTalk',
      'N 네이버로 시작': 'N 使用 Naver',
      'G 구글로 시작': 'G 使用 Google',
      '🎉 신규 가입 시 50% 할인 쿠폰 즉시 증정!': '🎉 注册即送 50% 折扣券!',
      '이름': '姓名',
      '비밀번호 (8자 이상)': '密码(至少 8 位)',
      '비밀번호 확인': '确认密码',
      '이용약관': '使用条款',
      '및': '与',
      '에 동의합니다 (필수)': '(必选)',
      '이벤트 / 할인 정보 수신 동의 (선택)': '同意接收活动 / 折扣信息(可选)',
      '닫기': '关闭',
    },
  };

  // ──────────────────────────────────────────────────────────────
  // 헬퍼
  // ──────────────────────────────────────────────────────────────
  function getLang() {
    try { return localStorage.getItem(LANG_KEY) || 'ko'; } catch(e) { return 'ko'; }
  }

  function setLang(lang) {
    try { localStorage.setItem(LANG_KEY, lang); } catch(e) {}
    location.reload();
  }
  window.setLang = setLang;

  function translateNode(root) {
    const lang = getLang();
    if (lang === 'ko' || !T[lang]) return;
    const dict = T[lang];

    const walker = document.createTreeWalker(root || document.body, NodeFilter.SHOW_TEXT, null);
    const nodes = [];
    let n;
    while ((n = walker.nextNode())) nodes.push(n);

    for (const node of nodes) {
      if (!node.nodeValue) continue;
      const key = node.nodeValue.trim();
      if (!key) continue;
      if (dict[key] !== undefined) {
        const m = node.nodeValue.match(/^(\s*)([\s\S]*?)(\s*)$/);
        const lead = m ? m[1] : '';
        const trail = m ? m[3] : '';
        node.nodeValue = lead + dict[key] + trail;
      }
    }

    // 속성 번역
    const attrs = ['title', 'alt', 'placeholder', 'aria-label'];
    const scope = root && root.querySelectorAll ? root : document;
    scope.querySelectorAll('[' + attrs.join('],[') + ']').forEach(el => {
      attrs.forEach(a => {
        const v = el.getAttribute(a);
        if (v && dict[v.trim()] !== undefined) el.setAttribute(a, dict[v.trim()]);
      });
    });
  }

  function translatePageMeta() {
    const lang = getLang();
    document.documentElement.lang = lang;
    if (lang === 'ko' || !T[lang]) return;
    const dict = T[lang];
    if (document.title && dict[document.title.trim()] !== undefined) {
      document.title = dict[document.title.trim()];
    }
  }

  // ──────────────────────────────────────────────────────────────
  // 언어 선택 드롭다운
  // ──────────────────────────────────────────────────────────────
  function injectStyles() {
    const css = `
      .lang-switcher{position:relative;display:inline-block;font-size:12px;}
      .lang-current{background:none;border:none;color:inherit;cursor:pointer;font:inherit;padding:4px 10px;border-radius:6px;display:inline-flex;align-items:center;gap:4px;transition:background .15s,color .15s;}
      .lang-current:hover{background:#f0f0f0;color:#1d1d1f;}
      .lang-menu{position:absolute;top:calc(100% + 4px);right:0;background:#fff;border-radius:10px;box-shadow:0 8px 28px rgba(0,0,0,0.18);min-width:150px;padding:6px 0;display:none;z-index:9999;}
      .lang-menu.active{display:block;}
      .lang-menu button{display:flex;align-items:center;gap:10px;width:100%;border:none;background:none;padding:10px 16px;font-size:14px;color:#1d1d1f;cursor:pointer;text-align:left;font-family:inherit;}
      .lang-menu button:hover{background:#f5f5f7;}
      .lang-menu button.active{color:#007aff;font-weight:600;background:#f0f7ff;}
      .lang-menu button .check{margin-left:auto;color:#007aff;}
    `;
    const style = document.createElement('style');
    style.textContent = css;
    document.head.appendChild(style);
  }

  function injectLangSwitcher() {
    // 상단바의 '🌏 한국어' 링크를 드롭다운으로 교체
    const links = document.querySelectorAll('.topbar-links a');
    let target = null;
    links.forEach(a => {
      if (a.textContent && a.textContent.indexOf('🌏') !== -1) target = a;
    });
    if (!target) return;

    const cur = getLang();
    const langs = ['ko', 'en', 'zh'];
    const labels = {
      ko: '🇰🇷 한국어',
      en: '🇺🇸 English',
      zh: '🇨🇳 中文',
    };

    const wrap = document.createElement('div');
    wrap.className = 'lang-switcher';
    wrap.innerHTML =
      '<button class="lang-current" type="button" aria-haspopup="true">' +
        '🌏 ' + LANGS[cur].name + ' ▾' +
      '</button>' +
      '<div class="lang-menu" role="menu">' +
        langs.map(l =>
          '<button type="button" data-lang="' + l + '"' + (l === cur ? ' class="active"' : '') + '>' +
            '<span>' + labels[l] + '</span>' +
            (l === cur ? '<span class="check">✓</span>' : '') +
          '</button>'
        ).join('') +
      '</div>';
    target.replaceWith(wrap);

    const btn = wrap.querySelector('.lang-current');
    const menu = wrap.querySelector('.lang-menu');
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      menu.classList.toggle('active');
    });
    menu.querySelectorAll('button[data-lang]').forEach(b => {
      b.addEventListener('click', () => setLang(b.getAttribute('data-lang')));
    });
    document.addEventListener('click', (e) => {
      if (!wrap.contains(e.target)) menu.classList.remove('active');
    });
  }

  // ──────────────────────────────────────────────────────────────
  // 초기화 + 동적 콘텐츠 감시
  // ──────────────────────────────────────────────────────────────
  function init() {
    injectStyles();
    injectLangSwitcher();
    translatePageMeta();
    translateNode(document.body);

    // 동적으로 삽입되는 콘텐츠 (popular cards, reviews, auth modal) 자동 번역
    if (window.MutationObserver) {
      const obs = new MutationObserver(muts => {
        muts.forEach(m => {
          m.addedNodes.forEach(node => {
            if (node.nodeType === 1) translateNode(node);
          });
        });
      });
      obs.observe(document.body, { childList: true, subtree: true });
    }
  }

  // 노출: auth.js 등에서 모달 삽입 후 호출 가능
  window.applyI18n = function(root) { translateNode(root || document.body); };
  window.getCurrentLang = getLang;

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
