import { app, BrowserWindow } from 'electron';
import path from 'path';
import { pathToFileURL } from 'url';

const createWindow = () => {
  const win = new BrowserWindow({
    width: 1200,
    height: 800,
  });

  const devUrl = process.env.ELECTRON_START_URL ?? 'http://localhost:5173';
  if (process.env.NODE_ENV === 'development') {
    win.loadURL(devUrl);
  } else {
    const indexPath = path.join(__dirname, '..', '..', 'web', 'dist', 'index.html');
    win.loadURL(pathToFileURL(indexPath).toString());
  }
};

app.whenReady().then(() => {
  createWindow();

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow();
    }
  });
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});
