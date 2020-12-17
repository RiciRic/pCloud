console.log('main process loaded')
console.log('main.js')

const electron = require('electron')
const app = electron.app
const BrowserWindow = electron.BrowserWindow
const path = require('path')
const url = require('url')
const Menu = electron.Menu;
const MenuItem = electron.MenuItem;

const {autoUpdater} = require('electron-updater');

let win
let home

function createWindow () {

  win = new BrowserWindow({
    width: 383,
    height: 240,
    minHeight: 240,
    minWidth: 383,
    maxHeight: 240,
    maxWidth: 383,
    icon: 'pictures/icon.ico',
    //show: false,
    backgroundColor: "#1e1e1e",
    maximizable: false,
    contextIsolation: true,
    frame: false,
    webPreferences: {
      nodeIntegration: true,
      preload: path.join(__dirname, 'JSfiles/preload.js')
    }

    
    
  }) 
 
  win.loadURL(url.format( {
    pathname: path.join(__dirname, 'index.html'),
    protocol: 'file',
    slashes: true

  }))

  win.on('closed', () => {
    win = null;
    
  })

  //win.webContents.openDevTools()
  autoUpdater.checkForUpdates();
}

app.whenReady().then(createWindow)
app.allowRendererProcessReuse = true

app.on('window-all-closed', function () {
  if (process.platform !== 'darwin') app.quit()
})

app.on('activate', function () {
  if (BrowserWindow.getAllWindows().length === 0) createWindow()
})
app.on('browser-window-created',function(e,window) {
  window.setMenu(null);
  })

//AUTOUPDATER

autoUpdater.on('checking-for-update', () => {
  console.log('Checking for update...');
});
autoUpdater.on('update-available', info => {
  console.log('Update available.');
});
autoUpdater.on('update-not-available', info => {
  console.log('Update not available.');
});
autoUpdater.on('error', err => {
  console.log(`Error in auto-updater: ${err.toString()}`);
});
autoUpdater.on('download-progress', progressObj => {
  console.log(
    `Download speed: ${progressObj.bytesPerSecond} - Downloaded ${progressObj.percent}% (${progressObj.transferred} + '/' + ${progressObj.total} + )`
  );
});
autoUpdater.on('update-downloaded', info => {
  console.log('Update downloaded; will install now');
});

autoUpdater.on('update-downloaded', info => {
  autoUpdater.quitAndInstall();
});