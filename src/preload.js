const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('electronAPI', {
    getRecords: () => ipcRenderer.invoke('get-records'),
    addRecord: (dateTime, text) => ipcRenderer.invoke('add-record',dateTime, text ),
    onOpenPopupData: (callback) => ipcRenderer.on('open-popup-data',callback),
    openPopup: (date,text) => ipcRenderer.send('open-popup-window',date,text)
});


//const openPopupElements = document.getElementsByClassName('open-popup');

//Array.from(openPopupElements).forEach((popup) => {
    //popup.addEventListener('click', () =>{
        //ipcRenderer.send('open-popup-window');
    //});
//});
