const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('electronAPI', {
    getRecords: () => ipcRenderer.invoke('get-records'),
    addRecord: (dateTime, text) => ipcRenderer.invoke('add-record',dateTime, text ),
    updateRecord: (id,dateTime,text) = ipcRenderer.invoke('update-record', id, dateTime, text),
    onOpenPopupData: (callback) => ipcRenderer.on('open-popup-data',callback),
    openPopup: (date,text) => ipcRenderer.send('open-popup-window',date,text)
});