const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('electronAPI', {
    getRecords: () => ipcRenderer.invoke('get-records'),
    addRecord: (dateTime, text) => ipcRenderer.invoke('add-record',dateTime, text ),
    onOpenPopupData: (callback) => ipcRenderer.on('open-popup-data',callback),
    openPopup: (id, dateTime, text) => ipcRenderer.send('open-popup-window',id, dateTime,text)
});
