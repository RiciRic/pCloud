console.log('main process loaded')
console.log('main.js')

const {ipcMain } = require('electron')
const log = require('electron-log');

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

autoUpdater.logger = log;
autoUpdater.logger.transports.file.level = 'info';
log.info('App starting...');

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
  autoUpdater.checkForUpdatesAndNotify();
}

app.whenReady().then(createWindow)
app.allowRendererProcessReuse = true

//AUTOUPDATER
var updateav = false;
var pctgvar = 0;
var bytesekvar = 0;
var transfvar = 0;
var totalvar = 0;
var eventvar;
var eventhome;
var eventanalytics;
var eventindex;

var eventdropbox;

ipcMain.on('eventhome', (event) => {
  eventhome = event;
});

ipcMain.on('eventanalytics', (event) => {
  eventanalytics = event;
});

ipcMain.on('eventindex', (event) => {
  eventindex = event;
});

ipcMain.on('eventdropbox', (event) => {
  eventdropbox = event;
});

function downloadedfunc()
{
  try {
    eventvar.sender.send('downloaded');
  } catch (error) {
    try {
      eventindex.sender.send('downloaded');
    } catch (error) {
      try {
        eventanalytics.sender.send('downloaded');
      } catch (error) {
        try {
          eventhome.sender.send('downloaded');
        } catch (error) {
          
        }
      }
    }
  }
}

function downloadfunc()
{
  try {
    eventvar.sender.send('download');
  } catch (error) {
    try {
      eventindex.sender.send('download');
    } catch (error) {
      try {
        eventanalytics.sender.send('download');
      } catch (error) {
        try {
          eventhome.sender.send('download');
        } catch (error) {
          
        }
      }
    }
  }
}

ipcMain.on('Tokensetzen', (event, args) => {
  eventdropbox.sender.send("Tokendropbox", args)
});

ipcMain.on('infopz', (event) => {
  event.sender.send('infopz', { pctg: pctgvar , bytesek: bytesekvar, transf: transfvar, total: totalvar});
  console.log("infopz wird übergeben");
});

ipcMain.on('restart_app', () => {
  autoUpdater.quitAndInstall();
});

ipcMain.on('update', (event) => {
  event.sender.send('update', { update: updateav});
  eventvar = event;
  eventvar.sender.send('test', { update: updateav});
  console.log("updateav: "+updateav);
});

autoUpdater.on('checking-for-update', () => {
  console.log('Checking for update...');
  log.info('Checking for update...');
});
autoUpdater.on('update-available', info => {
  updateav = true;
  console.log('Update available.');
  log.info('Update available.');
  downloadfunc()
});
autoUpdater.on('update-not-available', info => {
  updateav = false;
  console.log('Update not available.');
  log.info('Update not available.');
});
autoUpdater.on('error', err => {
  console.log(`Error in auto-updater: ${err.toString()}`);
  log.info(`Error in auto-updater: ${err.toString()}`);
});
autoUpdater.on('download-progress', progressObj => {
  bytesekvar = progressObj.bytesPerSecond;
  pctgvar = progressObj.percent;
  transfvar = progressObj.transferred;
  totalvar = progressObj.total;
  console.log(`Download speed: ${progressObj.bytesPerSecond} - Downloaded ${progressObj.percent}% (${progressObj.transferred} + '/' + ${progressObj.total} + )`);
  log.info(`Download speed: ${progressObj.bytesPerSecond} - Downloaded ${progressObj.percent}% (${progressObj.transferred} + '/' + ${progressObj.total} + )`);
});
autoUpdater.on('update-downloaded', info => {
  console.log('Update downloaded; will install now');
  downloadedfunc()
  if(eventvar != null)
  {
    eventvar.sender.send('fertig', {update:"lel"});
  }
  //autoUpdater.quitAndInstall();
});

app.on('window-all-closed', function () {
  if (process.platform !== 'darwin') app.quit()
})

app.on('activate', function () {
  if (BrowserWindow.getAllWindows().length === 0) createWindow()
})
app.on('browser-window-created',function(e,window) {
  window.setMenu(null);
  })