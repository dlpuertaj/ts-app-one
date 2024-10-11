const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('electronAPI', {
    getRecords: () => ipcRenderer.invoke('get-records'),
    addRecord: (dateTime, text) => ipcRenderer.invoke('add-record',dateTime, text ),
    openPopup: () => ipcRenderer.send('open-popup-window')
});


const openPopupElements = document.getElementsByClassName('open-popup');

Array.from(openPopupElements).forEach((popup) => {
    popup.addEventListener('click', () =>{
        ipcRenderer.send('open-popup-window');
    });
});
