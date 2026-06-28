const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('onetap', {
  getDeviceInfo: () => ipcRenderer.invoke('device:info'),
  listDevices: () => ipcRenderer.invoke('device:list'),
});
