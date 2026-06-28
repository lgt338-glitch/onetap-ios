const $ = (id) => document.getElementById(id);

const FIELD_LABELS = {
  ProductType: '모델 ID',
  ProductVersion: 'iOS 버전',
  ActivationState: '활성화 상태',
  PasswordProtected: '암호 설정',
  SerialNumber: '시리얼 번호',
  UniqueDeviceID: 'UDID',
  RegionInfo: '지역',
};

const MODEL_NAMES = {
  'iPhone16,1': 'iPhone 15 Pro', 'iPhone16,2': 'iPhone 15 Pro Max',
  'iPhone15,4': 'iPhone 15', 'iPhone15,5': 'iPhone 15 Plus',
  'iPhone14,7': 'iPhone 14', 'iPhone14,8': 'iPhone 14 Plus',
  'iPhone14,2': 'iPhone 13 Pro', 'iPhone14,3': 'iPhone 13 Pro Max',
  'iPhone14,4': 'iPhone 13 mini', 'iPhone14,5': 'iPhone 13',
  'iPhone13,1': 'iPhone 12 mini', 'iPhone13,2': 'iPhone 12',
  'iPhone13,3': 'iPhone 12 Pro', 'iPhone13,4': 'iPhone 12 Pro Max',
};

function fmt(key, value) {
  if (value === null || value === undefined) return '—';
  if (key === 'PasswordProtected') return value ? '🔒 설정됨' : '🔓 없음';
  if (key === 'ProductType' && MODEL_NAMES[value]) return MODEL_NAMES[value];
  return String(value);
}

function setStatus(state, text) {
  $('statusBar').className = 'status status-' + state;
  $('statusText').textContent = text;
}

function showDevice(info) {
  $('emptyState').classList.add('hidden');
  $('deviceCard').classList.remove('hidden');
  const model = info.ProductType || '';
  $('devName').textContent = info.DeviceName || MODEL_NAMES[model] || '연결된 디바이스';
  $('devModel').textContent = `${MODEL_NAMES[model] || model} · iOS ${info.ProductVersion || '?'}`;
  const grid = $('devGrid');
  grid.innerHTML = '';
  for (const [key, label] of Object.entries(FIELD_LABELS)) {
    if (info[key] === undefined) continue;
    const cell = document.createElement('div');
    cell.className = 'cell';
    cell.innerHTML = `<div class="cell-label">${label}</div><div class="cell-value">${fmt(key, info[key])}</div>`;
    grid.appendChild(cell);
  }
  // Activation Lock indicator on unlock view
  const fm = $('findMyState');
  if (fm) {
    const activated = info.ActivationState === 'Activated';
    fm.textContent = activated ? '🔒 활성화됨 (Apple ID 비밀번호 필요)' : '🔓 비활성';
    fm.className = 'state-chip ' + (activated ? 'state-warn' : 'state-ok');
  }
}

async function refreshDevice() {
  setStatus('wait', '확인 중...');
  const res = await window.onetap.getDeviceInfo();
  if (res.ok && res.data && !res.data.error) {
    setStatus('on', '연결됨');
    showDevice(res.data);
  } else if (res.data && res.data.error === 'no_device') {
    setStatus('off', '연결된 디바이스 없음');
    $('deviceCard').classList.add('hidden');
    $('emptyState').classList.remove('hidden');
  } else {
    setStatus('err', '오류');
  }
}

function switchView(name) {
  document.querySelectorAll('.view').forEach(v => v.classList.add('hidden'));
  document.querySelectorAll('.nav-btn').forEach(b => b.classList.remove('active'));
  $('view-' + name).classList.remove('hidden');
  document.querySelector(`.nav-btn[data-view="${name}"]`).classList.add('active');
  const titles = {
    device: ['디바이스 정보', '잠금 상태와 활성화 상태를 먼저 확인합니다.'],
    unlock: ['화면 잠금 해제', '데이터 초기화 기반 잠금 해제 (정직 모드).'],
    info: ['한계 사항', '기술적으로 가능한 것 vs 불가능한 것을 명확히 안내합니다.'],
  };
  $('viewTitle').textContent = titles[name][0];
  $('viewSub').textContent = titles[name][1];
}

document.querySelectorAll('.nav-btn').forEach(btn => {
  btn.addEventListener('click', () => switchView(btn.dataset.view));
});
$('refreshBtn').addEventListener('click', refreshDevice);

// IPSW check
$('checkIpswBtn').addEventListener('click', async (e) => {
  const btn = e.target;
  const inline = $('ipswResult');
  btn.disabled = true;
  inline.textContent = '⏳ Apple TSS 서버 조회 중...';
  const res = await window.onetap.checkIpsw();
  btn.disabled = false;
  if (res.ok && res.data && res.data.firmwares) {
    const list = res.data.firmwares.slice(0, 3).map(f =>
      `<div class="ipsw-row">📦 <b>iOS ${f.version}</b> (${f.buildid}) · ${f.signed ? '✅ 서명됨' : '❌ 만료'}</div>`
    ).join('');
    inline.innerHTML = `<div class="ipsw-list">${list}</div>`;
  } else {
    inline.innerHTML = `<div class="ipsw-err">⚠️ ${(res.data && res.data.message) || res.stderr || '조회 실패'}</div>`;
  }
});

// Recovery enter as DFU substitute
$('enterDfuBtn').addEventListener('click', async (e) => {
  const btn = e.target;
  btn.disabled = true;
  btn.textContent = '⏳ 진행 중...';
  const res = await window.onetap.enterRecovery();
  btn.disabled = false;
  btn.textContent = '복구 모드 진입 (DFU 대체)';
  alert(
    res.ok && res.data && res.data.success
      ? '✅ 복구 모드 진입 명령 전송됨.\n디바이스 화면을 확인하세요.'
      : '⚠️ 실패: ' + ((res.data && res.data.message) || res.stderr || '오류')
  );
  refreshDevice();
});

window.addEventListener('DOMContentLoaded', refreshDevice);
setInterval(refreshDevice, 6000);
