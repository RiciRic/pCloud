console.log('analytics loaded')

const Store = require('./JSfiles/store.js');

const { ipcRenderer } = require('electron');

$("#paniclel").attr('disabled', true);

const BrowserWindow = require('electron').remote.BrowserWindow;
const path = require('path');
const url = require('url');
const electron = require('electron');
const nativeTheme = electron.remote.nativeTheme;
const { app, globalShortcut } = require('electron').remote;

var request = require('request');
const fs = require('fs');

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
    ontop:false,
    blur:true,
    navbaricon:false,
    lock:true,
    lastsett:false,
    backupkey:"",
    eventhome:false,
    eventindex:false,
    eventanalytics:false,
    download:false,
    down:false,
    delcache:false
  }
});

var pwtemp = store.get('pwtemp');
console.log(pwtemp);
store.set('pwtemp','');

var maxim = store.get('max');
var theme = store.get('theme');
var xpos = store.get('x');
var ypos = store.get('y');
var widthvar = store.get('width');
var heightvar = store.get('height');
var ontopvar = store.get('ontop');
var lockvar = store.get('lock');

var bot = "";

var count = 1;
var quitsicherung = true;

pwlel = store.get('list')
let arr = [];
let arrname = [];
let dat = [];
let bgclr = [];
let bgclrzw = [];
let datzero= [];

        if (theme == '1'){
          document.body.classList.add('hell');
        }
        else if(theme == '0'){
          document.body.classList.remove('hell');
          nativeTheme.themeSource = "dark"; 
        }
        else{
          if(nativeTheme.shouldUseDarkColors == true)
          {
            document.body.classList.remove('hell');
            nativeTheme.themeSource = "dark"; 
          }
          else{
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

        if(store.get("eventanalytics") == false)
        {
          ipcRenderer.send('eventanalytics');
          store.set("eventanalytics", true);
        }

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

    $('#topkekle').hover(function(){$('#con').text('Lock Program');},
    function() {$('#con').text(bot);});

    $('#btncancel').hover(function(){$('#con').text('Back to your Passwords');},
    function() {$('#con').text(bot);});

    $('#btnEd').hover(function(){$('#con').text('Settings');},
    function() {$('#con').text(bot);});

    $('#da').hover(function(){document.getElementById("da").style.cursor = "pointer";},
      function() {document.getElementById("da").style.cursor = "initial";});

    if(store.get('download')==true)
    {
      document.getElementById("da").classList.remove('hide');
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


function stern(lel){
  var stern = "";
  for (i = 0; i < lel.length; i++) {
    stern = stern + "*"
  }
  return stern;
}

function anfang(){
  return '<tr><th class="analy"></th><th class="analy"></th><th class="labeltable analy">Titel</th><th class="labeltable analy">Username</th><th class="labeltable analy">Password</th><th class="analy"></th><th class="analy"></th></tr>';
}

function pew(row_id, id, titel, username, password, url, note, count){
  var pw = "";
      pw += '<tr row_id="'+row_id+'" id="tr' + count +'" onmousedown="hoch('+count+')" class="trsh">';
      pw += '<td><div class="labelzwei">'+count+'</div></td>';
      if(decrypt(url) == ""){
        pw += '<td style="user-select: none;"></td>';
      }
      else{
        pw += '<td><img src="https://s2.googleusercontent.com/s2/favicons?domain=' + decrypt(url) + '"></td>';
      }
      pw += '<td><div class="labelzwei" edit_type="click" col_name="tit">' + decrypt(titel) + '</div></td>';
      pw += '<td><div class="labelzwei" edit_type="click" col_name="user">' + decrypt(username) + '</div></td>';
      pw += '<td><div class="labelzwei" edit_type="click" col_name="psw">' + stern(decrypt(password)) + '</div></td>'
      pw += '<td><input type="button" class="buttonzwei effectbuttonanders" id="auge' + id + '" onfocusout="mouseUp()" onmousedown="mouseDown(\'' + decrypt(password) + '\', \'auge' + id + '\')" onmouseup="mouseUp()" value="👁" />' +'</td>';
      var ch = pwcheckAnfang(decrypt(password));
      if(ch < 10){
        pw += '<td><div class="labelzwei" style="color:rgba(234, 0, 0, 1);" edit_type="click" col_name="kak">●</div></td>';
      }
      if(ch >= 10 && ch < 13){
        pw += '<td><div class="labelzwei" style="color:rgba(255, 238, 0, 1);" edit_type="click" col_name="kak">●</div></td>';
      }
      if(ch >= 13){
        pw += '<td><div class="labelzwei" style="color:rgba(71, 218, 71, 1);" edit_type="click" col_name="kak">✔</div></td>';
      }
      
      pw += '</tr>';
      return pw;

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
    ipcRenderer.send('restart_app');
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

//chart
var myChart;
async function chartIt(){
var ctx = document.getElementById('myChart').getContext('2d');
myChart = new Chart(ctx, {
    type: 'line',
    data: {
        labels: arrname,
        datasets: [{
            label: 'Password Value',
            data: dat,
            backgroundColor: bgclr,
            borderColor: 'rgb(1, 138, 230, 1)',
            fill: false,
            lineTension: 0.4,
            borderWidth: 1
        },
        {
          data: datzero,
          label: '',
          pointRadius: 0,
          borderColor: 'rgb(177, 177, 177, 0.6)',
          fill: false,
          lineTension: 0.4,
          borderWidth: 1
      }
        ]
    },
    plugins: {
      datalabels: {
          display: false,
      },
  },
    options: {
      legend: {
        display: false,
     },
     interaction: {
      mode: 'x'
    },
     'onClick' : function (evt, item) {
        if(item.length != 0)
        {
          var itemindex = item[0]._index;
          console.log(itemindex)
          runter(itemindex)
        }
    },
     
        scales: {
            yAxes: [{
              scaleLabel: {
                display: true,
                labelString: 'bad                                                              good'
              },
                ticks: {
                    beginAtZero: false,
                    suggestedMin: -10,
                    suggestedMax: 10
                }
            }],
            xAxes: [{
              ticks: {
                  display: false
              }
          }]
        }
    }
});
}

function runter(index)
{
  index++;
  var elmnt = document.getElementById('tr'+index+'');
  elmnt.scrollIntoView({
    behavior: 'smooth'
  });
  //elmnt.addC
  elmnt.classList.add("trshclick");
  setTimeout(() => {  
    elmnt.classList.remove("trshclick");
   }, 1500);
  
}

var hochsperre = false;
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


function getLower(wert) {
  var lower = 97;
  var i;
  for (i = lower; i < 123; i++) {
    if(String.fromCharCode(i) == wert)
    {
      return true;
    }
  }
  return false;
}

function getUpper(wert) {
  var lower = 65;
  var i;
  for (i = lower; i < 91; i++) {
    if(String.fromCharCode(i) == wert)
    {
      return true;
    }
  }
  return false;
}

function getNumber(wert) {
  var lower = 48;
  var i;
  for (i = lower; i < 58; i++) {
    if(String.fromCharCode(i) == wert)
    {
      return true;
    }
  }
  return false;
}

function getSymbol(wert) {
  var symbol = ['!', '@','#', '$','%', '^','&', '*','(', ')','{', '}','[', ']','=', '<', '>', '/', ',', '', '.'];
	for (i = 0; i < symbol.length; i++) {
    if(symbol[i] == wert)
    {
      return true;
    }
  }
  return false;
}

function pwCheck(wort){
  var i;
  var lower=false;
  var upper=false;
  var number=false;
  var symbol=false;
  sheesh = 0;
  for (i = 0; i < wort.length; i++) {
    if(lower == false)
    {
      lower = getLower(wort.charAt(i));
    }
    if(upper == false)
    {
      upper = getUpper(wort.charAt(i));
    }
    if(number == false)
    {
      number = getNumber(wort.charAt(i));
    }
    if(symbol == false)
    {
      symbol = getSymbol(wort.charAt(i));
    }
  }
  if(lower == true)
    {
      sheesh += 3;
    }
    if(upper == true)
    {
      sheesh += 3;
    }
    if(number == true)
    {
      sheesh += 4;
    }
    if(symbol == true)
    {
      sheesh += 4;
    }

    if (wort.length > 8)
    {
      sheesh += 3;
    }

    if (wort.length > 13)
    {
      sheesh += 3;
    }
    if (wort.length == 1)
    {
      sheesh = 0;
    }
    if (wort.length == 2)
    {
      sheesh = 1;
    }
    if (wort.length > 25)
    {
      if(sheesh <= 17)
      {
        sheesh += 3;
      }
    }
    if (wort.length > 35)
    {
      if(sheesh <= 18)
      {
        sheesh += 2;
      }
    }
    
    if(sheesh < 10){

      bgclr.push('rgba(234, 0, 0, 1)')
      bgclrzw.push('rgba(234, 0, 0, 1)')
    }
    if(sheesh >= 10 && sheesh < 13){
      bgclr.push('rgba(255, 238, 0, 1)')
      bgclrzw.push('rgba(0, 153, 255, 1)')
    }
    if(sheesh >= 13){
      bgclr.push('rgba(71, 218, 71, 1)')
      bgclrzw.push('rgba(71, 218, 71, 1)')
    }
    return sheesh;
}

function pwcheckAnfang(wort){
  var i;
  var lower=false;
  var upper=false;
  var number=false;
  var symbol=false;
  sheesh = 0;
  for (i = 0; i < wort.length; i++) {
    if(lower == false)
    {
      lower = getLower(wort.charAt(i));
    }
    if(upper == false)
    {
      upper = getUpper(wort.charAt(i));
    }
    if(number == false)
    {
      number = getNumber(wort.charAt(i));
    }
    if(symbol == false)
    {
      symbol = getSymbol(wort.charAt(i));
    }
  }
  if(lower == true)
    {
      sheesh += 3;
    }
    if(upper == true)
    {
      sheesh += 3;
    }
    if(number == true)
    {
      sheesh += 4;
    }
    if(symbol == true)
    {
      sheesh += 4;
    }

    if (wort.length > 8)
    {
      sheesh += 3;
    }

    if (wort.length > 13)
    {
      sheesh += 3;
    }
    if (wort.length == 1)
    {
      sheesh = 0;
    }
    if (wort.length == 2)
    {
      sheesh = 1;
    }
    if (wort.length > 25)
    {
      if(sheesh <= 17)
      {
        sheesh += 3;
      }
    }
    if (wort.length > 35)
    {
      if(sheesh <= 18)
      {
        sheesh += 2;
      }
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
  var i;
  for(i=0;i<bgclr.length;i++)
    {
      console.log(bgclr[i]);
    }
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
  var y = window.scrollY + document.querySelector('#'+id+'').getBoundingClientRect().top -6// Y
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

  ipcRenderer.on('download', (event, arg) => {
    store.set('download',true);
  });

  ipcRenderer.on('downloaded', (event, arg) => {
    store.set('down',true);
  });