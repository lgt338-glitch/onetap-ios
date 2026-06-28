const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('onetap', {
  getDeviceInfo: () => ipcRenderer.invoke('device:info'),
  enterRecovery: () => ipcRenderer.invoke('recovery:enter'),
  exitRecovery: () => ipcRenderer.invoke('recovery:exit'),
  listBackups: () => ipcRenderer.invoke('backup:list'),
  checkIpsw: () => ipcRenderer.invoke('ipsw:check'),
});
