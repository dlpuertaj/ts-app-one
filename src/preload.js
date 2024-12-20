const { contextBridge, ipcRenderer } = require('electron');


/**
 * The preload.js file in an Electron application is used to expose a limited, secure API 
 * to the renderer process. It runs in an isolated context and is loaded before 
 * other scripts in the renderer process.
 */

contextBridge.exposeInMainWorld('electronAPI', {
    getRecords: () => ipcRenderer.invoke('get-records'),
    addRecord: (dateTime, text) => ipcRenderer.invoke('add-record',dateTime, text ),
    onOpenPopupData: (callback) => ipcRenderer.on('open-popup-data',callback),
    openPopup: (id, date, text) => ipcRenderer.send('open-popup-window',id, date,text),
    closePopup: () => ipcRenderer.send('close-popup'),
    updateRecord: (id,date,text) => ipcRenderer.invoke('update-record', id, date, text),
    deleteRecord: (id) => ipcRenderer.invoke('delete-record', id),
    openConfirmationPopup: (message, isDeleting) => ipcRenderer.send('open-confirmation-popup-window',message,isDeleting),
    closeConfirmationPopup: () => ipcRenderer.send('close-confirm-popup'),
    onSentConfirmPopupData: (callback) => ipcRenderer.on('send-confirm-popup-data',callback),

    removeTableRows: () => ipcRenderer.send('remove-table-rows'),
    onRemoveTableRows: (callback) => ipcRenderer.on('remove-table-rows',callback),

    getButtons: () => ipcRenderer.invoke('get-buttons'),
    saveButton: (name, text) => ipcRenderer.invoke('save-button',name, text)
});