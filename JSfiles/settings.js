console.log('settings loaded')

const Store = require('./JSfiles/store.js');

$("#paniclel").attr('disabled', true);

const BrowserWindow = require('electron').remote.BrowserWindow;
const path = require('path');
const url = require('url');
const axios = require('axios');
const electron = require('electron');
const nativeTheme = electron.remote.nativeTheme;

var request = require('request');
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

const store = new Store({
  configName: 'user-preferences',
  defaults: {
    theme:"0",
    pw:"",
    pwtemp:"",
    list:[],
    x:455,
    y:269,
    width:700,
    height:500,
    dropdown:0,
    favbtn:0,
    max:false,
    indexclose:false,
    dropboxtoken:"",
    dropboxurl:"",
    ontop:false,
    blur:true,
    navbaricon:false,
    lock:true,
    lastsett:false,
    backupkey:""
  }
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

var sicherung = false;
var pwlel = [];
var pwtempzwei;

var quitsicherung = true;

var pwtemp = store.get('pwtemp');
console.log(pwtemp);
store.set('pwtemp','');


var bot = "ಠ_ಠ";

let winCloud;

const { app, globalShortcut } = require('electron').remote;

app.whenReady().then(() => {
  const ret = globalShortcut.register('Shift+X', () => {
    console.log('CommandOrControl+X is pressed')
  })

  if (!ret) {
    console.log('registration failed')
  }

  console.log(globalShortcut.isRegistered('Shift+X'))
})

app.on('will-quit', () => {
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
        
        if (theme == '1'){
          $("#btnhell").css("display","none");
          document.body.classList.add('hell');
        }
        else if(theme == '0'){
          $("#btndunkel").css("display","none");
          document.body.classList.remove('hell');
          nativeTheme.themeSource = "dark"; 
        }
        else{
          if(nativeTheme.shouldUseDarkColors == true)
          {
            $("#btnsystem").css("display","none");
            document.body.classList.remove('hell');
            nativeTheme.themeSource = "dark"; 
          }
          else{
            $("#btnsystem").css("display","none");
            document.body.classList.add('hell');
            nativeTheme.themeSource = "light"; 
          }
        }
      

      if(ontopvar == true){
        let remote = require('electron').remote;
        document.getElementById("topkek").value = "●";
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

      if(lockvar == true){
        var checkbox = document.getElementById('toggleswitchdrei');
        checkbox.checked = !checkbox.checked;
    }

$(document).ready(function(){

});     
      
      $('#droptok').hover(function(){$('#con').text('Token');},
      function() {$('#con').text(bot);});
      $('#dropurl').hover(function(){$('#con').text('URL');},
      function() {$('#con').text(bot);});

      $('#tokenshow').hover(function(){$('#con').text('Show current Token');},
      function() {$('#con').text(bot);});
      $('#urlshow').hover(function(){$('#con').text('Show current Url');},
      function() {$('#con').text(bot);});

      $('#urluse').hover(function(){$('#con').text('Use URL');},
      function() {$('#con').text(bot);});

      $('#tokenuse').hover(function(){$('#con').text('Use Token');},
      function() {$('#con').text(bot);});

      $('#currpw').hover(function(){$('#con').text('Enter Current Password');},
      function() {$('#con').text(bot);});

      $('#pwenter').hover(function(){$('#con').text('Okay');},
      function() {$('#con').text(bot);});

      $('#resetbounds').hover(function(){$('#con').text('Reset Bounds');},
      function() {$('#con').text(bot);});

      $('#btnqrcode').hover(function(){$('#con').text('Show QR Code');},
      function() {$('#con').text(bot);});

      $('#titelnullb').hover(function(){$('#con').text('Cloud');},
      function() {$('#con').text(bot);});

      $('#titelvierb').hover(function(){$('#con').text('Password');},
      function() {$('#con').text(bot);});

      $('#titeleinsb').hover(function(){$('#con').text('Theme');},
      function() {$('#con').text(bot);});

      $('#titelzweib').hover(function(){$('#con').text('General Settings');},
      function() {$('#con').text(bot);});

      $('#titeldreib').hover(function(){$('#con').text('QR Code');},
      function() {$('#con').text(bot);});

      $('#titelfuenfb').hover(function(){$('#con').text('Backup');},
      function() {$('#con').text(bot);});

      $('#versuchle').hover(function(){$('#con').text('Jump Up');},
      function() {$('#con').text(bot);});

      $('#versuchlele').hover(function(){$('#con').text('Jump Down');},
      function() {$('#con').text(bot);});

      $('#arrlinks').hover(function(){$('#con').text('Show Icon');},
      function() {$('#con').text(bot);});

      $('#arrrechts').hover(function(){$('#con').text('Show Title');},
      function() {$('#con').text(bot);});

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
  

    $('#min-btn').hover(function(){$('#con').text('Minimize');},
    function() {$('#con').text(bot);});
  
  $('#close-btn').hover(function(){$('#con').text('Exit');},
    function() {$('#con').text(bot);});

    $('#btncancel').hover(function(){$('#con').text('Back to your Passwords');},
    function() {$('#con').text(bot);});

    $('#switchdamn').hover(function(){$('#con').text('Enable or Disable Panicbutton!');},
    function() {$('#con').text(bot);});

    $('#paniclel').hover(function(){$('#con').text('This Button deletes all your Passwords');},
    function() {$('#con').text(bot);});

    $('#btncheck').hover(function(){$('#con').text('Check for Updates');},
    function() {$('#con').text(bot);});

    $('#btnhell').hover(function(){$('#con').text('Change Theme to Lightmode');},
    function() {$('#con').text(bot);});

    $('#btnsystem').hover(function(){$('#con').text('Change Theme to System');},
    function() {$('#con').text(bot);});

    $('#btndunkel').hover(function(){$('#con').text('Change Theme to Darkmode');},
    function() {$('#con').text(bot);});

    $('#topkekle').hover(function(){$('#con').text('Lock Program');},
    function() {$('#con').text(bot);});

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
  window.close();
}
else{
  $('#con').text('Working.. Please wait');
  setTimeout(() => {  $('#con').text(bot); }, 2000);
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

function qrcodefunc(){
  var textqr = '[{"pw":"'+ decrypt(store.get("pw"))+'", "droptoken":"'+ store.get("dropboxtoken")+'", "dropurl":"'+ store.get("dropboxurl")+'", "theme":"'+ store.get("theme")+'", "backupkey":"'+ store.get("backupkey")+'"}]';
  var encrypted = CryptoJS.AES.encrypt(textqr, "pCloudSettings");
  textqr = encrypted.toString();
  var QRCode = require('qrcode')
  var canvas = document.getElementById('canvas')
 
  QRCode.toCanvas(canvas, textqr, function (error) {
    if (error) console.error(error)
    console.log('success!');
  })
}

function downloadzip(){
  //const request = require('request');
  //var fileUrl = "https://www.dropbox.com/s/24k11ijnyva92tz/sheesh.zip?dl=1";

  //var fileUrl = "https://www.dropbox.com/s/15zimv6mvo7n0o0/1.jpg?dl=1";
  //axios.get("https://www.dropbox.com/s/gu89ibrva5hvnu8/version.json?dl=1")
  axios.get("https://www.dropbox.com/s/24k11ijnyva92tz/sheesh.zip?dl=1", {responseType: 'blob',headers:{'Content-Type': 'application/json; application/octet-stream'}})
  .then((response) => {
    var she = response.data;
    //console.log(she);
  }).catch((err) => {
  })
}

function erstmal(){
  let remote = require('electron').remote;

  store.set('pwtemp',pwtemp);
  
  let winSettings = new BrowserWindow({
    width: 310,
    height: 290,
    parent: winCloud,
    alwaysOnTop: true,
    frame: false,
    icon: 'pictures/icon.ico',
    contextIsolation: true,
    
    webPreferences: {
      nodeIntegration: true,
      preload: path.join(__dirname, 'JSfiles/preload.js')
    }
  })
  
  

  winSettings.loadURL(url.format( {
    pathname: path.join(__dirname, 'DropbCloud.html'),
    protocol: 'file',
    slashes: true

  }))
  winSettings.webContents.openDevTools()

  const {shell} = require('electron');
shell.openItem('https://dropbox.com/developers/apps');
  
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

function dropseturl(){
  const drop = document.getElementById("dropurl").value;
  if(drop == "")
  {
    $('#con').text('Enter a valid URL!');
    var element = document.getElementById("dropurl");
    element.classList.add("rotborder");
    setTimeout(() => {  $('#con').text(bot); 
    var element = document.getElementById("dropurl");
    element.classList.remove("rotborder");
    }, 2000);
  }
  else
  {
    var end = drop.charAt(drop.length-1);
    if(end == "0")
    {
      droplel = drop.substr(0, drop.length-1);
      droplel = droplel + "1";
    }
    store.set('dropboxurl',encrypt(droplel));
    document.getElementById("dropurl").value = "";
  }
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
    element.classList.add("blau");
    store.set('ontop', true);
  }
  else{
    document.getElementById("topkek").value = "○";
    remote.getCurrentWindow().setAlwaysOnTop(false, 'screen');
    var element = document.getElementById("topkek");
    element.classList.remove("blau");
    store.set('ontop', false);
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
  var elmnt = document.getElementById("versuchlelediv");
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
      preload: path.join(__dirname, 'JSfiles/preload.js')
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
  boundslele();
}

//UPLOAD

function uploadFile(fil){
  var dropboxToken = store.get('dropboxtoken');
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

    var dropboxUrl = store.get('dropboxurl');
    dropboxUrl = decrypt(dropboxUrl);
    store.set('dropboxurl',encryptzwei(dropboxUrl))

    pwtemp = pwtempzwei;
    pwtempzwei = "";

    var element = document.getElementById("chpweins");
    element.classList.remove("hide");
    var element = document.getElementById("chpwzwei");
    element.classList.add("hide");
    document.getElementById("currpw").value = "";
    
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
  var dropburl = store.get('dropboxurl');
  dropburl = decrypt(dropburl);
  axios.get(dropburl)
.then((response) => {
var she = response.data;
pwlel = she;
$('#con').text('Ready to Change Password');
sicherung = false;
}).catch((err) => {
console.log('no');
$('#con').text('No Connection to Cloud');
sicherung = false;
})
}

function showchangepw(){
  var pwversuch = document.getElementById('currpw').value;
  if(pwtemp == pwversuch)
  {
    $('#con').text('Downloading..');
    var element = document.getElementById("chpweins");
    element.classList.add("hide");
    var element = document.getElementById("chpwzwei");
    element.classList.remove("hide");
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

      amk += '{"id":"'+id+'", "fav":"'+fav+'", "titel":"'+titel+'","username":"'+username+'","password":"'+password+'","url":"'+url+'","note":"'+note+'"}';
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

  var lelelele = document.getElementById("encryptionkey").value;
  if(lelelele == "")
  {
    lelelele = decrypt(store.get('backupkey'));
    if(lelelele == "")
    {
      lelelele = createenKey();
      store.set('backupkey',encrypt(lelelele));
    }
  }

  var i = 0;
  for(i=0;i< obj.length;i++)
    {
      obj[i].titel = decryptkey(obj[i].titel, lelelele);
      obj[i].titel = encrypt(obj[i].titel);
      obj[i].username = decryptkey(obj[i].username, lelelele);
      obj[i].username = encrypt(obj[i].username);
      obj[i].password = decryptkey(obj[i].password, lelelele);
      obj[i].password = encrypt(obj[i].password);
      obj[i].url = decryptkey(obj[i].url, lelelele);
      obj[i].url = encrypt(obj[i].url);
      obj[i].note = decryptkey(obj[i].note, lelelele);
      obj[i].note = encrypt(obj[i].note);
    }
    
  console.log(obj);
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

  const files = dialog.showSaveDialogSync(null, {
    title: "Save Backup File",
    buttonLabel: "Save Backup",
    defaultPath : "backup",
    properties: ['openFile'],
    filters: [{name:'JSON', extensions: ['json'] },]
  });

  if(!files) return;

  var lelelele = document.getElementById("encryptionkey").value;
  if(lelelele == "")
  {
    lelelele = decrypt(store.get('backupkey'));
    if(lelelele == "")
    {
      lelelele = createenKey();
      store.set('backupkey',encrypt(lelelele));
    }
  }

  
  var amk = "[\n"
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

      amk += '{"id":"'+id+'", "fav":"'+fav+'", "titel":"'+titel+'","username":"'+username+'","password":"'+password+'","url":"'+url+'","note":"'+note+'"}';
      if(i < len2){
        amk += ",\n";
      }
      else{
       amk += "\n";
      }
    }
    amk += "]";

    console.log(amk);

  fs.writeFileSync(files, amk, 'utf-8');
  console.log("fertig");

}

function getVerzwei(){
  var dropburl = store.get('dropboxurl');
  $('#con').text('Loading..');
  dropburl = decrypt(dropburl);
  axios.get(dropburl)
.then((response) => {
var she = response.data;
pwlel = she;
$('#con').text('Downloaded');
console.log(pwlel);
savebackup();
sicherung = false;
}).catch((err) => {
console.log('no');
$('#con').text('No Connection to Cloud');
sicherung = false;
})
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

const powerMonitor = electron.remote.powerMonitor; 

powerMonitor.on('lock-screen', () => { 
  if(lockvar == true){
    lock();
  }
}); 

function credits(){
  var dt = new Date();
  document.getElementById('creditlabel').innerHTML = 'Copyright © ' + dt.getFullYear() + ' Ricardo Matos';
  document.getElementById("cred").classList.remove("hide");
  document.getElementById("cred").classList.add("containerlezwei");
  document.getElementById("cred").classList.remove("containerremove");
  //$("#cred").fadeIn(1000);
  //$("#cred").fadeIn("slow");
}

function closecredits(){
  document.getElementById("cred").classList.remove("containerlezwei");
  document.getElementById("cred").classList.add("containerremove");
  setTimeout(() => {  document.getElementById("cred").classList.add("hide"); }, 600);
  //$("#cred").fadeOut(1000);
  //$("#cred").fadeOut("slow");
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

function dropshowurl(){
  document.getElementById("dropurl").value = decrypt(store.get('dropboxurl'));
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

var holdurl = false;
function holddropurl(){
  if(holdurl == false)
  {
    holdurl = true;
    document.getElementById("urlshow").value = "x";
  }
  else{
    holdurl = false;
    document.getElementById("urlshow").value = "•";
  }
}

function leavedroptok(){
  if(holdtok == false)
  {
    document.getElementById("droptok").value = "";
    holdtok = false;
  }
}

function leavedropurl(){
  if(holdurl == false)
  {
    document.getElementById("dropurl").value = "";
    holdurl = false;
  }
}