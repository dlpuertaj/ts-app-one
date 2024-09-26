import { app, BrowserWindow } from 'electron';

let mainWindow: BrowserWindow | null;

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

app.whenReady().then(createWindow);

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
