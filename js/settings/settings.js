console.log('settings loaded')

const { ipcRenderer } = require('electron');

const store = require('./js/storedata.js');
const init = require('./js/settings/init.js');

$("#paniclel").attr('disabled', true);

const BrowserWindow = require('electron').remote.BrowserWindow;
const path = require('path');
const url = require('url');
const axios = require('axios');
const electron = require('electron');
const nativeTheme = electron.remote.nativeTheme;

//var request = require('request');
const fs = require('fs');

const contextMenu = require('electron-context-menu');
const { SSL_OP_NETSCAPE_REUSE_CIPHER_CHANGE_BUG } = require('constants');
const { createPublicKey } = require('crypto');

            contextMenu({
                prepend: (params, browserWindow) => [
                  {
                    role: "selectAll",
                    visible: params.mediaType === 'text'
                },
                ],
                showInspectElement:false
            });

var maxim = store.get('max');
var theme = store.get('theme');
var ver = require('electron').remote.app.getVersion();
var xpos = store.get('x');
var ypos = store.get('y');
var widthvar = store.get('width');
var heightvar = store.get('height');
var ontopvar = store.get('ontop');
var blurvar = store.get('blur');
var navico = store.get('navbaricon')
var lockvar = store.get('lock');
var copyrightclickvar = store.get('copyrightclick');
var copystayontopvar = store.get('copystayontop');

var sicherung = false;
var pwlel = [];
var pwtempzwei;

var quitsicherung = true;

var pwtemp = store.get('pwtemp');
store.set('pwtemp','');


var bot = "";

init();

function encrypt(text)
{
  return encryptModule(text, pwtemp);
}

function decrypt(text)
{
  return decryptModule(text, pwtemp);
}

let winCloud;

const { app, globalShortcut } = require('electron').remote;

app.whenReady().then(() => {
  const ret = globalShortcut.register('CommandOrControl+X', () => {

    globalShortcut.unregister('CommandOrControl+C')
  })

  if (!ret) {
    console.log('registration failed')
  }

  console.log(globalShortcut.isRegistered('Shift+X'))
})

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

$('#ver').text("Version: "+ver);
      

      if(ontopvar == true){
        let remote = require('electron').remote;
        document.getElementById("topkek").value = "●";
        document.getElementById("topkeki").classList.add("fas");
        document.getElementById("topkeki").classList.remove("far");
        remote.getCurrentWindow().setAlwaysOnTop(true, 'screen');
        var element = document.getElementById("topkek");
        element.classList.add("blau");
      }

      if(navico == true){
        var element = document.getElementById("uno");
        element.classList.add("hide");
        var elementzwei = document.getElementById("dos");
        elementzwei.classList.remove("hide");
      }

      if(blurvar == true){
          var checkbox = document.getElementById('toggleswitchzwei');
          checkbox.checked = !checkbox.checked;
      }

      if(store.get('contentprotection') == true){
        var checkbox = document.getElementById('toggleswitchsechs');
        checkbox.checked = !checkbox.checked;
    }

      if(lockvar == true){
        var checkbox = document.getElementById('toggleswitchdrei');
        checkbox.checked = !checkbox.checked;
    }

    if(copyrightclickvar == true){
      document.getElementById("copyinput").value = store.get('copyseconds');
      var checkbox = document.getElementById('toggleswitchvier');
      checkbox.checked = !checkbox.checked;
      $("#copContainer").slideDown("slow", function(){});
    }

    if(copystayontopvar == true)
      {
        var checkbox = document.getElementById('toggleswitchfuenf');
        checkbox.checked = !checkbox.checked;
      }

    if(store.get('down')==true)
    {
      $('#updateinfo').text("Update Downloaded. It will be installed on restart. Restart now?");
      $('#bytepersek').text(" " + formatBytes(0)+"/s |");
      document.getElementById("restartupd").classList.remove('hide');
    }

$(document).ready(function(){

});     

  $('#max-btn').hover(function(){
    if(maxim == false)
    {
    $('#con').text('Maximize');
    }
    else
    {
      $('#con').text('Back to normal');
    }
  },
    function() {$('#con').text(bot);});

    $('#topkek').hover(function(){
      ontopvar = store.get('ontop');
      if(ontopvar == false)
      {
      $('#con').text('Stay on Top');
      }
      else
      {
        $('#con').text('Back to normal');
      }
    },
      function() {$('#con').text(bot);});

    if(store.get("delcache") == true)
    {
      store.set("delcache", false);
      deletecache();
    }

  $("#btndunkel").click(function(){
   theme = "0";
   store.set('theme', "0");
   store.set('pwtemp',pwtemp);
    window.location.reload();
  })

  $("#btnsystem").click(function(){

   theme = "2";
    store.set('theme', "2");
    store.set('pwtemp',pwtemp);
    window.location.reload();
  })

  $("#btnhell").click(function(){
    
   theme = "1";

   store.set('theme', "1");
   store.set('pwtemp',pwtemp);
    window.location.reload();
  })

function boundslele(){
    let remote = require('electron').remote;
    remote.getCurrentWindow().setBounds({
      x: 0,
      y: 0,
      width: 455,
      height: 269
  });
  }

function getCurrentFilenames() { 
  console.log("Current filenames:"); 
  fs.readdirSync(__dirname).forEach(file => { 
    console.log(file); 
  }); 
} 

var input = document.getElementById('toggleswitch');
var outputtext = document.getElementById('status');

input.addEventListener('change',function(){
    if(this.checked) {
      $("#paniclel").attr('disabled', false);
      $("#paniclel").css("display","block");
    } else {
      $("#paniclel").attr('disabled', true);
      $("#paniclel").css("display","none");
    }
});

function panicfunc(){
  
  var dropboxToken = store.get('dropboxtoken');
  dropboxToken = decrypt(dropboxToken);
  
  var contents = '[{"id":"0", "fav":"0", "titel":"","username":"","password":"","url":"","note":""}]';
  var blob = new Blob([contents], { type: 'text/plain' });
  var file = new File([blob], "pw.json", {type: "text/plain"});
  
  var xhr = new XMLHttpRequest();
   
  xhr.upload.onprogress = function(evt) {
    var percentComplete = parseInt(100.0 * evt.loaded / evt.total);
    console.log(percentComplete);
  };
   
  xhr.onload = function() {
    if (xhr.status === 200) {
      var fileInfo = JSON.parse(xhr.response);
      sicherung = false;
      console.log(fileInfo);
      var checkbox = document.getElementById('toggleswitchzwei');
      checkbox.checked = !checkbox.checked;
      $("#paniclel").attr('disabled', true);
      $("#paniclel").css("display","none");
      document.getElementById('toggleswitch').checked = false;
      $('#con').text('Password and Keys are removed from the Cloud');
      setTimeout(() => {  $('#con').text(bot); }, 2000);
    }
    else {
      var errorMessage = xhr.response || 'Unable to upload file';
      sicherung = false;
      console.log(errorMessage);
    }
  };
 
  xhr.open('POST', 'https://content.dropboxapi.com/2/files/upload');
  xhr.setRequestHeader('Authorization', 'Bearer ' + dropboxToken);
  xhr.setRequestHeader('Content-Type', 'application/octet-stream');
  xhr.setRequestHeader('Dropbox-API-Arg', JSON.stringify({
    path: '/' +  file.name,
    mode: 'overwrite',
    autorename: true,
  }));
   
  xhr.send(file);
}

function copy(text){
  var dummy = document.createElement("textarea");
    document.body.appendChild(dummy);
    dummy.value = text;
    dummy.select();
    document.execCommand("copy");
    document.body.removeChild(dummy);
}

function paste(){
  const text = 'pasted text';
const dataTransfer = new DataTransfer();
dataTransfer.setData('text', text);
const event = new ClipboardEvent('paste', {
  clipboardData: dataTransfer,
  bubbles: true
});
const element = document.querySelector('input');
element.dispatchEvent(event)
}


//Navbarstuff

function ex(){
  if(sicherung == false)
  {
  store.set("eventhome", false);
  store.set("eventanalytics", false);
  store.set("eventindex", false);
  if(maxim == false){
  quitsicherung = false;
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
else{
  $('#con').text('Working.. Please wait');
  setTimeout(() => {  $('#con').text(bot); ex();}, 2000);
}

}

function mini(){
  const { remote } = require('electron');
remote.BrowserWindow.getFocusedWindow().minimize();
}

function maxi(){
  const { remote } = require('electron');
  if(maxim == false)
  {
    remote.BrowserWindow.getFocusedWindow().maximize();
  }
  else
  {
    remote.BrowserWindow.getFocusedWindow().unmaximize();
  }
}

function canc(){
  if(sicherung == false)
  {
  stoppp = true;
  store.set('pwtemp',pwtemp);
  var element = document.getElementById("containerid");
  element.classList.add("animateLeft");
  var elementzwei = document.getElementById("btncancel");
  elementzwei.classList.add("animateLeft");

  var elementdrei = document.getElementById("navright");
  elementdrei.classList.add("animateLeft");
  var elementvier = document.getElementById("scrollbar-customzwei");
  elementvier.classList.add("animateLeft");
  var elementdrei = document.getElementById("btnEd");
  elementdrei.classList.add("animateLeft");
  var elementdrei = document.getElementById("tit");
  elementdrei.classList.add("animateLeft");
  store.set('lastsett',true);
  globalShortcut.unregisterAll()
  
  let remote = require('electron').remote;

  remote.getCurrentWindow().removeAllListeners('resize');
  remote.getCurrentWindow().removeAllListeners('focus');
  remote.getCurrentWindow().removeAllListeners('blur');
  remote.getCurrentWindow().removeAllListeners('unmaximize');
  remote.getCurrentWindow().removeAllListeners('maximize');
    /*ipcRenderer.removeAllListeners('exit');
    ipcRenderer.removeAllListeners('download');
    ipcRenderer.removeAllListeners('downloaded');
    ipcRenderer.removeAllListeners('infopz');
    ipcRenderer.removeAllListeners('update');
    ipcRenderer.removeAllListeners('fertig');
    ipcRenderer.removeAllListeners('restart_app');*/
    ipcRenderer.removeAllListeners();

        const winSettings = remote.getCurrentWindow();
          winSettings.loadURL(url.format( {
          pathname: path.join(__dirname, 'home.html'),
          protocol: 'file',
          slashes: true

        }))

  }
  else{
    $('#con').text('Working.. Please wait');
    setTimeout(() => {  $('#con').text(bot); }, 2000);
  }
      
}

function getVer(){
  const fs = require('fs')  
  const Path = require('path')  
  const axios = require('axios')

  axios.get("https://www.dropbox.com/s/gu89ibrva5hvnu8/version.json?dl=1")
  .then((response) => {
    var she = response.data;
  }).catch((err) => {
    console.log(err);
  })
}
//getVer();


function getUpdate(){
  const Fs = require('fs'); 
  const Path = require('path');  
  const Axios = require('axios');
  Axios.defaults.adapter = require('axios/lib/adapters/http');
  async function downloadImage () {  
  const url = 'https://unsplash.com/photos/AaEQmoufHLk/download?force=true'
  const path = Path.resolve(__dirname, 'code.jpg')
  const writer = Fs.createWriteStream(path)

  const response = await Axios({
    url,
    method: 'GET',
    responseType: 'stream'
  })

  response.data.pipe(writer)
}

downloadImage()  
}


function qrcodevor(){
  $("#qr").slideDown("slow", function(){
    qrcodefunc();
  });

}

function qrcodeLink(os){
  $("#qr2").slideDown("slow", function(){
    qrcodefunc2(os);
  });
}

function hideqrfunc()
{
  $("#qr").slideUp("slow", function(){});
  $("#qr2").slideUp("slow", function(){});
}

function dropdropfunc(){
  if(document.getElementById("dropdropspan").innerText == "▼")
  {
    $("#dropdrop").slideDown("slow", function(){});
    $('#dropdropspan').text("▲");
  }
  else{
    $("#dropdrop").slideUp("slow", function(){});
    $('#dropdropspan').text("▼");
  }
}



function qrcodefunc(){
  var encrypted = decrypt(store.get("pw"))
  //textqr = encrypted.toString();
  var textqr = ''+ encrypted.toString() +';'+ decrypt(store.get("dropboxtoken"));
  textqr = CryptoJS.AES.encrypt(textqr, "o").toString();
  var QRCode = require('qrcode')
  var canvas = document.getElementById('canvas')
 
  QRCode.toCanvas(canvas, textqr, function (error) {
    if (error) console.error(error)
    console.log('success!');
  })
}

function qrcodefunc2(os){
  var textqr = "";
  if(os == "Android")
  {
    textqr = "https://www.dropbox.com/s/b52zgi6jnnjm7rq/pCloud.apk?dl=1";
  }
  else{
    textqr = "";
  }
  var QRCode = require('qrcode')
  var canvas = document.getElementById('canvas2')
 
  QRCode.toCanvas(canvas, textqr, function (error) {
    if (error) console.error(error)
    console.log('success!');
  })
}

function erstmal(){
  let remote = require('electron').remote;

  store.set('pwtemp',pwtemp);
  store.set('indexclose', false);
  
  let winSettings = new BrowserWindow({
    //width: 1000,
    //height: 630,
    width: 500,
    height: 630,
    minWidth: 300,
    minHeight: 350,
    //alwaysOnTop: true,
    frame: false,
    icon: 'pictures/icon.ico',
    contextIsolation: true,
    
    webPreferences: {
      nodeIntegration: true,
      preload: path.join(__dirname, 'js/preload.js')
    }
  }) 

  winSettings.loadURL(url.format( {
    pathname: path.join(__dirname, 'DropbCloud.html'),
    //pathname: path.join(__dirname, 'sesses.html'),
    protocol: 'file',
    slashes: true

  }))

  mainWindow.webContents.send("pwsend", {pw:pwtemp});
  //winSettings.webContents.openDevTools()
  //const {shell} = require('electron');
  //shell.openItem('https://dropbox.com/developers/apps');
  
}

function rez(){
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

function ontop(){
  var ch = document.getElementById("topkek").value;
  let remote = require('electron').remote;
  if(ch == "○")
  {
    document.getElementById("topkek").value = "●";
    remote.getCurrentWindow().setAlwaysOnTop(true, 'screen');
    var element = document.getElementById("topkek");
    document.getElementById("topkeki").classList.add("fas");
    document.getElementById("topkeki").classList.remove("far");
    element.classList.add("blau");
    store.set('ontop', true);
    ontopvar = true;
  }
  else{
    document.getElementById("topkek").value = "○";
    remote.getCurrentWindow().setAlwaysOnTop(false, 'screen');
    var element = document.getElementById("topkek");
    document.getElementById("topkeki").classList.remove("fas");
    document.getElementById("topkeki").classList.add("far");
    element.classList.remove("blau");
    store.set('ontop', false);
    ontopvar = false;
  }

}

var input = document.getElementById('toggleswitchzwei');

input.addEventListener('change',function(){
    if(this.checked) {
      store.set('blur',true);
    } else {
      store.set('blur',false);
    }
});

var inputzwei = document.getElementById('toggleswitchdrei');

inputzwei.addEventListener('change',function(){
    if(this.checked) {
      store.set('lock',true);
    } else {
      store.set('lock',false);
    }
});

document.getElementById('toggleswitchvier').addEventListener('change',function(){
    if(this.checked) {
      //store.set('blur',true);
      $("#copContainer").slideDown("slow", function(){});
    } else {
      //store.set('blur',false);
      $("#copContainer").slideUp("slow", function(){});
    }
});

require('electron').remote.getCurrentWindow().on('unmaximize', () => {
  const { remote } = require('electron');
  
    maxim = false;
    store.set('max',false);
    document.getElementById("max-btn").value = "🗖";

  
})

require('electron').remote.getCurrentWindow().on('maximize', () => {
  const { remote } = require('electron');

    rez();
    maxim = true;
    store.set('max',true);
    document.getElementById("max-btn").value = "🗗︎";
  
  
})

function versuchle(){
  var elmnt = document.getElementById("panicbtnvar");
  elmnt.scrollIntoView({
    behavior: 'smooth'
  });
}

function versuchlele(){
  var elmnt = document.getElementById("updatediv");
  elmnt.scrollIntoView({
    behavior: 'smooth'
  }); // false
}

function updatevar(){
  var elmnt = document.getElementById("updatediv");
  elmnt.scrollIntoView({
    behavior: 'smooth'
  }); // false
}

function zerovar(){
  var elmnt = document.getElementById("versuchlelediv");
  elmnt.scrollIntoView({
    behavior: 'smooth'
  }); // false
}

function onevar(){
  var elmnt = document.getElementById("themediv");
  elmnt.scrollIntoView({
    behavior: 'smooth'
  });
}

function twovar(){
  var elmnt = document.getElementById("gesettdiv");
  elmnt.scrollIntoView({
    behavior: 'smooth'
  });
}

function threevar(){
  var elmnt = document.getElementById("scandiv");
  elmnt.scrollIntoView({
    behavior: 'smooth'
  });
}

function fourvar(){
  var elmnt = document.getElementById("pwdiv");
  elmnt.scrollIntoView({
    behavior: 'smooth'
  });
  document.getElementById("borderpw").classList.add("blauborder");
  setTimeout(() => {  
    document.getElementById("borderpw").classList.remove("blauborder");
   }, 6000);
}

function fivevar(){
  var elmnt = document.getElementById("backupdiv");
  elmnt.scrollIntoView({
    behavior: 'smooth'
  });
}

function arrl(){
  var element = document.getElementById("uno");
  element.classList.add("hide");
  var elementzwei = document.getElementById("dos");
  elementzwei.classList.remove("hide");
  store.set('navbaricon',true);
}

function arrr(){
  var element = document.getElementById("dos");
  element.classList.add("hide");
  var elementzwei = document.getElementById("uno");
  elementzwei.classList.remove("hide");
  store.set('navbaricon',false);
}

function lock(){
  if(maxim == false){
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

  const BrowserWindow = require('electron').remote.BrowserWindow;
  const { remote } = require('electron');
  winindex = new BrowserWindow({
    width: 383,
    height: 240,
    minHeight: 240,
    minWidth: 383,
    maxHeight: 240,
    maxWidth: 383,
    icon: 'pictures/icon.ico',
    backgroundColor: "#1e1e1e",
    maximizable: false,
    contextIsolation: true,
    frame: false,
    webPreferences: {
      nodeIntegration: true,
      preload: path.join(__dirname, 'js/preload.js')
    }
    
  }) 
 
  winindex.loadURL(url.format( {
    pathname: path.join(__dirname, 'index.html'),
    protocol: 'file',
    slashes: true

  }))

  winindex.once('ready-to-show', () => {
    winindex.show();
  })
  window.close();
}

function resetfunc(){
  store.set('theme',"0");
  store.set('x',"455");
  store.set('y',"269");
  store.set('width',"700");
  store.set('height',"500");
  store.set('max',false);
  store.set('ontop',false);
  store.set('blur',true);
  store.set('navbaricon',false);
  store.set('dropdown',0);
  store.set('favbtn',0);
  store.set('indexclose',false);
  store.set('lock',true);
  store.set('lastsett',false);
  store.set('backupkey',"");
  store.set('eventhome',false);
  store.set('eventindex',false);
  store.set('eventanalytics',false);
  store.set('download',false);
  store.set('down',false);
  store.set('delcache',false);
  store.set('delcache',false);
  store.set('copyrightclick',true);
  store.set('copystayontop',true);
  store.set('copyseconds',10);
  store.set('contentprotection',true);
  boundslele();
}

//UPLOAD

function uploadFilezwei(fil){
  try {
    var dropboxToken = store.get('dropboxtoken');
  } catch (error) {
    return
  }
  dropboxToken = decrypt(dropboxToken);
  console.log(dropboxToken)
  var savedrop = dropboxToken;

var contents = fil;
 var blob = new Blob([contents], { type: 'text/plain' });
 var file = new File([blob], "pw.json", {type: "text/plain"});

 
  
var xhr = new XMLHttpRequest();
 
xhr.upload.onprogress = function(evt) {
  var percentComplete = parseInt(100.0 * evt.loaded / evt.total);
  console.log(percentComplete);
};
 
xhr.onload = function() {
  if (xhr.status === 200) {
    var fileInfo = JSON.parse(xhr.response);
    sicherung = false;
    console.log(fileInfo);
  }
  else {
    var errorMessage = xhr.response || 'Unable to upload file';
    sicherung = false;
    console.log(errorMessage);

  }
};

xhr.open('POST', 'https://content.dropboxapi.com/2/files/upload');
xhr.setRequestHeader('Authorization', 'Bearer ' + dropboxToken);
xhr.setRequestHeader('Content-Type', 'application/octet-stream');
xhr.setRequestHeader('Dropbox-API-Arg', JSON.stringify({
  path: '/' +  file.name,
  mode: 'overwrite',
  autorename: true,
}));
 
xhr.send(file);
}

function uploadFile(fil){
  try {
    var dropboxToken = store.get('dropboxtoken');
  } catch (error) {
    
  }
  dropboxToken = decrypt(dropboxToken);
  var savedrop = dropboxToken;

var contents = fil;
 var blob = new Blob([contents], { type: 'text/plain' });
 var file = new File([blob], "pw.json", {type: "text/plain"});

 
  
var xhr = new XMLHttpRequest();
 
xhr.upload.onprogress = function(evt) {
  var percentComplete = parseInt(100.0 * evt.loaded / evt.total);
  console.log(percentComplete);
};
 
xhr.onload = function() {
  if (xhr.status === 200) {
    var fileInfo = JSON.parse(xhr.response);
    sicherung = false;
    console.log(fileInfo);

    store.set('pw',encryptzwei(pwtempzwei));

    store.set('dropboxtoken',encryptzwei(savedrop));

    pwtemp = pwtempzwei;
    pwtempzwei = "";

    //var element = document.getElementById("chpweins");
    //element.classList.remove("hide");
    //var element = document.getElementById("chpwzwei");
    //element.classList.add("hide");
    $('#chpw').show('fast');
    $('#chpwzwei').hide('fast');
    document.getElementById("currpw").value = "";
    document.getElementById("newpw").value = "";
    document.getElementById("againpw").value = "";
    
  }
  else {
    var errorMessage = xhr.response || 'Unable to upload file';
    sicherung = false;
    console.log(errorMessage);

  }
};
 
xhr.open('POST', 'https://content.dropboxapi.com/2/files/upload');
xhr.setRequestHeader('Authorization', 'Bearer ' + dropboxToken);
xhr.setRequestHeader('Content-Type', 'application/octet-stream');
xhr.setRequestHeader('Dropbox-API-Arg', JSON.stringify({
  path: '/' +  file.name,
  mode: 'overwrite',
  autorename: true,
}));
 
xhr.send(file);
}

//DOWNLOAD

function getVer(){
try {
  var dropboxToken = store.get('dropboxtoken');
}
catch(err) {
  $('#con').text('Dropbox Token is wrong!');
}
dropboxToken = decrypt(dropboxToken);

var xhr = new XMLHttpRequest();
xhr.responseType = 'json';
xhr.upload.onprogress = function(evt) {
  var percentComplete = parseInt(100.0 * evt.loaded / evt.total);
  console.log(percentComplete);
};

xhr.onload = function(e) {
  if (xhr.status === 200) {
    pwlel = e.currentTarget.response;
    $('#con').text('Ready to Change Password');
    sicherung = false;
    
  }
  else {
    var errorMessage = xhr.response || 'Unable to download file';
    console.log(errorMessage);

    console.log('no');
    $('#con').text('No Connection to Cloud');
    sicherung = false;
  }
};

xhr.open('POST', 'https://content.dropboxapi.com/2/files/download');
xhr.setRequestHeader('Authorization', 'Bearer ' + dropboxToken);
xhr.setRequestHeader('Dropbox-API-Arg', JSON.stringify({
  path: '/pw.json'
}));

xhr.send();

}

function showchangepw(){
  var pwversuch = document.getElementById('currpw').value;
  if(pwtemp == pwversuch)
  {
    $('#con').text('Downloading..');
    $('#chpw').hide('fast');
    $('#chpwzwei').show('fast');
    //document.getElementById("chpweins").classList.add("hide");
    //var element = document.getElementById("chpwzwei");
    //element.classList.remove("hide");
    sicherung = true;
    getVer();
  }
  else{
    $('#con').text('Wrong Password');
    var element = document.getElementById("currpw");
    element.classList.add("rotborder");
    setTimeout(() => {  $('#con').text(bot); 
    var element = document.getElementById("currpw");
    element.classList.remove("rotborder");
    }, 2000);

  }
}

document.getElementById('currpw').addEventListener('keypress', (e) => {

  if (e.key === 'Enter') {
    showchangepw();
  }

});

function changepwfunc(){
  var pweins = document.getElementById('newpw').value;
  var pwzwei = document.getElementById('againpw').value;
  if(pweins == pwzwei && pweins != "")
  {
    pwtempzwei = pweins;
    sicherung = true;
    var amk = "[\n"
    var i;
    var len = pwlel.length;
    var len2 = len - 1;
    for(i=0;i< len;i++)
    {
      var id = pwlel[i].id;
      var titel = pwlel[i].titel;
      titel = decrypt(titel);
      titel = encryptzwei(titel);
      var username = pwlel[i].username;
      username = decrypt(username);
      username = encryptzwei(username);
      var password = pwlel[i].password;
      password = decrypt(password);
      password = encryptzwei(password);
      var url = pwlel[i].url;
      url = decrypt(url);
      url = encryptzwei(url);
      var note = pwlel[i].note;
      note = decrypt(note);
      note = encryptzwei(note);
      var fav = pwlel[i].fav;

      var created = new Date().toLocaleDateString();
      if(pwlel[i].created != null)
      {
        created = pwlel[i].created;
      }
      var updated = new Date().toLocaleDateString();
      if(pwlel[i].updated != null)
      {
        updated = pwlel[i].updated;
      }

      amk += '{"id":"'+id+'", "fav":"'+fav+'", "titel":"'+titel+'","username":"'+username+'","password":"'+password+'","url":"'+url+'","note":"'+note+', "created":"'+created+'", "updated":"'+updated+'"}';
      if(i < len2){
        amk += ",\n";
      }
      else{
       amk += "\n";
      }
    }
    amk += "]";
    
    uploadFile(amk);
  }
  else{
    $('#con').text('Invalid Password');
    var element = document.getElementById("newpw");
    element.classList.add("rotborder");
    var element = document.getElementById("againpw");
    element.classList.add("rotborder");
    setTimeout(() => {  $('#con').text(bot); 
    var element = document.getElementById("newpw");
    element.classList.remove("rotborder");
    var element = document.getElementById("againpw");
    element.classList.remove("rotborder");
    }, 2000);
  }

}

function encryptzwei(text){
  var message = text;
  var key= pwtempzwei;
  var encrypted = CryptoJS.AES.encrypt(message, key); 
  return encrypted.toString();
}

function openbackup(){
  //const app = require('electron').remote;
  const { remote } = require('electron');
  var dialog = require('electron').remote.dialog;
  var fs = require('fs');
  var app = require('electron').remote; 
  var dialog = app.dialog;

  var lelelele;
  if(document.getElementById("radio1").checked)
  {
    lelelele = pwtemp;
    console.log("1")
  }
  if(document.getElementById("radio2").checked)
  {
    lelelele = "pCloud";
    console.log("2")
  }
  if(document.getElementById("radio3").checked)
  {
    console.log("3")
    lelelele = document.getElementById("encryptionkey").value;
    if(lelelele == "")
    {
      $('#con').text("You need to enter a Key");
      setTimeout(() => {  $('#con').text(bot); }, 2000);
      return;
    }
  }

  const files = dialog.showOpenDialogSync(null, {
    title: "Load Backup File",
    buttonLabel: "Load Backup",
    properties: ['openFile'],
    filters: [{name:'JSON', extensions: ['json'] }]
  });

  if(!files) return;

  const file = files[0];
  const fileContent = fs.readFileSync(file).toString();
  const obj = JSON.parse(fileContent);



  var objrdy='[\n{"id":"0", "fav":"0", "titel":"","username":"","password":"","url":"","note":""},\n';
  try {
    if(obj[0].backup == "backup")
    var i = 1;
    for(i=2;i< obj.length;i++)
      {
        objrdy += '{"id":"'+obj[i].id+'", "fav":"'+obj[i].fav+'", "titel":"'+encrypt(decryptkey(obj[i].titel, lelelele))+'","username":"'+encrypt(decryptkey(obj[i].username, lelelele))+'","password":"'+encrypt(decryptkey(obj[i].password, lelelele))+'","url":"'+encrypt(decryptkey(obj[i].url, lelelele))+'","note":"'+encrypt(decryptkey(obj[i].note, lelelele))+'"}';
        if(obj.length-1 == i)
        {
          objrdy += "\n";
        }
        else{
          objrdy += ",\n";
        }
      }
    objrdy += "]"
    console.log(objrdy);
    uploadFilezwei(objrdy)
  } catch (error) {
    $('#con').text('Wrong File!');
    console.log("Wrong File!")
  }
}

function impfunc(){
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
    console.log("Wrong File!")
  }
}

function createenKey(){
  return Math.random().toString(36).substr(2);
}

createenKey();

function decryptkey(text, keyle){
  var encrypted = text;
  var key= keyle;
  var decrypted = CryptoJS.AES.decrypt(encrypted, key);
  return decrypted.toString(CryptoJS.enc.Utf8);
}

function encryptkey(text, keyle){
  var message = text;
  var key= keyle;
  var encrypted = CryptoJS.AES.encrypt(message, key); 
  return encrypted.toString();
}

function savebackup(){
  const { remote } = require('electron');
  var dialog = require('electron').remote.dialog;
  var fs = require('fs');
  var app = require('electron').remote; 
  var dialog = app.dialog;

  var lelelele;
  if(document.getElementById("radio1").checked)
  {
    lelelele = pwtemp;
  }
  if(document.getElementById("radio2").checked)
  {
    lelelele = "pCloud";
  }
  if(document.getElementById("radio3").checked)
  {
    lelelele = document.getElementById("encryptionkey").value;
    if(lelelele == "")
    {
      $('#con').text("You need to enter a Key");
      setTimeout(() => {  $('#con').text(bot); }, 2000);
      return;
    }
  }


  const files = dialog.showSaveDialogSync(null, {
    title: "Save Backup File",
    buttonLabel: "Save Backup",
    defaultPath : "pCloud-Backup",
    properties: ['openFile'],
    filters: [{name:'JSON', extensions: ['json'] },]
  });

  if(!files) return;

  
  var amk = "[\n";
  amk += '{"backup":"backup"},\n';
    var i;
    var len = pwlel.length;
    var len2 = len - 1;
    for(i=0;i< len;i++)
    {
      var id = pwlel[i].id;
      var titel = pwlel[i].titel;
      titel = decrypt(titel);
      titel = encryptkey(titel, lelelele);
      var username = pwlel[i].username;
      username = decrypt(username);
      username = encryptkey(username, lelelele);
      var password = pwlel[i].password;
      password = decrypt(password);
      password = encryptkey(password, lelelele);
      var url = pwlel[i].url;
      url = decrypt(url);
      url = encryptkey(url, lelelele);
      var note = pwlel[i].note;
      note = decrypt(note);
      note = encryptkey(note, lelelele);
      var fav = pwlel[i].fav;

      var created = new Date().toLocaleDateString();
      if(pwlel[i].created != null)
      {
        created = pwlel[i].created;
      }
      var updated = new Date().toLocaleDateString();
      if(pwlel[i].updated != null)
      {
        updated = pwlel[i].updated;
      }

      amk += '{"id":"'+id+'", "fav":"'+fav+'", "titel":"'+titel+'","username":"'+username+'","password":"'+password+'","url":"'+url+'","note":"'+note+', "created":"'+created+'", "updated":"'+updated+'"}';
      if(i < len2){
        amk += ",\n";
      }
      else{
       amk += "\n";
      }
    }
    amk += "]";

  fs.writeFileSync(files, amk, 'utf-8');
  console.log("fertig");

}

function expfunc(){
  const { remote } = require('electron');
  var dialog = require('electron').remote.dialog;
  var fs = require('fs');
  var app = require('electron').remote; 
  var dialog = app.dialog;

  const files = dialog.showSaveDialogSync(null, {
    title: "Export Settings",
    buttonLabel: "Save Settings",
    defaultPath : "pCloud-Settings",
    properties: ['openFile'],
    filters: [{name:'JSON', extensions: ['json'] },]
  });

  if(!files) return;

  var amk = '{\n"settings":"'+"settings"+'",\n"pw":"'+encryptkey(decrypt(store.get("pw")), "Backup")+'",\n"dropboxtoken":"'+encryptkey(decrypt(store.get("dropboxtoken")), "Backup")+'",\n"backupkey":"'+encryptkey(decrypt(store.get("backupkey")), "Backup")+'"\n}';
  fs.writeFileSync(files, amk, 'utf-8');
}

function getVerzwei(){
try {
  $('#con').text('Loading..');
  var dropboxToken = store.get('dropboxtoken');
}
catch(err) {
  $('#con').text('Dropbox Token is wrong!');
}
dropboxToken = decrypt(dropboxToken);

var xhr = new XMLHttpRequest();
xhr.responseType = 'json';
xhr.upload.onprogress = function(evt) {
  var percentComplete = parseInt(100.0 * evt.loaded / evt.total);
  console.log(percentComplete);
};

xhr.onload = function(e) {
  if (xhr.status === 200) {
    var she = e.currentTarget.response;;
    pwlel = she;
    $('#con').text('Downloaded');
    savebackup();
    sicherung = false;
  }
  else {
    var errorMessage = xhr.response || 'Unable to download file';
    console.log(errorMessage);

    $('#con').text('No Connection to Cloud');
    sicherung = false;
  }
};

xhr.open('POST', 'https://content.dropboxapi.com/2/files/download');
xhr.setRequestHeader('Authorization', 'Bearer ' + dropboxToken);
xhr.setRequestHeader('Dropbox-API-Arg', JSON.stringify({
  path: '/pw.json'
}));

xhr.send();
}

require('electron').remote.getCurrentWindow().on('focus', () => {
  var contextElement = document.getElementById("sklel");
  contextElement.classList.remove("navbaroffle");
  var contextElement = document.getElementById("sk");
  contextElement.classList.remove("navbaroffle");
})

require('electron').remote.getCurrentWindow().on('blur', () => {
  var contextElement = document.getElementById("sklel");
  contextElement.classList.add("navbaroffle");
  var contextElement = document.getElementById("sk");
  contextElement.classList.add("navbaroffle");
})

ipcRenderer.on('lock-Screen', (event, arg) => {
  if(lockvar == true){
    lock();
  }
});

function credits(){
  var dt = new Date();
  document.getElementById('creditlabel').innerText = 'Copyright © ' + dt.getFullYear() + ' Ricardo Matos';
  document.getElementById("cred").classList.remove("hide");
  document.getElementById("cred").classList.add("containerlezwei");
  document.getElementById("cred").classList.remove("containerremove");
  //$("#cred").fadeIn(1000);
  //$("#cred").fadeIn("slow");
}

function closecredits(){
  if(!$("#licid:hover").length != 0){
    document.getElementById("cred").classList.remove("containerlezwei");
    document.getElementById("cred").classList.add("containerremove");
    setTimeout(() => {  document.getElementById("cred").classList.add("hide"); }, 600);
  }

}

function infofunc(){
  licensestuff();
  document.getElementById("infoscre").classList.remove("hide");
  document.getElementById("infoscre").classList.add("containerlezwei");
  document.getElementById("infoscre").classList.remove("containerremove");
  //$("#cred").fadeIn(1000);
  //$("#cred").fadeIn("slow");
}

function closeinfo(){
  //credits()
  document.getElementById("infoscre").classList.remove("containerlezwei");
  document.getElementById("infoscre").classList.add("containerremove");
  setTimeout(() => {  document.getElementById("infoscre").classList.add("hide"); }, 600);
}

function licensestuff()
{
  fetch('license.txt')
  .then(response => response.text())
  .then(text => document.getElementById("txtlicense").innerText = text)
}

function getenkey(){
  document.getElementById("encryptionkey").value = decrypt(store.get('backupkey'));
}

function setenkey(){
  var lelelele = document.getElementById("encryptionkey").value;
  if(lelelele == "")
  {
    $('#con').text('No Key');
  }
  else{
    store.set('backupkey',encrypt(lelelele));
  }

}

function dropshowtoken(){
  document.getElementById("droptok").value = decrypt(store.get('dropboxtoken'));
}

var holdtok = false;
function holddroptok(){
  if(holdtok == false)
  {
    holdtok = true;
    document.getElementById("tokenshow").value = "x";
  }
  else{
    holdtok = false;
    document.getElementById("tokenshow").value = "•";
  }
}

function leavedroptok(){
  if(holdtok == false)
  {
    document.getElementById("droptok").value = "";
    holdtok = false;
  }
}

function formatBytes(bytes, decimals = 2) {
  if (bytes === 0) return '0 Bytes';
  const k = 1024;
  const dm = decimals < 0 ? 0 : decimals;
  const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
}

var stoppp = true;

function downloadup(){
  document.getElementById("progrbar").classList.remove("hide");
  stoppp = false
  loop();
}

function loop(){
  ipcRenderer.send('infopz');
  if(stoppp == false)
  {
    setTimeout(() => {
      loop();
    }, 1000);
  }
  else{
    ipcRenderer.send('infopz');
    ipcRenderer.removeAllListeners('infopz');
  }
}
  var totaldown = 0;
  ipcRenderer.on('infopz', (event, arg) => {
    document.getElementById("progressid").value = arg.pctg;
    $('#bytepersek').text(" " + formatBytes(arg.bytesek)+"/s |");
    $('#vonb').text(" " + formatBytes(arg.transf));
    totaldown = arg.total;
    $('#bisb').text(" / " + formatBytes(arg.total));
  });

  function checkupd(){
    ipcRenderer.send('update');
  }
  checkupd();

  ipcRenderer.on('update', (event, arg) => {
    console.log("Updaten?"+arg.update);
    if(arg.update == true)
    {
      if(store.get("down") == false)
      {
        $('#updateinfo').text("Update available, downloading...");
      }
      //document.getElementById("checkbutt").classList.add('hidden');
      //ipcRenderer.removeAllListeners('update');
      downloadup();
    }
    else{
      $('#con').text("No updates available");
    }
  });

  ipcRenderer.on('download', (event, arg) => {
    store.set('download',true);
  });

  ipcRenderer.on('downloaded', (event, arg) => {
    store.set('down',true);
  });

  ipcRenderer.on('fertig', (event, arg) => {
    ipcRenderer.removeAllListeners('update_downloaded');
    ipcRenderer.removeAllListeners('update');
    $('#updateinfo').text("Update Downloaded. It will be installed on restart. Restart now?");
    $('#vonb').text(" " + formatBytes(totaldown));
    document.getElementById("progressid").value = 100;
    $('#bytepersek').text(" " + formatBytes(0)+"/s |");
    document.getElementById("restartupd").classList.remove('hide');
    stoppp = true;
  });

  function restartfunclel(){
    if(maxim == false){
      quitsicherung = false;
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
    store.set("delcache", true);
    store.set("download", false);
    store.set("down", false);
    ipcRenderer.send('restart_app');
  }

  function getsize(){
    var fs = require("fs"); //Load the filesystem module
    var str = app.getPath('appData');
    var fields = str.split('\\');
    var res = "";
    for(var i=0;i<fields.length-2;i++)
    {
      res = res + fields[i] + "/";
    }
    var fileort = res+"AppData/Local/pcloud-updater/installer.exe";
    var stats = "";
    var fileSizeInBytes;
    var fileSizeInMegabytes;
    if (fs.existsSync(fileort)) {
      stats = fs.statSync(res+"AppData/Local/pcloud-updater/installer.exe")
      fileSizeInBytes = stats.size;
      fileSizeInMegabytes = fileSizeInBytes / (1024*1024);
    } else {
      fileSizeInMegabytes = 0;
    }
    $('#foldersize').text("Cache size: "+Math.floor(fileSizeInMegabytes) + "MB | ");
  }
  getsize();

  const deleteFolderRecursive = function(path) {
    const Path = require('path');
    if (fs.existsSync(path)) {
      fs.readdirSync(path).forEach((file, index) => {
        const curPath = Path.join(path, file);
        if (fs.lstatSync(curPath).isDirectory()) { // recurse
          deleteFolderRecursive(curPath);
        } else { // delete file
          fs.unlinkSync(curPath);
        }
      });
      fs.rmdirSync(path);
    }
  };

  function deletecache(){
    var fs = require("fs");
    var str = app.getPath('appData');
    var fields = str.split('\\');
    var res = "";
    for(var i=0;i<fields.length-2;i++)
    {
      res = res + fields[i] + "/";
    }
    var filepath = res+"AppData/Local/pcloud-updater/installer.exe";
    var filepathzwei = res+"AppData/Local/pcloud-updater/pending";
    if (fs.existsSync(filepath)) {
      fs.unlink(filepath, (err) => {
          if (err) {
              console.log("An error ocurred updating the file" + err.message);
              $('#con').text("An error ocurred");
          }
          $('#foldersize').text("Cache size: "+ "0" + "MB | ");
      });
    } else {
        console.log("This file doesn't exist, cannot delete");
        $('#con').text("This file doesn't exist, cannot delete");
    }
    deleteFolderRecursive(filepathzwei);
  }

  const { remote } = require('electron');
  
  function once(){
    const bounds = remote.getCurrentWindow().getSize();
    document.getElementById("scrollbar-customzwei").style.height = bounds[1]-135 +"px";
  }
  once();
  
  remote.getCurrentWindow().on('resize', function() {
    const bounds = remote.getCurrentWindow().getSize();
    document.getElementById("scrollbar-customzwei").style.height = bounds[1]-135 +"px";
  });

  document.getElementById("currpw").addEventListener('keydown', (event)=>{
    if(event.getModifierState("CapsLock"))
      {
        $('#capslock').fadeIn('fast');
      }
      else
      {
        $('#capslock').fadeOut('fast');
      }
  })
  
  document.getElementById("newpw").addEventListener('keydown', (event)=>{
    if(event.getModifierState("CapsLock"))
      {
        $('#capslockzwei').fadeIn('fast');
      }
      else
      {
        $('#capslockzwei').fadeOut('fast');
      }
  })
  
  document.getElementById("againpw").addEventListener('keydown', (event)=>{
    if(event.getModifierState("CapsLock"))
      {
        $('#capslockzwei').fadeIn('fast');
      }
      else
      {
        $('#capslockzwei').fadeOut('fast');
      }
  })

  ipcRenderer.on('exit', (event, arg) => {
    ex();
  });

function closePaypal()
{
  ipcRenderer.send('close-paypal');
}



function fnGetExtension(file) {

  var fileName = file.name;

  var patternFileExtension = /\.([0-9a-z]+)(?:[\?#]|$)/i;

  var fileExtension = (fileName).match(patternFileExtension);
  const chars = fileExtension.toString().split(',');
  return chars[0];
 }


function encryptTest() {
  const { remote } = require('electron');
  var dialog = require('electron').remote.dialog;
  var app = require('electron').remote; 
  var dialog = app.dialog;

  const filevar = document.getElementById('enfile').files[0];
  const reader2 = new FileReader();

  reader2.addEventListener("load", function () {
    console.log(filevar.size);
    /*if(filevar.size >= 15000000)
    {
      console.log("zu groß!");
      return;
    }*/
    
    var file = new Blob([filevar]);

    var reader = new FileReader();
    reader.onload = () => {
      var key = pwtemp;

      var str = bufferToString(reader.result);
      //console.log(str);
      //var encrypted = CryptoJS.AES.encrypt(str, key).toString(); 


      var arrString100 = "[";
      var anzahl = Math.round(str.length/100+0.5);
      for(var c = 0; c<anzahl; c++)
      {
        var string100 = "";
        for(var b = 0; b<100; b++)
        {
          if(str.charAt(b+100*c) == null)
          {
            break;
          }
          string100 += str.charAt(b+100*c);
        }
        console.log(Math.round(c/anzahl*100)+"%");
        arrString100 += '"'+CryptoJS.AES.encrypt(string100, key).toString()+'"';
        if(c != anzahl-1)
        {
          arrString100 += ",";
        }
      }
      arrString100 += "]";


      const files = dialog.showSaveDialogSync(null, {
        title: "Save Encrypted File",
        buttonLabel: "Save",
        defaultPath : "encrypted-file",
        properties: ['openFile'],
        filters: [{name:'JSON', extensions: ['json'] },]
      });
      
      if(!files) return;
      
      
      var objrdy='[\n{\n"type":"'+ fnGetExtension(filevar) +'",\n"content":'+arrString100+'\n}\n]';
      
      fs.writeFileSync(files, objrdy, 'utf-8');
      document.getElementById('enfile').value = "";
    };
    reader.readAsArrayBuffer(file);

  }, false);

  if (filevar) {
    reader2.readAsDataURL(filevar);
  }


}

function bufferToString( buf ) {
  var view = new Uint8Array( buf );
  return Array.prototype.join.call(view, ",");
}

function stringToBuffer( str ) {
  var arr = str.split(",")
    , view = new Uint8Array( arr );
  return view.buffer;
}

function decryptTest() {
  const { remote } = require('electron');
  var dialog = require('electron').remote.dialog;
  var fs = require('fs');
  var app = require('electron').remote; 
  var dialog = app.dialog;


  const files = dialog.showOpenDialogSync(null, {
    title: "Decrypt File",
    buttonLabel: "decrypt",
    properties: ['openFile'],
    filters: [{name:'JSON', extensions: ['json'] }]
  });

  if(!files) return;

  const file = files[0];
  const fileContent = fs.readFileSync(file).toString();
  const obj = JSON.parse(fileContent);

      var key = pwtemp;
      var arrString100 = obj[0].content;
      var decrypted = "";
      for(var i = 0; i<arrString100.length;i++)
      {
        console.log(Math.round(i/arrString100.length*100)+"%");
        decrypted += CryptoJS.AES.decrypt(arrString100[i], key).toString(CryptoJS.enc.Utf8);
      }
      //var decrypted = CryptoJS.AES.decrypt(obj[0].content, key).toString(CryptoJS.enc.Utf8);
      var data = stringToBuffer(decrypted);
      var array = new Uint8Array(data);
      var fileDec = new Blob([array]);

      var a = document.createElement("a");
      var url = window.URL.createObjectURL(fileDec);
      var filename = "file" + "."+ obj[0].type;
      a.href = url;
      a.download = filename;
      a.click();
      window.URL.revokeObjectURL(url);
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

ipcRenderer.on('autostart', (event, arg) => {
  console.log("BOOOOOOOOOOOOOOLEAN: "+arg.boolean);
  var checkbox = document.getElementById('toggleswitchstartup');
  checkbox.checked = arg.boolean;
});
ipcRenderer.send('autostart');

var input = document.getElementById('toggleswitchstartup');

input.addEventListener('change',function(){
    if(this.checked) {
      ipcRenderer.send('autostartOn');
    } else {
      ipcRenderer.send('autostartOff');
    }
});

function activationfunc(){
  if(document.getElementById("activationdrop").innerText == "▼")
  {
    $("#activationdropdrop").slideDown("slow", function(){});
    $('#activationdrop').text("▲");
    var dropboxToken = store.get('dropboxtoken');
    //dropboxToken = decrypt(dropboxToken);
    document.getElementById("actokid").value = dropboxToken;
  }
  else{
    $("#activationdropdrop").slideUp("slow", function(){});
    $('#activationdrop').text("▼");
  }
}

document.getElementById('toggleswitchsechs').addEventListener('change',function(){
  if(this.checked) {
    store.set('contentprotection', true);
  } else {
    store.set('contentprotection', false);
  }
  $("#restartappdiv").slideDown("slow", function(){});
});

function restartapp(){
  app.relaunch()
  ex();
}

function setDisplayName()
{
  var displayName = store.get("username");
  if(displayName == null || displayName == "" || displayName == undefined)
  {
  }
  else{
    document.getElementById("displayName").value = displayName;
  }
}

setDisplayName();

function changeDisplayName()
{
  store.set("username", document.getElementById("displayName").value)
}