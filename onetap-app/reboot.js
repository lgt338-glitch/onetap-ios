const $ = (id) => document.getElementById(id);

const FIELD_LABELS = {
  ProductType: '모델 ID',
  ProductVersion: 'iOS 버전',
  BuildVersion: '빌드 번호',
  UniqueDeviceID: 'UDID',
  SerialNumber: '시리얼 번호',
  WiFiAddress: 'Wi-Fi MAC',
  ActivationState: '활성화 상태',
  PasswordProtected: '암호 설정',
  CPUArchitecture: 'CPU',
  RegionInfo: '지역',
  DeviceClass: '디바이스 타입',
};

const MODEL_NAMES = {
  'iPhone16,1': 'iPhone 15 Pro', 'iPhone16,2': 'iPhone 15 Pro Max',
  'iPhone15,4': 'iPhone 15', 'iPhone15,5': 'iPhone 15 Plus',
  'iPhone14,7': 'iPhone 14', 'iPhone14,8': 'iPhone 14 Plus',
  'iPhone14,2': 'iPhone 13 Pro', 'iPhone14,3': 'iPhone 13 Pro Max',
  'iPhone14,4': 'iPhone 13 mini', 'iPhone14,5': 'iPhone 13',
  'iPhone13,1': 'iPhone 12 mini', 'iPhone13,2': 'iPhone 12',
  'iPhone13,3': 'iPhone 12 Pro', 'iPhone13,4': 'iPhone 12 Pro Max',
  'iPhone12,1': 'iPhone 11',
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
    device: ['디바이스 정보', 'USB로 연결된 iPhone / iPad 의 상태를 확인합니다.'],
    recovery: ['복구 모드 관리', '복구 모드 / DFU 모드 진입 및 해제를 자동화합니다.'],
    backup: ['백업 관리', 'PC 에 저장된 iTunes / Finder 백업을 검색·관리합니다.'],
  };
  $('viewTitle').textContent = titles[name][0];
  $('viewSub').textContent = titles[name][1];
}

document.querySelectorAll('.nav-btn').forEach(btn => {
  btn.addEventListener('click', () => switchView(btn.dataset.view));
});
$('refreshBtn').addEventListener('click', refreshDevice);

// Recovery actions
async function callRecovery(action, btn) {
  const orig = btn.textContent;
  btn.disabled = true;
  btn.textContent = '⏳ 진행 중...';
  const res = action === 'enter'
    ? await window.onetap.enterRecovery()
    : await window.onetap.exitRecovery();
  const box = $('recoveryResult');
  box.classList.remove('hidden');
  if (res.ok && res.data && res.data.success) {
    box.className = 'result-box result-ok';
    box.innerHTML = `<b>✅ 성공</b><br>${res.data.message || '작업 완료'}`;
  } else {
    box.className = 'result-box result-err';
    box.innerHTML = `<b>⚠️ 실패</b><br>${(res.data && res.data.message) || res.stderr || '알 수 없는 오류'}`;
  }
  btn.disabled = false;
  btn.textContent = orig;
  refreshDevice();
}
$('enterRecoveryBtn').addEventListener('click', (e) => callRecovery('enter', e.target));
$('exitRecoveryBtn').addEventListener('click', (e) => callRecovery('exit', e.target));

// Backup
$('loadBackupsBtn').addEventListener('click', async () => {
  const list = $('backupList');
  list.innerHTML = '<div class="loading">⏳ 검색 중...</div>';
  const res = await window.onetap.listBackups();
  if (res.ok && res.data && Array.isArray(res.data.backups)) {
    if (res.data.backups.length === 0) {
      list.innerHTML = '<div class="empty"><div class="empty-icon">📂</div><div class="empty-title">백업 없음</div><div class="empty-desc">이 PC 에서 만든 iTunes/Finder 백업을 찾을 수 없습니다.</div></div>';
      return;
    }
    list.innerHTML = res.data.backups.map(b => `
      <div class="backup-card">
        <div class="backup-name">📦 ${b.device_name || '디바이스'}</div>
        <div class="backup-meta">
          <span>${b.product_type || '—'}</span> ·
          <span>iOS ${b.ios_version || '?'}</span> ·
          <span>${b.last_backup_date || '—'}</span>
        </div>
        <div class="backup-meta">📁 ${b.path}</div>
        <div class="backup-meta">💾 크기: ${b.size_mb ? b.size_mb + ' MB' : '—'}</div>
      </div>
    `).join('');
  } else {
    list.innerHTML = `<div class="error"><div class="error-title">⚠️ 오류</div><pre>${(res.data && res.data.message) || res.stderr}</pre></div>`;
  }
});

window.addEventListener('DOMContentLoaded', refreshDevice);
setInterval(refreshDevice, 6000);
