(function() {
  'use strict';

  // localStorage 키
  const USER_KEY = 'onetap_user';
  const USERS_DB_KEY = 'onetap_users_db';

  // 모달 HTML을 페이지에 동적 주입
  function injectAuthModal() {
    const modalHtml = `
      <div class="modal-overlay" id="authModal" onclick="if(event.target===this) closeAuthModal()">
        <div class="modal-box">
          <button class="modal-close" onclick="closeAuthModal()" aria-label="닫기">×</button>
          <div class="modal-logo">
            <div class="logo-icon">1</div>
            OneTap iOS
          </div>
          <div class="modal-tabs">
            <button class="mtab active" id="tabLogin" onclick="switchAuthTab(0)">로그인</button>
            <button class="mtab" id="tabSignup" onclick="switchAuthTab(1)">회원가입</button>
          </div>

          <!-- 로그인 폼 -->
          <form class="auth-form" id="loginForm" onsubmit="return handleLogin(event)">
            <input type="email" placeholder="이메일 주소" required id="loginEmail">
            <input type="password" placeholder="비밀번호" required id="loginPassword">
            <div class="form-row">
              <label><input type="checkbox" id="autoLogin"> 자동 로그인</label>
              <a href="#" class="form-link" onclick="alert('비밀번호 재설정 안내를 이메일로 보내드립니다.'); return false;">비밀번호 찾기</a>
            </div>
            <button type="submit" class="auth-btn">로그인</button>
            <div class="social-divider">또는 SNS로 시작</div>
            <div class="social-buttons">
              <button type="button" class="social-btn kakao" onclick="socialLogin('카카오')">💬 카카오톡으로 시작</button>
              <button type="button" class="social-btn naver" onclick="socialLogin('네이버')">N 네이버로 시작</button>
              <button type="button" class="social-btn google" onclick="socialLogin('구글')">G 구글로 시작</button>
            </div>
          </form>

          <!-- 회원가입 폼 -->
          <form class="auth-form hidden" id="signupForm" onsubmit="return handleSignup(event)">
            <div class="signup-badge">🎉 신규 가입 시 50% 할인 쿠폰 즉시 증정!</div>
            <input type="text" placeholder="이름" required id="signupName">
            <input type="email" placeholder="이메일 주소" required id="signupEmail">
            <input type="password" placeholder="비밀번호 (8자 이상)" required minlength="8" id="signupPassword">
            <input type="password" placeholder="비밀번호 확인" required minlength="8" id="signupPasswordConfirm">
            <label class="terms-check">
              <input type="checkbox" required id="agreeTerms">
              <span><a href="#" onclick="event.preventDefault()">이용약관</a> 및 <a href="#" onclick="event.preventDefault()">개인정보 처리방침</a>에 동의합니다 (필수)</span>
            </label>
            <label class="terms-check">
              <input type="checkbox" id="agreeMarketing">
              <span>이벤트 / 할인 정보 수신 동의 (선택)</span>
            </label>
            <button type="submit" class="auth-btn">회원가입</button>
          </form>
        </div>
      </div>
    `;
    document.body.insertAdjacentHTML('beforeend', modalHtml);
  }

  // 헤더의 로그인 버튼 → 모달 열기로 연결
  function attachLoginButtons() {
    document.querySelectorAll('.btn-login').forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.preventDefault();
        openAuthModal('login');
      });
    });
  }

  // 모달 열기/닫기
  window.openAuthModal = function(tab) {
    document.getElementById('authModal').classList.add('active');
    switchAuthTab(tab === 'signup' ? 1 : 0);
    document.body.style.overflow = 'hidden';
  };

  window.closeAuthModal = function() {
    document.getElementById('authModal').classList.remove('active');
    document.body.style.overflow = '';
  };

  // 탭 전환
  window.switchAuthTab = function(idx) {
    const isLogin = idx === 0;
    document.getElementById('tabLogin').classList.toggle('active', isLogin);
    document.getElementById('tabSignup').classList.toggle('active', !isLogin);
    document.getElementById('loginForm').classList.toggle('hidden', !isLogin);
    document.getElementById('signupForm').classList.toggle('hidden', isLogin);
  };

  // 로그인 처리
  window.handleLogin = function(e) {
    e.preventDefault();
    const email = document.getElementById('loginEmail').value.trim();
    const password = document.getElementById('loginPassword').value;

    // 등록된 사용자 확인
    const usersDB = JSON.parse(localStorage.getItem(USERS_DB_KEY) || '{}');
    const matched = usersDB[email];

    if (matched && matched.password === password) {
      saveUser({ email, name: matched.name });
      closeAuthModal();
      updateAuthUI();
      showToast(`${matched.name}님, 환영합니다! 👋`);
    } else if (matched) {
      alert('비밀번호가 일치하지 않습니다.');
    } else {
      // 데모용: 처음 로그인하는 경우 즉시 가입 처리
      const name = email.split('@')[0];
      usersDB[email] = { name, password };
      localStorage.setItem(USERS_DB_KEY, JSON.stringify(usersDB));
      saveUser({ email, name });
      closeAuthModal();
      updateAuthUI();
      showToast(`${name}님, 환영합니다! 👋`);
    }
    return false;
  };

  // 회원가입 처리
  window.handleSignup = function(e) {
    e.preventDefault();
    const name = document.getElementById('signupName').value.trim();
    const email = document.getElementById('signupEmail').value.trim();
    const password = document.getElementById('signupPassword').value;
    const passwordConfirm = document.getElementById('signupPasswordConfirm').value;

    if (password !== passwordConfirm) {
      alert('비밀번호가 일치하지 않습니다.');
      return false;
    }

    const usersDB = JSON.parse(localStorage.getItem(USERS_DB_KEY) || '{}');
    if (usersDB[email]) {
      alert('이미 가입된 이메일입니다. 로그인해주세요.');
      switchAuthTab(0);
      return false;
    }

    usersDB[email] = { name, password };
    localStorage.setItem(USERS_DB_KEY, JSON.stringify(usersDB));
    saveUser({ email, name });
    closeAuthModal();
    updateAuthUI();
    showToast(`${name}님, 가입 완료! 50% 할인 쿠폰이 발급됐어요 🎉`);
    return false;
  };

  // 소셜 로그인 (데모)
  window.socialLogin = function(provider) {
    const fakeEmail = `${provider.toLowerCase()}_user@${provider}.com`;
    const fakeName = `${provider}사용자`;
    saveUser({ email: fakeEmail, name: fakeName, provider });
    closeAuthModal();
    updateAuthUI();
    showToast(`${provider} 계정으로 로그인됐어요! 👋`);
  };

  // 사용자 저장
  function saveUser(user) {
    localStorage.setItem(USER_KEY, JSON.stringify(user));
  }

  function getUser() {
    try {
      return JSON.parse(localStorage.getItem(USER_KEY) || 'null');
    } catch (e) {
      return null;
    }
  }

  // 로그아웃
  window.logoutUser = function() {
    if (confirm('정말 로그아웃 하시겠어요?')) {
      localStorage.removeItem(USER_KEY);
      updateAuthUI();
      showToast('로그아웃 되었습니다');
    }
  };

  // UI 업데이트 (로그인 상태에 따라 헤더 변경)
  function updateAuthUI() {
    const user = getUser();
    document.querySelectorAll('.btn-login').forEach(btn => {
      const parent = btn.parentElement;

      // 기존 user-menu 제거
      const existingMenu = parent.querySelector('.user-menu');
      if (existingMenu) existingMenu.remove();

      if (user) {
        // 로그인 상태: 사용자 칩 표시
        btn.style.display = 'none';
        const initial = (user.name || user.email).charAt(0).toUpperCase();
        const menuHtml = `
          <div class="user-menu">
            <button class="user-chip" onclick="toggleUserMenu(event)">
              <div class="user-avatar">${initial}</div>
              <span>${user.name || user.email.split('@')[0]}</span>
              <span style="font-size:10px;opacity:0.5;">▼</span>
            </button>
            <div class="user-dropdown" id="userDropdown">
              <div class="user-dropdown-header">
                <div class="user-dropdown-name">${user.name}</div>
                <div class="user-dropdown-email">${user.email}</div>
              </div>
              <a href="#"><span>👤</span> 내 계정</a>
              <a href="#"><span>📦</span> 구매 내역</a>
              <a href="#"><span>🎟️</span> 보유 쿠폰</a>
              <a href="#"><span>⚙️</span> 설정</a>
              <button class="logout-btn" onclick="logoutUser()"><span>🚪</span> 로그아웃</button>
            </div>
          </div>
        `;
        btn.insertAdjacentHTML('afterend', menuHtml);
      } else {
        btn.style.display = '';
      }
    });
  }

  // 사용자 드롭다운 토글
  window.toggleUserMenu = function(e) {
    e.stopPropagation();
    const dropdown = document.getElementById('userDropdown');
    if (dropdown) dropdown.classList.toggle('active');
  };

  // 다른 곳 클릭 시 드롭다운 닫기
  document.addEventListener('click', (e) => {
    if (!e.target.closest('.user-menu')) {
      const dropdown = document.getElementById('userDropdown');
      if (dropdown) dropdown.classList.remove('active');
    }
  });

  // ESC로 모달 닫기
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeAuthModal();
  });

  // 토스트 알림
  function showToast(message) {
    const toast = document.createElement('div');
    toast.style.cssText = 'position:fixed;bottom:30px;left:50%;transform:translateX(-50%);background:#1d1d1f;color:white;padding:14px 22px;border-radius:999px;font-size:14px;font-weight:600;box-shadow:0 10px 30px rgba(0,0,0,0.25);z-index:10000;opacity:0;transition:opacity 0.3s,transform 0.3s;';
    toast.textContent = message;
    document.body.appendChild(toast);
    setTimeout(() => {
      toast.style.opacity = '1';
      toast.style.transform = 'translateX(-50%) translateY(-10px)';
    }, 10);
    setTimeout(() => {
      toast.style.opacity = '0';
      setTimeout(() => toast.remove(), 300);
    }, 3000);
  }

  // 초기화
  document.addEventListener('DOMContentLoaded', () => {
    injectAuthModal();
    attachLoginButtons();
    updateAuthUI();
  });
})();
