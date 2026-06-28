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
    const py = spawn(getPythonExe(), [path.join(__dirname, 'py', script), ...args], {
      windowsHide: true,
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

function createWindow() {
  const win = new BrowserWindow({
    width: 980,
    height: 720,
    minWidth: 820,
    minHeight: 600,
    backgroundColor: '#0a1628',
    title: 'OneTap',
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      contextIsolation: true,
      nodeIntegration: false,
    },
  });
  win.removeMenu();
  win.loadFile('index.html');
}

app.whenReady().then(() => {
  ipcMain.handle('device:info', () => runPy('device_info.py'));
  ipcMain.handle('device:list', () => runPy('device_info.py', ['--list']));
  createWindow();
});
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit();
});
app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) createWindow();
});
