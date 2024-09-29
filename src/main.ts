import { app, BrowserWindow, ipcMain } from 'electron';
import { DataSource } from 'typeorm';
import { Record } from './entities/Record';
import * as path from'path';

let mainWindow: BrowserWindow | null;


//Setup DataSource
const AppDataSource = new DataSource({
  type: 'sqlite',
  database: './db.sqlite',
  entities: [Record],
  synchronize: true,
});

const createWindow = () => {
	mainWindow = new BrowserWindow({
		width: 800,
		height: 600,
		webPreferences:{
			nodeIntegration: true
		},
	});
	mainWindow.loadFile('src/index.html');

	mainWindow.on('closed', () =>{
		mainWindow = null;
	} );

};

app.whenReady().then(() => {
	AppDataSource.initialize().then(() => {
		console.log('Database Connected');
	}).catch((error) => console.log('Error during Data Source initialization', error));

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
  const userRepository = AppDataSource.getRepository(Record);
  const records = await userRepository.find();
  return records;
});

ipcMain.handle('add-record', async (event, recordData) => {
  const recordRepository = AppDataSource.getRepository(Record);
  const record = new Record();
  record.dateTime = recordData.dateTime;
  record.text = recordData.text;
  await recordRepository.save(record);
  return record;
});
