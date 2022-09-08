const { ipcRenderer } = require('electron');

const initIpcRenderer = () =>
{
  ipcRenderer.on('will-Quit', (event, arg) => {
    //globalShortcut.unregister('CommandOrControl+X')
    globalShortcut.unregisterAll()
  
    if(quitsicherung == true)
    {
      let remote = require('electron').remote;
      const bounds = remote.getCurrentWindow().getBounds();
      xpos = bounds.x;
      ypos = bounds.y;
      widthvar = bounds.width;
      heightvar = bounds.height;
  
      store.set('x', xpos);
      store.set('y', ypos);
      store.set('width', widthvar);
      store.set('height', heightvar);
    }
  })

  ipcRenderer.on('lock-Screen', (event, arg) => {
    if(lockvar == true){
      lock();
    }
  });

  ipcRenderer.on('download', (event, arg) => {
    store.set('download',true);
  });
  
  ipcRenderer.on('downloaded', (event, arg) => {
    store.set('down',true);
  });
  
  ipcRenderer.on('exit', (event, arg) => {
    ex();
  });
}

module.exports = initIpcRenderer;