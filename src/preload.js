const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('electronAPI', {
    getRecords: () => ipcRenderer.invoke('get-records'),
    addRecord: (dateTime, text) => ipcRenderer.invoke('add-record',dateTime, text ),
    onOpenPopupData: (callback) => ipcRenderer.on('open-popup-data',callback),
    openPopup: (id, date, text) => ipcRenderer.send('open-popup-window',id, date,text),
    updateRecord: (id,date,text) => ipcRenderer.invoke('update-record', id, date, text),
    deleteRecord: (id) => ipcRenderer.invoke('delete-record', id),
    openConfirmationPopup: (message, isDeleting) => ipcRenderer.send('open-confirmation-popup-window',message,isDeleting)
});