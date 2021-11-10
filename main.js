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
const {screen} = require('electron')

const {autoUpdater} = require('electron-updater');

let win
let home

autoUpdater.logger = log;
autoUpdater.logger.transports.file.level = 'info';
log.info('App starting...');

const { Tray } = require('electron')

let tray = null
app.whenReady().then(() => {
  tray = new Tray(path.join(__dirname, 'pictures/icon.ico'));
  trayIcon();

  screen.on('display-added', function() {
    trayIcon()
  });
  
  screen.on('display-removed', function() {
    trayIcon()
    //outofBounds()
  });
  
  ipcMain.on('checkInBounds', (event) => {
    outofBounds()
  });

  electron.powerMonitor.on('lock-screen', () => { 
    let allWindows = BrowserWindow.getAllWindows();
    allWindows[0].webContents.send('lock-Screen');
  }); 

  app.on('will-quit', () => {
    let allWindows = BrowserWindow.getAllWindows();
    allWindows[0].webContents.send('will-Quit');
  })
})

function outofBounds()
{
  const displays = screen.getAllDisplays()

  let allWindows = BrowserWindow.getAllWindows();
  const bounds = allWindows[0];
  const xpos = bounds.getBounds().x;
  const ypos = bounds.getBounds().y;
  var ig = 0;
  for(ig=0;ig<displays.length;ig++)
  {
    const boundsdisplay = displays[ig];
    const xdisplay = boundsdisplay.bounds.x;
    const ydisplay = boundsdisplay.bounds.y;
    const widthdisplay = boundsdisplay.bounds.width;
    const heightdisplay = boundsdisplay.bounds.height;
    if(xpos>=xdisplay && xpos<=widthdisplay && ypos>=ydisplay && ypos<=heightdisplay)
    {
      return;
    }
  }
  const widthposD2 = parseInt(bounds.getBounds().width/2);
  const heightposD2 = parseInt(bounds.getBounds().height/2);

  const primarydisplays = screen.getPrimaryDisplay();
  const primwD2 = parseInt(primarydisplays.bounds.width/2);
  const primhD2 = parseInt(primarydisplays.bounds.height/2);
  if(primarydisplays!=null)
  {
    bounds.setBounds({
      x: primwD2-widthposD2,
      y: primhD2-heightposD2,
      width: bounds.getBounds().width,
      height: bounds.getBounds().height
    });
  }
}

function trayIcon()
{
  

  const submenuItems = [];
  //submenuItems.push({ label: 'Moin', type: 'normal', id: '11', })

  const displays = screen.getAllDisplays()

  var ig = 0;
  for(ig=0;ig<displays.length;ig++)
  {
    let namerechnen = ig+1;
    submenuItems.push({ label: "Screen "+namerechnen, type: 'normal', id: ig, click: async (menuItem) => {
      let allWindows = BrowserWindow.getAllWindows();
      const bounds = allWindows[0];
      xpos = bounds.getBounds().x;
      ypos = bounds.getBounds().y;

      var idmenItem = menuItem.id

      const boundsdisplay = displays[idmenItem];
      const xdisplay = boundsdisplay.bounds.x;
      const ydisplay = boundsdisplay.bounds.y;
      const widthdisplay = boundsdisplay.bounds.width;
      const heightdisplay = boundsdisplay.bounds.height;

      console.log("x "+xdisplay+" | width "+widthdisplay+" | window "+xpos);
      const currdisplays = screen.getDisplayNearestPoint({x:xpos,y:ypos});
      //console.log(currdisplays);
      if(!(xpos >= xdisplay && xpos <= xdisplay+widthdisplay))
      {
        const newx = xpos-currdisplays.bounds.x;
        const newxprozent = newx/currdisplays.bounds.width*100

        const newy = ypos-currdisplays.bounds.y;
        const newyprozent = newy/currdisplays.bounds.height*100

         bounds.setBounds({
          x: xdisplay+parseInt(widthdisplay/100*newxprozent),
          y: ydisplay+parseInt(heightdisplay/100*newyprozent),
          width: bounds.getBounds().width,
          height: bounds.getBounds().height
        });
      }
    }});
  }

  const contextMenu = Menu.buildFromTemplate([
    { label: 'Show pCloud', type: 'normal',
    click: async () => {
      let allWindows = BrowserWindow.getAllWindows();
      allWindows[0].focus();
    }},
    { label: 'Change Screen', type: 'submenu',  submenu: submenuItems},
    { label: 'Change Screen', type: 'separator'},
    { label: 'Exit', type: 'normal',
    click: async () => {
      //app.quit();
      let allWindows = BrowserWindow.getAllWindows();
      allWindows[0].webContents.send('exit');
    }},
  ])
  tray.setToolTip('pCloud')

  tray.setContextMenu(contextMenu)

  tray.on('click', function(e){
    let allWindows = BrowserWindow.getAllWindows();
    allWindows[0].focus();
  });
}

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

    
    
  }) ;
 
  win.loadURL(url.format( {
    pathname: path.join(__dirname, 'index.html'),
    protocol: 'file',
    slashes: true

  }));

  win.on('closed', () => {
    win = null;
    
  });

  //win.webContents.openDevTools();
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

/*ipcMain.on('eventhome', (event) => {
  eventhome = event;
});

ipcMain.on('eventanalytics', (event) => {
  eventanalytics = event;
});

ipcMain.on('eventindex', (event) => {
  eventindex = event;
});*/

ipcMain.on('eventdropbox', (event) => {
  eventdropbox = event;
});

ipcMain.on('close-paypal', (event) => {
  BrowserWindow.getAllWindows().forEach((win) => {
    // The Paypal window would fail to load contents due to security 
    // restrictions and return an empty URL
    console.log(win.webContents.getURL())
    if (win.webContents.getURL() == "about:blank#blocked") {
      console.log("window closed")
        win.close();
    }
  });
});

function downloadedfunc()
{
  /*try {
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
  }*/
  let allWindows = BrowserWindow.getAllWindows();
  allWindows[0].webContents.send('downloaded');
}

function downloadfunc()
{
  /*try {
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
  }*/
  let allWindows = BrowserWindow.getAllWindows();
  allWindows[0].webContents.send('download');

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

ipcMain.on('close_app', () => {
  autoUpdater.autoInstallOnAppQuit();
  app.quit();
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
});

app.on('window-all-closed', function () {
  if (process.platform !== 'darwin') app.quit()
});

app.on('activate', function () {
  if (BrowserWindow.getAllWindows().length === 0) createWindow()
});

/*app.on('browser-window-created',function(e,window) {
  window.setMenu(null);
  })*/