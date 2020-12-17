console.log('renderer loaded')

const Store = require('./JSfiles/store.js');

const BrowserWindow = require('electron').remote.BrowserWindow;
const path = require('path');
const url = require('url');
const electron = require('electron');
const Menu = electron.Menu;
const MenuItem = electron.MenuItem;

var maxim = false;

const nativeTheme = electron.remote.nativeTheme; 


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


const contextMenu = require('electron-context-menu');

            contextMenu({
                prepend: (params, browserWindow) => [
                    {
                        role: "selectAll",
                        visible: params.mediaType === 'text'
                    },
                ],
                showInspectElement:false
            });

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


weiterbtn.addEventListener('click', (e) => {
    input();
});

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
  try {
    var le = decrypt(store.get('pw'));
  }
  catch(err) {
    document.getElementById("pw").value = "";

    var element = document.getElementById("pw");
    element.classList.remove("anfanglog");
    element.classList.add("rotborder");
    setTimeout(() => { 
    element.classList.remove("rotborder");
    element.classList.add("anfanglog");
    }, 1500);
    console.log("LELE");
  }

if(pwtemp == le)
{
  var tokenle = decrypt(store.get('dropboxtoken'));
  var urlle = decrypt(store.get('dropboxurl'));
  if(tokenle != 0 && urlle != 0)
  {
  store.set('pwtemp', pwtemp);
  winHome = new BrowserWindow({
    width: widthvar,
    height: heightvar,
    minWidth:700,
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
      preload: path.join(__dirname, 'JSfiles/preload.js')
    }
    
  })

  winHome.loadURL(url.format( {
    pathname: path.join(__dirname, 'home.html'),
    protocol: 'file',
    slashes: true

  }))

  winHome.once('ready-to-show', () => {
    winHome.show()
    window.close()

  })

  //winHome.webContents.openDevTools()

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

function renduhaha(){
  document.getElementById("pw").value = "";

  var element = document.getElementById("pw");
  element.classList.add("rotborder");
  element.classList.remove("anfanglog");
  setTimeout(() => { 
  element.classList.remove("rotborder");
  element.classList.add("anfanglog");
  }, 2000);
  console.log("LELE");
}

function moinmeister(){
  store.set('pw','');
  store.set('pwtemp','');
  store.set('dropboxtoken','');
  store.set('dropboxurl','');
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

function okaysk(){
  //document.getElementById("drei").classList.add("hide");
  //document.getElementById("eins").classList.remove("hide");
  if(store.get('dropboxtoken') != "" && store.get('dropboxurl') != "")
  {
    store.set('pwtemp', pwtemp);
    winHome = new BrowserWindow({
    width: widthvar,
    height: heightvar,
    minWidth:700,
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
      preload: path.join(__dirname, 'JSfiles/preload.js')
    }
    
  })

  winHome.loadURL(url.format( {
    pathname: path.join(__dirname, 'home.html'),
    protocol: 'file',
    slashes: true

  }))

  winHome.once('ready-to-show', () => {
    winHome.show()
    window.close()

  })
  }
  else{
    if(store.get('dropboxtoken') == "")
    {
      var element = document.getElementById("droptok");
      element.classList.add("rotborder");
      setTimeout(() => {
        var element = document.getElementById("droptok");
        element.classList.remove("rotborder");
      }, 2000);
    }
    else{
      var element = document.getElementById("dropurl");
      element.classList.add("rotborder");
      setTimeout(() => {
        var element = document.getElementById("dropurl");
        element.classList.remove("rotborder");
      }, 2000);
    }

  }

}

require('electron').remote.getCurrentWindow().on('focus', () => {
  var contextElement = document.getElementById("sklel");
  contextElement.classList.remove("navbaroffle");
})

require('electron').remote.getCurrentWindow().on('blur', () => {
  var contextElement = document.getElementById("sklel");
  contextElement.classList.add("navbaroffle");
})

let winCloud;

function erstmal(){
  let remote = require('electron').remote;

  store.set('pwtemp',pwtemp);
  store.set('indexclose', true);
  
  let wind = new BrowserWindow({
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

  wind.loadURL(url.format( {
    pathname: path.join(__dirname, 'DropbCloud.html'),
    protocol: 'file',
    slashes: true

  }))

  //wind.webContents.openDevTools()

  const {shell} = require('electron');
  shell.openItem('https://dropbox.com/developers/apps');
  window.close();
}





  
  
      
  
      
      
      
      
