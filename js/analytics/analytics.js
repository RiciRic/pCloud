console.log('analytics loaded')

const store = require('./js/storedata.js');
const init = require('./js/analytics/init.js');
const {anfang, pew} = require('./js/analytics/table.js');
const chartIt = require('./js/analytics/chart.js');
const initIpcRenderer = require('./js/analytics/ipcRenderer.js');

const {colorred, coloryellow, colorgreen} = require('./js/analytics/color.js');

const encryptModule = require('./js/modules/encrypt.js');
const decryptModule = require('./js/modules/decrypt.js');
const pwcheckAnfang = require('./js/modules/checkPassword.js');

const { ipcRenderer } = require('electron');

$("#paniclel").attr('disabled', true);

const BrowserWindow = require('electron').remote.BrowserWindow;
const path = require('path');
const url = require('url');
const electron = require('electron');
const nativeTheme = electron.remote.nativeTheme;
const { app, globalShortcut } = require('electron').remote;

init();
initIpcRenderer();

var pwtemp = store.get('pwtemp');
store.set('pwtemp','');

var maxim = store.get('max');
var xpos = store.get('x');
var ypos = store.get('y');
var widthvar = store.get('width');
var heightvar = store.get('height');
var lockvar = store.get('lock');

var count = 1;
var quitsicherung = true;

pwlel = store.get('list')
let arr = [];
let arrname = [];
let dat = [];
let bgclr = [];
let bgclrzw = [];
let datzero= [];

//chart
var myChart;
var hochsperre = false;
      

    function anf(){
      var pw = anfang();
      var i = 0;
      for(i=0; i<pwlel.length;i++){
  
        var row_id = random_id();
        var id = pwlel[i].id;
        const titel = pwlel[i].titel;
        var username = pwlel[i].username;
        var password = pwlel[i].password;
        var url = pwlel[i].url;
        var note = pwlel[i].note;
  
        if(pwlel[i].id > 0)
        {
          pw += pew(row_id, id, titel, username, password, url, note, count);
          arr.push(count);
          arrname.push(count+" | "+decrypt(titel));
          dat.push(pwCheck(decrypt(password))-10);
          datzero.push(0);
          count = count + 1;
        }
      
      }
      $('#passwort').append(pw);
      $('#coun').text(count-1 + ' Passwords');
      chartIt();
    }
    anf();

    function random_id(){
      var id_str = Math.random().toString(36).substr(2);
      return id_str;
    }

    if(store.get('download')==true)
    {
      document.getElementById("da").classList.remove('hide');
    }

function encrypt(text)
{
  return encryptModule(text, pwtemp);
}

function decrypt(text)
{
  return decryptModule(text, pwtemp);
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

function pwCheck(wort){
    var sheesh = pwcheckAnfang(wort);
    if(sheesh < 10){

      bgclr.push(colorred)
      bgclrzw.push(colorred)
    }
    if(sheesh >= 10 && sheesh < 13){
      bgclr.push(coloryellow)
      bgclrzw.push(coloryellow)
    }
    if(sheesh >= 13){
      bgclr.push(colorgreen)
      bgclrzw.push(colorgreen)
    }
    return sheesh;
}

function canc(){
  store.set('pwtemp',pwtemp);
  const { shell } = window.require('electron');
  var element = document.getElementById("containerid");
  element.classList.add("animateLeft");
  var elementzwei = document.getElementById("btncancel");
  elementzwei.classList.add("animateLeft");
  var elementvier = document.getElementById("scrollbar-customdrei");
  elementvier.classList.add("animateLeft");
  var elementdrei = document.getElementById("tit");
  elementdrei.classList.add("animateLeft");
  let remote = require('electron').remote;
  const winAnalytics = remote.getCurrentWindow();
  parentWindow.removeAllListeners('resize');
  parentWindow.removeAllListeners('focus');
    parentWindow.removeAllListeners('blur');
    parentWindow.removeAllListeners('unmaximize');
    parentWindow.removeAllListeners('maximize');
    /*ipcRenderer.removeAllListeners('restart_app');
    ipcRenderer.removeAllListeners('exit');
    ipcRenderer.removeAllListeners('download');
    ipcRenderer.removeAllListeners('downloaded');*/
    ipcRenderer.removeAllListeners();
  winAnalytics.loadURL(url.format( {
    pathname: path.join(__dirname, 'home.html'),
    protocol: 'file',
    slashes: true

  }))
}

function sett(){
  store.set('pwtemp',pwtemp);
  const { shell } = window.require('electron');
  var element = document.getElementById("containerid");
  element.classList.add("animateLeft");
  var elementdrei = document.getElementById("btnEd");
  elementdrei.classList.add("animateLeft");
  var elementvier = document.getElementById("scrollbar-customdrei");
  elementvier.classList.add("animateLeft");
  let remote = require('electron').remote;
  const winAnalytics = remote.getCurrentWindow();
  parentWindow.removeAllListeners('resize');
  parentWindow.removeAllListeners('focus');
  parentWindow.removeAllListeners('blur');
  parentWindow.removeAllListeners('unmaximize');
  parentWindow.removeAllListeners('maximize');
  winAnalytics.loadURL(url.format( {
    pathname: path.join(__dirname, 'settings.html'),
    protocol: 'file',
    slashes: true

  }))
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

function mouseUp(){
  hochsperre = false;
  document.getElementById("context-menu").classList.remove("active");
}

function mouseDown(text, id){
  hochsperre = true;
  var laenge = text.length;
  var extr = 0;
  var min = 0;
  if(laenge > 14)
  {
    
    min = laenge - 14;
    var i = 0;
    for(i=0;i<min;i++)
    {
      extr += 6;
    }
  }
  
  document.getElementById('cont').innerHTML = text;
  event.preventDefault();
  var contextElement = document.getElementById("context-menu");
  var y = window.scrollY + document.querySelector('#'+id+'').getBoundingClientRect().top -7// Y
  var x = window.scrollX + document.querySelector('#'+id+'').getBoundingClientRect().left - 145 - extr// X
  var sh = 150 + extr;
  var kek = "";
  kek = sh.toString() + "px";
  contextElement.style.width = kek;
  contextElement.style.top = y + "px";
  contextElement.style.left = x + "px";
  contextElement.classList.add("active");
}

window.addEventListener("click",function(){
  document.getElementById("context-menu").classList.remove("active");
});

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
    icon: 'pictures/icon.png',
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

const { remote } = require('electron');
  let parentWindow = remote.getCurrentWindow();
  
  function once(){
    const bounds = parentWindow.getSize();
    document.getElementById("scrollbar-customdrei").style.height = bounds[1]-90 +"px";
  }
  once();
  
  parentWindow.on('resize', function() {
    const bounds = parentWindow.getSize();
    document.getElementById("scrollbar-customdrei").style.height = bounds[1]-90 +"px";
  });

function hoch(count)
{
  if(hochsperre == false)
  {
    count = count-1;
    var elmnt = document.getElementById("containerid");
    elmnt.scrollIntoView({
      behavior: 'smooth'
    });
    var tmp = bgclr[count];
    var i;
    bgclr[count] = "rgb(1, 138, 230)";
      myChart.update();
      setTimeout(() => {  
        bgclr[count] = tmp;
        myChart.update();
      }, 2000);
  }
}