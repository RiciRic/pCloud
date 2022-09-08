console.log('renderer loaded')

const store = require('./js/storedata.js');

const { ipcRenderer } = require('electron');

const typing = require('./js/index/typing.js');

const BrowserWindow = require('electron').remote.BrowserWindow;
const path = require('path');
const url = require('url');
const electron = require('electron');
const { removeAllListeners } = require('process');
const Menu = electron.Menu;
const MenuItem = electron.MenuItem;

var maxim = false;

const nativeTheme = electron.remote.nativeTheme; 

var theme = store.get('theme');
var pw = store.get('pw');
var xpos = store.get('x');
var ypos = store.get('y');
var widthvar = store.get('width');
var heightvar = store.get('height');
var col;

var pwtemp = "";

if(pw == "")
{
  console.log('pimml');

  document.getElementById("eins").classList.add("hide");
  document.getElementById("zwei").classList.remove("hide");

}

    if(xpos == 0 && ypos == 0)
    {
      xpos = null;
      ypos = null;
    }
    console.log(theme);
    if (theme == '1'){
      col = "#ffffff";
      document.body.classList.add('hell');
      nativeTheme.themeSource = "light"; 

    }
    else if(theme == '0'){
      col = "#1e1e1e";
      document.body.classList.remove('hell');
      nativeTheme.themeSource = "dark"; 
    }
    else{
      if(nativeTheme.shouldUseDarkColors == true)
      {
        col = "#1e1e1e";
        document.body.classList.remove('hell');
        nativeTheme.themeSource = "dark"; 
      }
      else{
        col = "#ffffff";
        document.body.classList.add('hell');
        nativeTheme.themeSource = "light"; 
      }
    }

let winHome;

var username = "";
var password = "";

const weiterbtn = document.getElementById('weiter');
const text = document.getElementById('pw');

typing();

document.getElementById("pw").addEventListener('keydown', (event)=>{
  if(event.getModifierState("CapsLock"))
    {
      $('#capslock').fadeIn('fast');
    }
    else
    {
      $('#capslock').fadeOut('fast');
    }
})

document.getElementById("pwneu").addEventListener('keydown', (event)=>{
  if(event.getModifierState("CapsLock"))
    {
      $('#capslockzwei').fadeIn('fast');
    }
    else
    {
      $('#capslockzwei').fadeOut('fast');
    }
})

document.getElementById("pwneuzwei").addEventListener('keydown', (event)=>{
  if(event.getModifierState("CapsLock"))
    {
      $('#capslockzwei').fadeIn('fast');
    }
    else
    {
      $('#capslockzwei').fadeOut('fast');
    }
})

/*const contextMenu = require('electron-context-menu');

            contextMenu({
                prepend: (params, browserWindow) => [
                    {
                        role: "selectAll",
                        visible: params.mediaType === 'text'
                    },
                ],
                showInspectElement:false
            });*/

$(document).ready(function(){

  /*window.addEventListener("contextmenu",function(event){
    event.preventDefault();
    var contextElement = document.getElementById("context-menu");
    contextElement.style.top = event.offsetY + "px";
    contextElement.style.left = event.offsetX + "px";
    contextElement.classList.add("active");
  });
  window.addEventListener("click",function(){
    document.getElementById("context-menu").classList.remove("active");
  });*/
  
  /*$.getJSON("cfg/pw.json", function(data){
    $.each(data, function(key, value){

      if(value.id == "0")
      {
        username = value.username;
        password = decrypt(value.password);
        //password = value.password;

      }
       });
    
  });*/
});

//$('#impid').hover(function(){$('#settlabel').text('Import Settings');},
  //  function() {$('#settlabel').text("");});

  $('#impid').hover(function(){
    $('#settlabel').fadeIn('fast');
  }, function() {
    $('#settlabel').fadeOut('fast');
});

$('#rp').hover(function(){document.getElementById("rp").style.cursor = "pointer";},
      function() {document.getElementById("rp").style.cursor = "initial";});

    const weiterbtnClick = (e) => {
        input();
    }
weiterbtn.addEventListener('click', weiterbtnClick);

text.addEventListener('keypress', (e) => {

  if (e.key === 'Enter') {
    input();
  }

});

document.getElementById('pwneu').addEventListener('keypress', (e) => {
  if (e.key === 'Enter') {
    document.getElementById("pwneuzwei").focus();
  }
});

document.getElementById('pwneuzwei').addEventListener('keypress', (e) => {
  if (e.key === 'Enter') {
    weiterneu();
  }
});

function input(){
  pwtemp = document.getElementById("pw").value;
  if(document.getElementById("pw").value == "")
  {
    renduhaha();
    return;
  }
  try {
    var le = decrypt(store.get('pw'));
  }
  catch(err) {
    renduhaha();
    return;
  }

  if(pwtemp == le)
  {
    var tokenle = decrypt(store.get('dropboxtoken'));
    if(tokenle != 0)
    {
      store.set('pwtemp', pwtemp);
      winHome = new BrowserWindow({
        width: widthvar,
        height: heightvar,
        minWidth:760,
        minHeight:500,
        show: false,
        x: xpos,
        y: ypos,
        icon: 'pictures/icon.ico',
        backgroundColor: col,
        contextIsolation: true,
        frame: false,
        webPreferences: {
          nodeIntegration: true,
          webViewTag: true,
          preload: path.join(__dirname, 'js/preload.js')
        }
        
      })

      //winHome.webContents.openDevTools();

      /*const listeners = (function listAllEventListeners() {
        let elements = [];
        const allElements = document.querySelectorAll('*');
        const types = [];
        for (let ev in window) {
          if (/^on/.test(ev)) types[types.length] = ev;
        }
      
        for (let i = 0; i < allElements.length; i++) {
          const currentElement = allElements[i];
          for (let j = 0; j < types.length; j++) {
            if (typeof currentElement[types[j]] === 'function') {
              elements.push({
                "node": currentElement,
                "listeners": [ {
                  "type": types[j],
                  "func": currentElement[types[j]].toString(),
                }]
              });
            }
          }
        }
      
        return elements.filter(element => element.listeners.length)
      })();
      
      console.log(listeners);*/


      winHome.loadURL(url.format( {
        pathname: path.join(__dirname, 'home.html'),
        protocol: 'file',
        slashes: true

      }))

      if(store.get('contentprotection') == true)
      {
        winHome.setContentProtection(true);
      }
      else{
        winHome.setContentProtection(false);
      }

      winHome.once('ready-to-show', () => {
        removeAllListenersFunc();
        winHome.show()
        window.close()
        return;
      })
    }
    else if(pwtemp == ""){
      renduhaha();
    }
    else{
      document.getElementById("eins").classList.add("hide");
      document.getElementById("drei").classList.remove("hide");
      document.getElementById("pw").value = "";
    }

  }
  else
  {
      renduhaha();
  }
}

function removeAllListenersFunc()
{
  require('electron').remote.getCurrentWindow().removeListener('blur', focusListener);
  require('electron').remote.getCurrentWindow().removeListener('focus', blurListener);
  ipcRenderer.removeAllListeners("download");
  ipcRenderer.removeAllListeners("downloaded");
  ipcRenderer.removeAllListeners("exit");

  weiterbtn.removeEventListener('click', weiterbtnClick);
  document.getElementById('weiterneu').removeAttribute("onclick");
  document.getElementById('okaydrop').removeAttribute("onclick");
  document.getElementById('tokenuse').removeAttribute("onclick");
  document.getElementById('btncloud').removeAttribute("onclick");
  document.getElementById('impid').removeAttribute("onclick");
  document.getElementById('rp').removeAttribute("onclick");
  document.getElementById('min-btn').removeAttribute("onclick");
  document.getElementById('close-btn').removeAttribute("onclick");
  document.getElementById('bodyid').removeAttribute("onerror");
}

function renduhaha(){
  document.getElementById("pw").value = "";

  var element = document.getElementById("pwdivid");
  element.classList.add("rotborder2");
  //element.classList.remove("anfanglogDiv");
  setTimeout(() => { 
  element.classList.remove("rotborder2");
  //element.classList.add("anfanglogDiv");
  }, 1000);
  console.log("LELE");
}

function moinmeister(){
  store.set('pw','');
  store.set('pwtemp','');
  store.set('dropboxtoken','');
  window.location.reload();
}

function copy(){
  var copyText = document.getElementById("myInput");
  copyText.select();
  copyText.setSelectionRange(0, 99999);
  document.execCommand("copy");
}

function encrypt(text){
  var message = text;
  var key= pwtemp;
  var encrypted = CryptoJS.AES.encrypt(message, key); 
  return encrypted.toString();
}

function decrypt(text){
  var encrypted = text;
  var key= pwtemp;
  var decrypted = CryptoJS.AES.decrypt(encrypted, key);
  return decrypted.toString(CryptoJS.enc.Utf8);
}

function mini(){
  const { remote } = require('electron');
remote.BrowserWindow.getFocusedWindow().minimize();
}

function weiterneu(){
  var pwneu = document.getElementById('pwneu').value;
  var pwneuzwei = document.getElementById('pwneuzwei').value;
  if(pwneu == pwneuzwei)
  {
    if(pwneu != "")
    {
      pwtemp = pwneu;
      store.set('pw',encrypt(pwneu));
      window.location.reload();
    }
    else{
      rendundanzlel();
    }
  }
  else{
    rendundanzlel();
  }
}

function rendundanzlel(){
  document.getElementById('pwneu').value = "";
  document.getElementById('pwneuzwei').value = "";
  document.getElementById("pwneu").classList.add("rotborder");
  document.getElementById("pwneuzwei").classList.add("rotborder");
  setTimeout(() => {
    document.getElementById("pwneu").classList.remove("rotborder");
    document.getElementById("pwneuzwei").classList.remove("rotborder");
  }, 1000)
}

function dropsettoken(){
  const drop = document.getElementById("droptok").value;
  if(drop == "")
  {
    $('#con').text('Enter a valid Token!');
    var element = document.getElementById("droptok");
    element.classList.add("rotborder");
    setTimeout(() => {  $('#con').text(bot); 
    var element = document.getElementById("droptok");
    element.classList.remove("rotborder");
    }, 2000);
  }
  else
  {
  
    store.set('dropboxtoken',encrypt(drop));
    document.getElementById("droptok").value = "";
  }
  
}

function okaysk(){
  //document.getElementById("drei").classList.add("hide");
  //document.getElementById("eins").classList.remove("hide");
  if(store.get('dropboxtoken') != "")
  {
    store.set('pwtemp', pwtemp);
    winHome = new BrowserWindow({
    width: widthvar,
    height: heightvar,
    minWidth:760,
    minHeight:500,
    show: false,
    x: xpos,
    y: ypos,
    icon: 'pictures/icon.ico',
    backgroundColor: col,
    contextIsolation: true,
    frame: false,
    webPreferences: {
      nodeIntegration: true,
      webViewTag: true,
      preload: path.join(__dirname, 'js/preload.js')
    }
    
  })

  if(store.get('contentprotection') == true)
      {
        winHome.setContentProtection(true);
      }
      else{
        winHome.setContentProtection(false);
      }

  winHome.loadURL(url.format( {
    pathname: path.join(__dirname, 'home.html'),
    protocol: 'file',
    slashes: true

  }))

  winHome.once('ready-to-show', () => {
    removeAllListenersFunc();
    winHome.show();
    window.close();

  })
  }
  else{
      var element = document.getElementById("droptok");
      element.classList.add("rotborder");
      setTimeout(() => {
        var element = document.getElementById("droptok");
        element.classList.remove("rotborder");
      }, 2000);
    

  }

}

const focusListener = () => {
  var contextElement = document.getElementById("sklel");
  contextElement.classList.remove("navbaroffle");
}

require('electron').remote.getCurrentWindow().on('focus', focusListener)

const blurListener = () => {
  var contextElement = document.getElementById("sklel");
  contextElement.classList.add("navbaroffle");
}

require('electron').remote.getCurrentWindow().on('blur', blurListener)

let winCloud;

function erstmal(){
  let remote = require('electron').remote;

  store.set('pwtemp',pwtemp);
  store.set('indexclose', true);
  
  let winSettings = new BrowserWindow({
    width: 500,
    height: 630,
    //width: 300,
    //height: 350,
    minWidth: 300,
    minHeight: 350,
    //alwaysOnTop: true,
    frame: false,
    icon: 'pictures/icon.ico',
    contextIsolation: true,
    
    webPreferences: {
      nodeIntegration: true,
      webViewTag: true,
      preload: path.join(__dirname, 'js/preload.js')
    }
  }) 

  winSettings.loadURL(url.format( {
    pathname: path.join(__dirname, 'DropbCloud.html'),
    //pathname: path.join(__dirname, 'sesses.html'),
    protocol: 'file',
    slashes: true

  }))

  winSettings.webContents.send("pwsend", {pw:pwtemp});

  //wind.webContents.openDevTools()

  const {shell} = require('electron');
  shell.openItem('https://dropbox.com/developers/apps');
  window.close();
}

function closefunc()
{
  store.set("eventhome", false);
  store.set("eventanalytics", false);
  store.set("eventindex", false);
  if(store.get('down')==true)
  {
    store.set("delcache", true);
    store.set('download',false);
    store.set('down',false);
    ipcRenderer.send('close_app');
  }
  else{
    window.close();
  }
}

function decryptkey(text, keyle){
  var encrypted = text;
  var key= keyle;
  var decrypted = CryptoJS.AES.decrypt(encrypted, key);
  return decrypted.toString(CryptoJS.enc.Utf8);
}

function imp()
{
    const { remote } = require('electron');
    var dialog = require('electron').remote.dialog;
    var fs = require('fs');
    var app = require('electron').remote; 
    var dialog = app.dialog;
  
    const files = dialog.showOpenDialogSync(null, {
      title: "Import Settings",
      buttonLabel: "Load Settings",
      properties: ['openFile'],
      filters: [{name:'JSON', extensions: ['json'] }]
    });
  
    if(!files) return;
  
    const file = files[0];
    const fileContent = fs.readFileSync(file).toString();
    const obj = JSON.parse(fileContent);
    try {
      if(obj.settings == "settings")
      {
        store.set('pw',encrypt(decryptkey(obj.pw, "Backup")));
        pwtemp = decryptkey(obj.pw, "Backup");
        store.set('dropboxtoken',encrypt(decryptkey(obj.dropboxtoken, "Backup")));
        store.set('backupkey',encrypt(decryptkey(obj.backupkey, "Backup")));
      }
    } catch (error) {
      $('#con').text('Wrong File!');
    }
  window.location.reload();
}

const IPCdownload = (event, arg) => {
  store.set('download',true);
}
ipcRenderer.on('download', IPCdownload);

const IPCdownloaded = (event, arg) => {
  store.set('down',true);
}
ipcRenderer.on('downloaded', IPCdownloaded);

ipcRenderer.on('exit', (event, arg) => {
  closefunc();
});

function showfunc()
{
  document.getElementById("pw").type = "text";
}

function hidefunc()
{
  document.getElementById("pw").type = "password";
  document.getElementById("pw").focus();
}

function showContextMenuText()
{
  /*document.getElementById('copyItem').onclick = function(){
    document.execCommand('copy');
    document.getElementById("context-menuText").classList.remove("active");
  };
  document.getElementById('pasteItem').onclick = function(){
    document.execCommand('paste');
    document.getElementById("context-menuText").classList.remove("active");
  };
  event.preventDefault();
  var contextElement = document.getElementById("context-menuText");
  var y = event.clientY;
  var x = event.clientX;
  contextElement.style.top = y + "px";
  contextElement.style.left = x + "px";
  contextElement.classList.add("active");
  document.getElementById("context-menuText").focus();*/
}

function yee(){
  console.log("weg");
  //document.getElementById("context-menuText").classList.remove("active");
}
      
  
      
      
      
      
