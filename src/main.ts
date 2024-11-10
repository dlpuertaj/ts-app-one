import { app, BrowserWindow, ipcMain } from 'electron';
import { AppDataSource } from './database/data_source';
import { Record } from './entities/Record';
import * as path from'path';

let mainWindow: BrowserWindow | null;
let popup: BrowserWindow | null;


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
  const record = new Record();
  console.log(`Saving ${dateTime} and ${text}`);
  record.setDateTime = dateTime;
  record.setText = text;
  await recordRepository.save(record);
  console.log(`Saved ${record.getDatabaseId}`)
  return record;
});

ipcMain.handle('update-record', async (event, id:number, newDateTime:Date, newText:string) => {
  const recordRepository = AppDataSource.getRepository(Record);
  const record = new Record();
  record.setDateTime = newDateTime;
  record.setText = newText;
  await recordRepository.update(id, record);
  console.log(`Updated ${id}`)
});


ipcMain.on('open-popup-window', (event,id, date, text) => {

	if(!popup){
		showGenericPopup();
	}

	popup?.webContents.once('did-finish-load', () => {
		popup?.webContents.send('open-popup-data', {id, date,text});
	});

});
