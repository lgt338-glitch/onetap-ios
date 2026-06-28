const { app, BrowserWindow, ipcMain } = require('electron');
const path = require('node:path');
const { spawn } = require('node:child_process');
const fs = require('node:fs');

function getPythonExe() {
  const venv = path.join(__dirname, 'py', '.venv', 'Scripts', 'python.exe');
  return fs.existsSync(venv) ? venv : 'python';
}

function runPy(script, args = []) {
  return new Promise((resolve) => {
    const env = { ...process.env };
    delete env.ELECTRON_RUN_AS_NODE;
    const py = spawn(getPythonExe(), [path.join(__dirname, 'py', script), ...args], {
      windowsHide: true,
      env,
    });
    let out = '';
    let err = '';
    py.stdout.on('data', (d) => (out += d.toString()));
    py.stderr.on('data', (d) => (err += d.toString()));
    py.on('close', (code) => {
      try {
        resolve({ ok: code === 0, data: JSON.parse(out || '{}'), stderr: err, code });
      } catch (e) {
        resolve({ ok: false, data: null, stderr: (err || '') + '\n' + (out || ''), code });
      }
    });
    py.on('error', (e) => resolve({ ok: false, data: null, stderr: String(e), code: -1 }));
  });
}

function createWindow(htmlFile, title, x, y) {
  const win = new BrowserWindow({
    width: 980,
    height: 720,
    minWidth: 820,
    minHeight: 600,
    x, y,
    backgroundColor: '#0a1628',
    title,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      contextIsolation: true,
      nodeIntegration: false,
    },
  });
  win.removeMenu();
  win.loadFile(htmlFile);
  return win;
}

app.whenReady().then(() => {
  ipcMain.handle('device:info', () => runPy('device_info.py'));
  ipcMain.handle('recovery:enter', () => runPy('recovery_action.py', ['enter']));
  ipcMain.handle('recovery:exit', () => runPy('recovery_action.py', ['exit']));
  ipcMain.handle('backup:list', () => runPy('backup_list.py'));
  ipcMain.handle('ipsw:check', () => runPy('ipsw_check.py'));

  createWindow('reboot.html', 'OneTap ReBoot — 시스템 복구', 80, 80);
  createWindow('unlock.html', 'OneTap UnLock — 잠금 해제', 980, 80);
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit();
});
