const $ = (id) => document.getElementById(id);

const FIELD_LABELS = {
  ProductType: '모델 ID',
  ProductVersion: 'iOS 버전',
  BuildVersion: '빌드 번호',
  UniqueDeviceID: 'UDID',
  SerialNumber: '시리얼 번호',
  WiFiAddress: 'Wi-Fi MAC',
  BluetoothAddress: 'Bluetooth MAC',
  BatteryCurrentCapacity: '배터리 잔량 (%)',
  TotalDiskCapacity: '저장공간 (GB)',
  ActivationState: '활성화 상태',
  PasswordProtected: '암호 설정',
  CPUArchitecture: 'CPU 아키텍처',
  DeviceColor: '컬러',
  RegionInfo: '지역',
};

const MODEL_NAMES = {
  'iPhone17,1': 'iPhone 17 Pro', 'iPhone17,2': 'iPhone 17 Pro Max',
  'iPhone16,1': 'iPhone 15 Pro', 'iPhone16,2': 'iPhone 15 Pro Max',
  'iPhone15,4': 'iPhone 15', 'iPhone15,5': 'iPhone 15 Plus',
  'iPhone14,7': 'iPhone 14', 'iPhone14,8': 'iPhone 14 Plus',
  'iPhone14,2': 'iPhone 13 Pro', 'iPhone14,3': 'iPhone 13 Pro Max',
  'iPhone14,4': 'iPhone 13 mini', 'iPhone14,5': 'iPhone 13',
  'iPhone13,1': 'iPhone 12 mini', 'iPhone13,2': 'iPhone 12',
  'iPhone13,3': 'iPhone 12 Pro', 'iPhone13,4': 'iPhone 12 Pro Max',
  'iPhone12,1': 'iPhone 11', 'iPhone12,3': 'iPhone 11 Pro', 'iPhone12,5': 'iPhone 11 Pro Max',
  'iPhone11,2': 'iPhone XS', 'iPhone11,4': 'iPhone XS Max', 'iPhone11,6': 'iPhone XS Max',
  'iPhone11,8': 'iPhone XR',
  'iPhone10,1': 'iPhone 8', 'iPhone10,2': 'iPhone 8 Plus',
  'iPhone10,3': 'iPhone X', 'iPhone10,6': 'iPhone X',
};

function formatValue(key, value) {
  if (value === null || value === undefined) return '—';
  if (key === 'TotalDiskCapacity' && typeof value === 'number') {
    return (value / 1024 / 1024 / 1024).toFixed(1) + ' GB';
  }
  if (key === 'PasswordProtected') return value ? '🔒 설정됨' : '🔓 없음';
  if (key === 'ProductType' && MODEL_NAMES[value]) return `${MODEL_NAMES[value]} (${value})`;
  return String(value);
}

function setStatus(state, text) {
  const bar = $('statusBar');
  bar.className = 'status status-' + state;
  $('statusText').textContent = text;
}

function showDevice(info) {
  $('emptyState').classList.add('hidden');
  $('errorBox').classList.add('hidden');
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
    cell.innerHTML = `<div class="cell-label">${label}</div><div class="cell-value">${formatValue(key, info[key])}</div>`;
    grid.appendChild(cell);
  }
}

function showEmpty() {
  $('deviceCard').classList.add('hidden');
  $('errorBox').classList.add('hidden');
  $('emptyState').classList.remove('hidden');
}

function showError(stderr) {
  $('deviceCard').classList.add('hidden');
  $('emptyState').classList.add('hidden');
  $('errorBox').classList.remove('hidden');
  $('errorText').textContent = stderr || '알 수 없는 오류';
}

async function refresh() {
  setStatus('wait', '디바이스를 확인하는 중...');
  const res = await window.onetap.getDeviceInfo();
  if (res.ok && res.data && res.data.error) {
    if (res.data.error === 'no_device') {
      setStatus('off', '연결된 디바이스가 없습니다');
      showEmpty();
    } else {
      setStatus('err', '오류 발생');
      showError(res.data.message || res.stderr);
    }
    return;
  }
  if (res.ok && res.data) {
    setStatus('on', '연결됨');
    showDevice(res.data);
    return;
  }
  setStatus('err', '오류 발생');
  showError(res.stderr);
}

document.getElementById('refreshBtn').addEventListener('click', refresh);
window.addEventListener('DOMContentLoaded', refresh);
setInterval(refresh, 5000);
