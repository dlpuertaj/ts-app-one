import { app, BrowserWindow, ipcMain } from 'electron';
import { AppDataSource } from './database/data_source';
import { Record } from './entities/Record';
import * as path from'path';

let mainWindow: BrowserWindow | null;
let popup: BrowserWindow | null;
let confirmationPopup: BrowserWindow | null;


/**
 * Used to create the main window. BrowserWindow can only be created 
 * after the 'app' module's 'ready' event is fired.
 */
const createWindow = () => {
    mainWindow = new BrowserWindow({
        width: 800,
        height: 600,
        webPreferences: {
            preload: path.join(__dirname, 'preload.js'), 
            contextIsolation: true, 
            nodeIntegration: false, 
        },
    });

	mainWindow.loadFile('src/index.html');
		mainWindow.on('closed', () =>{
		mainWindow = null;
	} );

};

app.whenReady().then(() => {
	createWindow();
});

app.on('window-all-closed', () => {
	if (process.platform !== 'darwin') {
		app.quit();
	}
});

app.on('activate', () => {
	if (mainWindow === null) {
		createWindow();
	}
});


const showGenericPopup = () => {
	popup = new BrowserWindow({
		width: 400,
        height: 400,
        webPreferences: {
            preload: path.join(__dirname, 'preload.js'), 
            contextIsolation: true, 
            nodeIntegration: false, 
        },
	});

	popup.loadFile('src/popup.html');

	popup.on('closed', () =>{
		popup = null;
	} );
};

const showConfirmationPopup = () => {
	confirmationPopup = new BrowserWindow({
		width: 200,
        height: 200,
        webPreferences: {
            preload: path.join(__dirname, 'preload.js'), 
            contextIsolation: true, 
            nodeIntegration: false, 
        },
	});

	confirmationPopup.loadFile('src/confirm_popup.html');

	confirmationPopup.on('closed', () =>{
		popup = null;
	} );
};

/********************************************************************************** 
 * ipcMain is an Electron module used for Inter-process communication (IPC).
 * It is used to handle asynchronous and synchronous messages sent from 
 * the renderer processes (web pages) to the main process.
 * 
 * ipcMain.handle(channel, listener): Registers a handler for an asynchronous 
 * message sent from a renderer process. The handler function can return a promise or a value.
 * 
 * ipcMain.on(channel, listener): Registers a handler for a synchronous or asynchronous 
 * message sent from a renderer process. The handler function can perform actions 
 * based on the message received.
 * ********************************************************************************/

ipcMain.handle('get-records', async () => {
	console.info(`Will try to fetche records from database...`);
	try{
  		const userRepository = AppDataSource.getRepository(Record);
  		const records = await userRepository.find();
		console.info(`${records.length} records fetched successfully`);
  		return records;
	}catch(error){
		console.error('Error while fetching records');
		return [];
	}
});

ipcMain.handle('add-record', async (event, dateTime, text) => {
  const recordRepository = AppDataSource.getRepository(Record);
  const record = new Record(dateTime,text);
  await recordRepository.save(record);
  console.log(`Saved ${record.getDatabaseId}`)
  return record;
});

ipcMain.handle('update-record', async (event, id:number, newDateTime:Date, newText:string) => {
  const recordRepository = AppDataSource.getRepository(Record);
  const record = new Record(newDateTime,newText);
  await recordRepository.update(id, record);
  console.log(`Updated ${id}`);
});

ipcMain.handle('delete-record', async (event, id:number) => {
  const recordRepository = AppDataSource.getRepository(Record);
  await recordRepository.delete(id);
  console.log(`Deleted ${id}`)
});

ipcMain.on('open-popup-window', (event,id, date, text) => {

	if(!popup){
		showGenericPopup();
	}

	popup?.webContents.once('did-finish-load', () => {
		popup?.webContents.send('open-popup-data', {id, date,text});
	});

});

ipcMain.on('close-popup', () => {

	if(popup){
		popup.close();
	}

});


ipcMain.on('open-confirmation-popup-window', (event, message:string, isDeleting:boolean) => {

	if(!confirmationPopup){
		showConfirmationPopup();
	}

	confirmationPopup?.webContents.once('did-finish-load', () => {
		confirmationPopup?.webContents.send('send-confirm-popup-data',{message,isDeleting});
	});
	

});

ipcMain.on('close-confirm-popup', () => {
	if(confirmationPopup){
		confirmationPopup.close();
	}
});

ipcMain.on('update-table', (event, data) => {
	if(mainWindow){
		mainWindow.webContents.send('update-table-in-main',data);
	}
});

ipcMain.handle('get-table-data', async () =>{
	if(mainWindow){
		const tableData = await mainWindow.webContents.executeJavaScript(
			`(() => {
				const table = document.getElementById('records-table');
				return table.innerHTML;      
			})
		);
	}
});'

