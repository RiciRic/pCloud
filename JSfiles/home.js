console.log('home loaded')
const Store = require('./JSfiles/store.js');

const { ipcRenderer } = require('electron');

const { shell } = window.require('electron');
const { BrowserWindow, systemPreferences } = require('electron')
const fs = require('fs');

const axios = require('axios');
const electron = require('electron');
const path = require('path');
const url = require('url');
const { app, globalShortcut } = require('electron').remote;

var request = require('request');

const nativeTheme = electron.remote.nativeTheme; 

var sicherung = true;
var onclvar = false;

var vorhersaven = false;

var idkvar = false;
var idkcount = 0;


const contextMenu = require('electron-context-menu');
const { SSL_OP_NETSCAPE_REUSE_CIPHER_CHANGE_BUG, SSL_OP_NO_SESSION_RESUMPTION_ON_RENEGOTIATION } = require('constants');

            contextMenu({
                prepend: (params, browserWindow) => [
                  {
                    role: "selectAll",
                    visible: params.mediaType === 'text'
                },
                ],
                showInspectElement:false
            });

var bot = "";

var edit = false;

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
console.log("pwtemp: " + pwtemp);
store.set('pwtemp','');
console.log("pwtemp: " + store.get('pwtemp'));

var maxim = store.get('max');
var theme = store.get('theme');
var ver = store.get('version');
var xpos = store.get('x');
var ypos = store.get('y');
var widthvar = store.get('width');
var heightvar = store.get('height');
var dropdown = store.get('dropdown');
var favbtn = store.get('favbtn');
var ontopvar = store.get('ontop');
var blurvar = store.get('blur');
var lockvar = store.get('lock');
var lastsettvar = store.get('lastsett');

    if(lastsettvar == true){
      var element = document.getElementById("btnEd");
      element.classList.add("containerle");
      store.set('lastsett',false);
    }

    if (theme == '1'){
      document.body.classList.add('hell');
      nativeTheme.themeSource = "light"; 
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

    if (dropdown == 1){
      document.getElementById("slt").selectedIndex = "1";
    }
        
        if (favbtn == '0'){
          document.getElementById("favbutton").value = "☆";
        }
        else{
          document.getElementById("favbutton").value = "★";
          var element = document.getElementById("favbutton");
          element.classList.add("blau");
        }

        if(store.get("eventhome") == false)
        {
          ipcRenderer.send('eventhome');
          store.set("eventhome", true);
        }

        document.getElementById("svglelid").style.height = heightvar + "px";
        document.getElementById("svglelid").style.width = widthvar + "px";

var pwlel = [];

var indexsheesh = "";
var currentfav = "";
var row_index;

var pwkey = 1;

var quitsicherung = true;

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

var random_id = function(){
  var id_str = Math.random().toString(36).substr(2);
  return id_str;
}

var count = 0;

$(document).ready(function(){

  if(maxim == true)
{
  let remote = require('electron').remote;
  remote.BrowserWindow.getFocusedWindow().maximize();
  document.getElementById("max-btn").value = "🗗︎";
}

$("#ed").click(function(){
  row_index = $(this).parent('table').index();
});

  $("#save").click(function(){
    if(pwkey == 1)
    {
      
      $('#bg-modal').animate({
        opacity: 1
    }, 'swing');

    $('#bg-modal').css("z-index", "9997");

      document.getElementById("txtusername").disabled = false;
      var element = document.getElementById("txtusername");
      element.classList.add("effectkreislel");
    }
    else
    {

      $('#bg-modal').animate({
        opacity: 1
    }, 'swing');

    $('#bg-modal').css("z-index", "9999");
      
      $("#bg-modal").velocity('fadeIn', {duration: 100, display: 'flex'});
      document.getElementById("txtpassword").placeholder = "Key";
      document.getElementById("txtusername").placeholder = "";
      document.getElementById("txtusername").disabled = true;
      var element = document.getElementById("txtusername");
      element.classList.remove("effectkreislel");

    }
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

      $('#sh').hover(function(){
        var ch = document.getElementById("txtpassword").type;
        if(ch == "password")
        {
          $('#con').text('Show Password');
        }
        else{
          $('#con').text('Hide Password');
        }
      },
        function() {$('#con').text(bot);});

    $('#gen').hover(function(){$('#con').text('Generate Password');},
    function() {$('#con').text(bot);});

    $('#ed').hover(function(){$('#con').text('Edit');},
    function() {$('#con').text(bot);});

  $('#min-btn').hover(function(){$('#con').text('Minimize');},
    function() {$('#con').text(bot);});
  
  $('#close-btn').hover(function(){$('#con').text('Exit');},
    function() {$('#con').text(bot);});

    $('#favoritebtn').hover(function(){$('#con').text('Flag as Favorite');},
    function() {$('#con').text(bot);});

    $('#da').hover(function(){document.getElementById("da").style.cursor = "pointer";},
      function() {document.getElementById("da").style.cursor = "initial";});

    if(store.get('download')==true)
    {
      document.getElementById("da").classList.remove('hide');
    }

  $('#save').hover(function(){
    const slt = document.getElementById('slt');
    if(slt.value == "Passwort"){
      $('#con').text('Add Password');
    }
    else{
      $('#con').text('Add Key');
    }
    },
    function() {$('#con').text(bot);});

    $('#favbutton').hover(function()
    {
      if(favbtn == '0')
      {
        const slt = document.getElementById('slt');
        if(slt.value == "Passwort")
        {
          $('#con').text('Show only favorite Passwords');
        }
        else{
          $('#con').text('Show only favorite Keys');
        }
      }
      else{
        const slt = document.getElementById('slt');
        if(slt.value == "Passwort")
        {
          $('#con').text('Show all Passwords');
        }
        else{
          $('#con').text('Show all Keys');
        }
      }
    },
    function() {$('#con').text(bot);});

    $('#saverly').hover(function(){
      if(edit == true)
      {
        $('#con').text('Edit');
      }
      else{
        $('#con').text('Add');
      }
    },
    function() {$('#con').text(bot);});

    $('#qr').hover(function(){$('#con').text('Create QR Code for Password');},
    function() {$('#con').text(bot);});

    $('#cancel').hover(function(){$('#con').text('Cancel');},
    function() {$('#con').text(bot);});

    $('#delsearch').hover(function(){$('#con').text('Clear Search');},
    function() {$('#con').text(bot);});

    $('#relobut').hover(function(){$('#con').text('Refresh');},
    function() {$('#con').text(bot);});

    $('#reset').hover(function(){$('#con').text('Reset Changes');},
    function() {$('#con').text(bot);});

    $('#rlsave').hover(function(){$('#con').text('Save Changes');},
    function() {$('#con').text(bot);});

    $('#ana').hover(function(){$('#con').text('Charts and Stuff');},
    function() {$('#con').text(bot);});

  $('#search').hover(function(){$('#con').text('Search');},
    function() {$('#con').text(bot);});

  $('#searchbtn').hover(function(){$('#con').text('Search');},
    function() {$('#con').text(bot);});

  $('#lel').hover(function(){$('#con').text('Change Table');},
    function() {$('#con').text(bot);});

  $('#txttitel').hover(function(){$('#con').text('Titel');},
    function() {$('#con').text(bot);});

  $('#txtusername').hover(function(){$('#con').text('Username');},
    function() {$('#con').text(bot);});

  $('#txtpassword').hover(function(){$('#con').text('Password');},
    function() {$('#con').text(bot);});

  $('#txturl').hover(function(){$('#con').text('Url');},
    function() {$('#con').text(bot);});

  $('#txtnote').hover(function(){$('#con').text('Note');},
    function() {$('#con').text(bot);});

    $('#topkekle').hover(function(){$('#con').text('Lock Program');},
    function() {$('#con').text(bot);});

  $('#btnEd').hover(function(){$('#con').text('Settings');},
    function() {$('#con').text(bot);});

    $('.table-row').hover(function() {             
			$(this).addClass('current-row');
		}, function() {
			$(this).removeClass('current-row');
    });
    
    $(document).on('click',".btn_row_delete", function(e)
    {
      var r = $(this).closest('tr').remove();
      count -= 1;
      const slt = document.getElementById('slt');
      if(slt.value == "Passwort"){
        $('#coun').text(count + ' Passwords');
      }
      else{
        $('#coun').text(count + ' Keys');
      }

    });

    //---------------SHEEEEEESH------------------

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
          console.log("fertig gedownloaded")
          pwlel = e.currentTarget.response;
          console.log(pwlel);
          hideload();
          slt_change();
          sicherung = false;
        }
        else {
          var errorMessage = xhr.response || 'Unable to download file';
          console.log(errorMessage);

          $('#con').text('No Connection to Cloud');
          var element = document.getElementById("resetzwei");
          element.classList.remove("hide");
          var elementzwei = document.getElementById("haha");
          elementzwei.classList.add("hide");
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
    getVer();




    //----------------ENDSHEEEESH-----------------

  
});

function anfang(){
  return '<tr style="cursor:pointer" onclick="sortieren()"><th></th><th></th><th class="labeltable">Titel</th><th class="labeltable">Username</th><th></th><th class="labeltable">Password</th><th></th><th></th><th class="labeltable">URL</th><th class="labeltable"></th><th></th></tr>';
}

function anfangzwei(){
  return '<tr style="cursor:pointer" onclick="sortieren()"><th></th><th></th><th class="labeltable">Titel</th><th class="labeltable">Key</th><th></th><th class="labeltable">URL</th><th class="labeltable"></th><th></th></tr>';
}

function pew(row_id, id, titel, username, password, url, note, fav){
  var dec = decrypt(password);
  var us = decrypt(username);
  var ur = decrypt(url);
  var pw = "";
      pw += '<tr row_id="' + row_id +'" id="table-row'+row_id+'" onmouseover="mover(\''+"delete"+id+'\', \''+"ed"+id+'\', \''+"username"+id+'\', \''+"password"+id+'\')" onmouseleave="mleave(\''+"delete"+id+'\', \''+"ed"+id+'\', \''+"username"+id+'\', \''+"password"+id+'\')" draggable="true" ondragstart="start(\''+id+'\')" ondragover="dragover(\'table-row'+row_id+'\')" onDragLeave="dragleave(\'table-row'+row_id+'\')" onDrop="std(\''+id+'\')" class="trsh bordertr" ondblclick="check(\''+ id + '\', \'' + decrypt(titel) + '\', \''+ us + '\', \'' + dec + '\', \'' + ur + '\', \'' + decrypt(note) +'\', \'' + fav + '\')">';
      if(fav == "1"){
      pw += '<td><input type="button" style="padding: 0px 5px 2px 5px; font-size: 15px; color: rgb(1, 138, 230); border-radius: 50%;" class="buttonzwei effectbutton" id="titel' + id + '" onclick="favfunc(\'' + id + '\')" value="★" /></td>';
      }
      else{
        pw += '<td><input type="button" style="padding: 0px 5px 2px 5px; font-size: 15px; border-radius: 50%;" class="buttonzwei effectbutton" id="titel' + id + '" onclick="favfunc(\'' + id + '\')" value="☆" /></td>';
      }
      if(ur == ""){
        pw += '<td style="user-select: none;"></td>';
      }
      else{
        pw += '<td style="user-select: none;"><img src="https://s2.googleusercontent.com/s2/favicons?domain=' + ur + '"></td>';
      }
      pw += '<td><div class="labelzwei" edit_type="click" col_name="tit">' + decrypt(titel) + '</div></td>';
      pw += '<td><div class="labelzwei" edit_type="click" col_name="user" oncontextmenu="copy(\'' + us + '\')">' + kurz(us) + '</div></td>';
      pw += '<td><input type="button" class="buttonzwei effectbuttonanders nada" id="username' + id + '" style="outline: 0;" onmouseover="copyus()" onmouseout="leave()" onclick="copy(\'' + us + '\')" value="🗐" />' +'</td>';
      pw += '<td><div class="labelzwei" edit_type="click" col_name="psw" oncontextmenu="copy(\'' + dec + '\')">' + kurzst(stern(dec)) + '</div></td>'
      pw += '<td><input type="button" class="buttonzwei effectbuttonanders" id="auge' + id + '" onfocusout="mouseUp()" onmouseover="showbot()" onmouseout="leave()" onmousedown="mouseDown(\'' + dec + "\', \'auge" + id + '\')" onmouseup="mouseUp()" value="👁" />' +'</td>';
      pw += '<td><input type="button" class="buttonzwei effectbuttonanders nada" id="password' + id + '" style="outline: 0;" onmouseover="copypw()" onmouseout="leave()" onclick="copy(\'' + dec + '\')" value="🗐" />' +'</td>';
      if(ur == ""){
        pw += '<td style="user-select: none;"></td>';
      }
      else{
        pw += '<td><input style="outline: 0;" type="button" class="buttonzwei effectbuttonanders" id="url' + kurz(id) + '" onmouseover="run()" onmouseout="leave()"  onclick="ope(\'' + ur + '\')" value="ᐅ" />' +'</td>';
      }
      pw += '<td><div class="labelzwei" edit_type="click" col_name="but">' + '<input data-modal-target="#modallel" type="button" style="outline: 0;" class="buttonzwei effectbuttonanders gray" id="ed' + id + '" onmouseover="editme()" onmouseout="leave()" onclick="check(\''+ id + '\', \'' + decrypt(titel) + '\', \''+ us + '\', \'' + dec + '\', \'' + ur + '\', \'' + decrypt(note) +'\', \'' + fav + '\')" value="✎" /></td>';
      pw += '<td><input type="button" onmouseover="entfern()" onmouseout="leave()" class="buttonzwei btn_row_delete rot gray" id="delete' + id + '" value="✖" onclick="del(' + id +')">' + '</td>';
      pw += '</tr>';
      return pw;

}

function mover(delid, edid, usid, passid)
{
  document.getElementById(delid).classList.remove("gray");
  document.getElementById(edid).classList.remove("gray");
  document.getElementById(usid).classList.remove("nada");
  document.getElementById(passid).classList.remove("nada");
}

function mleave(delid, edid, usid, passid)
{
  document.getElementById(delid).classList.add("gray");
  document.getElementById(edid).classList.add("gray");
  document.getElementById(usid).classList.add("nada");
  document.getElementById(passid).classList.add("nada");
}

function mover2(delid, edid, passid)
{
  document.getElementById(delid).classList.remove("gray");
  document.getElementById(edid).classList.remove("gray");
  document.getElementById(passid).classList.remove("nada");
}

function mleave2(delid, edid, passid)
{
  document.getElementById(delid).classList.add("gray");
  document.getElementById(edid).classList.add("gray");
  document.getElementById(passid).classList.add("nada");
}

var rever = false;

function sortieren(){
  console.log("HEHE");
  var byName = pwlel.slice(0);
  byName.sort(function(a,b) {
    var x = decrypt(a.titel);
    x = x.toLowerCase();
    var y = decrypt(b.titel);
    y = y.toLowerCase();
    return x < y ? -1 : x > y ? 1 : 0;
  });

  pwlel = byName;

  if(rever == false)
  {
    rever = true;
  }
  else{
    rever = false;
    pwlel.reverse()
  }
  slt_change();
  var element = document.getElementById("reset");
  element.classList.remove("hide");
  var element = document.getElementById("rlsave");
  element.classList.remove("hide");
  vorhersaven = true;
}

function leave(){
  $('#con').text(bot);
}

function copyus(){
  $('#con').text('Copy Username');
}

function copypw(){
  $('#con').text('Copy Password');
}

function showbot(){
  $('#con').text('Show Password');
}

function run(){
  $('#con').text('Open Webside');
}

function entfern(){
  $('#con').text('Delete Password');
}

function editme(){
  $('#con').text('Edit Password');
}

function keky(row_id, id, titel, username, password, url, note, fav){
  var pw = "";
  var ur = decrypt(url);
  pw += '<tr row_id="' + row_id +'" id="table-row'+row_id+'" onmouseover="mover2(\''+"delete"+id+'\', \''+"ed"+id+'\', \''+"password"+id+'\')" onmouseleave="mleave2(\''+"delete"+id+'\', \''+"ed"+id+'\', \''+"password"+id+'\')" draggable="true" ondragstart="start(\''+id+'\')" ondragover="dragover(\'table-row'+row_id+'\')" onDragLeave="dragleave(\'table-row'+row_id+'\')" onDrop="std(\''+id+'\')" class="trsh bordertr" ondblclick="check(\''+ id + '\', \'' + decrypt(titel) + '\', \''+ decrypt(username) + '\', \'' + decrypt(password) + '\', \'' + decrypt(url) + '\', \'' + decrypt(note) +'\', \'' + fav + '\')">';
  if(fav == "1"){
    pw += '<td><input type="button" style="padding: 0px 5px 2px 5px; font-size: 15px; color: rgb(1, 138, 230); border-radius: 50%;" class="buttonzwei effectbutton" id="titel' + id + '" onclick="favfunc(\'' + id + '\')" value="★" /></td>';
    }
    else{
      pw += '<td><input type="button" style="padding: 0px 5px 2px 5px; font-size: 15px; border-radius: 50%;" class="buttonzwei effectbutton" id="titel' + id + '" onclick="favfunc(\'' + id + '\')" value="☆" /></td>';
    }
  if(ur == ""){
    pw += '<td style="user-select: none;"></td>';
  }
  else{
    pw += '<td style="user-select: none;"><img src="https://s2.googleusercontent.com/s2/favicons?domain=' + ur + '"></td>';
  }
  pw += '<td><div class="labelzwei" edit_type="click" col_name="tit">' + decrypt(titel) + '</div></td>';
  pw += '<td><div class="labelzwei" edit_type="click" col_name="psw" oncontextmenu="copy(\'' + decrypt(password) + '\')">' + decrypt(password) + '</div></td>';
  pw += '<td><input type="button" class="buttonzwei effectbuttonanders nada" id="password' + id + '" onmouseover="copykey()" onmouseout="leave()" onclick="copy(\'' + decrypt(password) + '\')" value="🗐" />' +'</td>';
  if(ur == ""){
    pw += '<td style="user-select: none;"></td>';
  }
  else{
    pw += '<td><input type="button" class="buttonzwei effectbuttonanders" id="url' + kurz(id) + '" onmouseover="run()" onmouseout="leave()" onclick="ope(\'' + ur + '\')" value="ᐅ" />' +'</td>';
  }
  pw += '<td><div class="labelzwei" edit_type="click" col_name="but">' + '<input data-modal-target="#modallel" type="button" class="buttonzwei effectbuttonanders gray" id="ed' + id + '" onmouseover="editmekey()" onmouseout="leave()" onclick="check(\''+ id + '\', \'' + decrypt(titel) + '\', \''+ decrypt(username) + '\', \'' + decrypt(password) + '\', \'' + ur + '\', \'' + decrypt(note) +'\', \'' + fav + '\')" value="✎" /></td>';
  pw += '<td><input type="button" class="buttonzwei btn_row_delete rot gray" id="delete' + id + '" value="✖" onmouseover="entfernkey()" onmouseout="leave()" onclick="del('+ id +')">' + '</td>';
  pw += '</tr>';
      return pw;

}

var row;
var entfrow;
function start(id){
  row = event.target;
  entfrow = id;
}

var oldY = 0;
var direct = 0;
function dragover(id){
  var e = event;
  e.preventDefault();
  if(event.pageY<oldY)
  {
    console.log("oben");
    direct = 0;
    document.getElementById(''+id+'').classList.add("dragdropoben")
    document.getElementById(''+id+'').classList.add("bordertr")
    document.getElementById(''+id+'').classList.remove("dragdropunten")
  }
  else if(event.pageY>oldY){
    console.log("unten");
    direct = 1;
    document.getElementById(''+id+'').classList.add("dragdropunten")
    document.getElementById(''+id+'').classList.remove("bordertr")
    document.getElementById(''+id+'').classList.remove("dragdropoben")
  }
  oldY = event.pageY;
}

function std(einf)
{
  var i = 0;
  var objeinf;
  var ind = 0;
  for(i=0; i < pwlel.length; i++)
  {
    if(pwlel[i].id == einf)
    {
      ind = i+direct;
      console.log("einf gefunden | "+pwlel[i].id+" == "+einf);
    }
    if(pwlel[i].id == entfrow)
    {
      objeinf = pwlel[i];
      pwlel.splice(i, 1);
      console.log("entf gefunden | " +objeinf.id+" == "+entfrow);
    }
  }
  pwlel.splice(ind, 0, objeinf);
  var element = document.getElementById("reset");
  element.classList.remove("hide");
  var element = document.getElementById("rlsave");
  element.classList.remove("hide");
  vorhersaven = true;
  slt_change();
}

function dragleave(id){
  document.getElementById(''+id+'').classList.remove("dragdropoben")
  document.getElementById(''+id+'').classList.remove("dragdropunten")
  document.getElementById(''+id+'').classList.add("bordertr")
}

function copykey(){
  $('#con').text('Copy Key');
}

function entfernkey(){
  $('#con').text('Delete Key');
}

function editmekey(){
  $('#con').text('Edit Key');
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

function ope(link){
  var links = "https://" + link + "/" 
  shell.openExternal(links); 
  console.log(links);
}

function stern(lel){
  var stern = "";
  for (i = 0; i < lel.length; i++) {
    stern = stern + "*"
  }
  return stern;
}

function del(idsheesh){
  var i;
  for(i=0; i < pwlel.length; i++)
  {
    if(pwlel[i].id == idsheesh)
    {
      pwlel.splice(i, 1);
      break;
    }
  }
  var element = document.getElementById("reset");
  element.classList.remove("hide");
  var element = document.getElementById("rlsave");
  element.classList.remove("hide");
  vorhersaven = true;
}

function copy(text){
  var dummy = document.createElement("textarea");
    document.body.appendChild(dummy);
    dummy.value = text;
    dummy.select();
    document.execCommand("copy");
    document.body.removeChild(dummy);

    $('#con').text('Copied..');
    setTimeout(() => {  $('#con').text(bot); }, 2000);
}

function check(id, titel, username, password, url, note, fav){
    edit = true;
    document.getElementById("saverly").value = "✎Edit";

    $('#bg-modal').animate({
      opacity: 1
  }, 'swing');

  $('#bg-modal').css("z-index", "9997");
    
    indexsheesh = id;
    row_index = $(this).parent('table').index();

    const slt = document.getElementById('slt');
  if(slt.value == "Passwort")
  {
    document.getElementById("txtpassword").placeholder = "Password";
    var element = document.getElementById("txtusername");
    document.getElementById("txtpassword").type = "password";
    element.classList.remove("hide");
  }
  else{
    document.getElementById("txtpassword").placeholder = "Key";
    var element = document.getElementById("txtusername");
    document.getElementById("txtpassword").type = "text";
      element.classList.add("hide");
  }
    
  document.getElementById("txttitel").value = titel;
  document.getElementById("txtusername").value = username;
  document.getElementById("txtpassword").value = password;
  document.getElementById("txturl").value = url;
  document.getElementById("txtnote").value = note;
  if(fav == "1")
  {
    document.getElementById("favoritebtn").value = "★";
    var element = document.getElementById("favoritebtn");
    element.classList.add("blau");
  }
  else{
    document.getElementById("favoritebtn").value = "☆";
    var element = document.getElementById("favoritebtn");
    element.classList.remove("blau");
  }
}

function testttt(i)
{
  console.log(i);
}

function openrly(i)
{
  document.getElementById("cancel2").setAttribute('onclick','cancel2('+i+')');
  document.getElementById("saverly2").setAttribute('onclick','allesSaven(1, '+i+')');
  $('#bg-modal2').css("z-index", "9997");
  $('#bg-modal2').animate({
    opacity: 1
}, 'swing');
}

function cancel2(i)
{
  vorhersaven = false;
  if(i == 0)
  {
    canc();
    cancelto();
  }
  else if(i == 1){
    analy();
    cancelto();
  }
  else{
    ex();
  }
}

function cancelto()
{
  $('#bg-modal2').animate({
    opacity: 0
  }, 'swing');
  setTimeout(() => {  $('#bg-modal2').css("z-index", "0"); }, 350);
}

function cancel(){

  $('#bg-modal').animate({
    opacity: 0
}, 'swing');

setTimeout(() => {  $('#bg-modal').css("z-index", "0"); }, 350);

  $("#lel").attr('disabled', false);

  document.getElementById("save").style.visibility = "visible";
  indexsheesh = "";
  currentfav = "";

  document.getElementById("context-menuzwei").classList.remove("active");
    document.getElementById("context-menudrei").classList.remove("active");
    var contextElementzwei = document.getElementById("txtpassword");
    contextElementzwei.classList.remove("bordercolor");
    var contextElementzwei = document.getElementById("txturl");
    contextElementzwei.classList.remove("bordercolor");
    var contextElementzwei = document.getElementById("txtusername");
    contextElementzwei.classList.remove("bordercolor");
    modalcanc = false;

    setTimeout(() => {  
      document.getElementById("txttitel").value = "";
      document.getElementById("txtusername").value = "";
      document.getElementById("txtpassword").value = "";
      document.getElementById("txturl").value = "";
      document.getElementById("txtnote").value = "";
    }, 500);
}

var modalcanc = false;

function cancelmodal(){
  var obj = $("#modal-contents");
  if (!obj.is(event.target) && !obj.has(event.target).length) {
    if(modalcanc == false)
    {
      cancel();
      cancelto();
    }
  }
  modalcanc = false;
}

function setcanc()
{
  modalcanc = true;
  oncl();
}

function stringlel(someObject){

  return JSON.stringify(someObject);
}

function slices(str){
  return str.slice(0, -1);
}

function kurz(str){
  if(str.length > 17)
  {
    return str.slice(0, 17) + "..";
  }
  else{
    return str;
  }
}

function kurzst(str){
  if(str.length > 10)
  {
    return str.slice(0, 10);
  }
  else{
    return str;
  }
}

function add(){
  edit = false;
  
  document.getElementById("save").style.visibility = "hidden";
  $("#lel").attr('disabled', true);
  document.getElementById("saverly").value = "🞤Add";

  if(favbtn == 0)
  {
    document.getElementById("favoritebtn").value = "☆";
    var element = document.getElementById("favoritebtn");
    element.classList.remove("blau");
  }
  else{
    document.getElementById("favoritebtn").value = "★";
    var element = document.getElementById("favoritebtn");
    element.classList.add("blau");
  }

  const slt = document.getElementById('slt');
  if(slt.value == "Passwort")
  {
    document.getElementById("txtpassword").placeholder = "Password";
    var element = document.getElementById("txtusername");
    element.classList.remove("hide");
    var elementzwei = document.getElementById("tools");
    elementzwei.classList.remove("hide");
    document.getElementById("txtpassword").type = "password";
    $("#strich").css("height","100px");
  }
  else{
    document.getElementById("txtpassword").placeholder = "Key";
    var element = document.getElementById("txtusername");
      element.classList.add("hide");
      var elementzwei = document.getElementById("tools");
      elementzwei.classList.add("hide");
      document.getElementById("txtpassword").type = "text";
      $("#strich").css("height","70px");
  }
}

function negative(num)
{
  return -Math.abs(num);
}


function save(){
  edit = false;

  var titel = document.getElementById("txttitel").value;
  titel = encrypt(titel);
  var username = document.getElementById("txtusername").value;
  username = encrypt(username);
  var password = document.getElementById("txtpassword").value;
  password = encrypt(password);
  var url = document.getElementById("txturl").value;


  if(url != "")
  {
    var kekkk = url.charAt(0);
    kekkk += url.charAt(1);
    kekkk += url.charAt(2);
    kekkk += url.charAt(3);
    kekkk += url.charAt(4);
    kekkk += url.charAt(5);
    kekkk += url.charAt(6);
    if(kekkk == "http://")
    {
      url = url.substr(7, url.length);
    }

    var kekkk = url.charAt(0);
    kekkk += url.charAt(1);
    kekkk += url.charAt(2);
    kekkk += url.charAt(3);
    kekkk += url.charAt(4);
    kekkk += url.charAt(5);
    kekkk += url.charAt(6);
    kekkk += url.charAt(7);
    if(kekkk == "https://")
    {
      url = url.substr(8, url.length);
    }

    var charpos = url.charAt(0);
    charpos += url.charAt(1);
    charpos += url.charAt(2);
    charpos += url.charAt(3);
    if(charpos != "www."){
      url = "www." + url;
    }

    var end = url.charAt(url.length-1);
    if(end == "/")
    {
      url = url.substr(0, url.length-1);
    }
  }


  //url = url.replace("http://","");

  url = encrypt(url);
  var note = tarea();
  note = encrypt(note);
  var fav = currentfav;

  var favinform = "";
  if(document.getElementById("favoritebtn").value == "☆")
  {
    favinform = "0";
    console.log("fav: 0");
  }
  else{
    favinform = "1";
    console.log("fav: 1");
  }

  if(decrypt(titel) != "" | decrypt(username) != "" | decrypt(password) != "")
  {
    if(indexsheesh == "")
    {
      count += 1;
      var row_id = random_id();

      const slt = document.getElementById('slt');
      if(slt.value == "Passwort"){
        const idk = {"id":count.toString(), "fav":favinform, "titel":titel, "username":username, "password":password, "url":url, "note":note};
        pwlel.push(idk);
      }
      else{
        var sek = "-" + count.toString();
        const idk = {"id":sek, "fav":favinform, "titel":titel, "username":username, "password":password, "url":url, "note":note};
        pwlel.push(idk);
      }
      cancel();
    }
    else{
        var i;
        for(i=0; i < pwlel.length; i++)
        {
          if(pwlel[i].id == indexsheesh)
          {
            pwlel[i].titel = titel;
            pwlel[i].username = username;
            pwlel[i].password = password;
            pwlel[i].url = url;
            pwlel[i].note = note;
            pwlel[i].fav = favinform;
            editfunc(indexsheesh, titel, username, password, url, note, favinform);
            cancel();
            break;
          }
        }

    }
    var element = document.getElementById("reset");
  element.classList.remove("hide");
  var element = document.getElementById("reset");
  element.classList.add("containerlezwei");
  var element = document.getElementById("rlsave");
  element.classList.remove("hide");
  var element = document.getElementById("rlsave");
  element.classList.add("containerlezwei");
  vorhersaven = true;
  changefunc();

  }
  else{
    $('#con').text('Titel, Username and Password need some Information');
  }
}

function editfunc(id, titel, username, password, url, note, fav){
  $('#passwort tbody').empty();
  var pw;
  var len = pwlel.length;
  var i;
  const slt = document.getElementById('slt');
  if(slt.value == "Passwort"){
    pw = anfang();
    for(i=0; i < len; i++)
        {
          var row_id = random_id();
          var pwid = pwlel[i].id;
          var pwtitel = pwlel[i].titel;
          var pwusername = pwlel[i].username;
          var pwpassword = pwlel[i].password;
          var pwurl = pwlel[i].url;
          var pwnote = pwlel[i].note;

          var pwfav = pwlel[i].fav;

          if(pwlel[i].id > 0)
          {
            if(pwlel[i].id == indexsheesh)
            {
              pw += pew(row_id, indexsheesh, titel, username, password, url, note, fav);
            }
            else{
              pw += pew(row_id, pwid, pwtitel, pwusername, pwpassword, pwurl, pwnote, pwfav);
            }
          }
        }
        
  }
  else{
    pw = anfangzwei();
    for(i=0; i < len; i++)
        {
          var row_id = random_id();
          var pwid = pwlel[i].id;
          var pwtitel = pwlel[i].titel;
          var pwusername = pwlel[i].username;
          var pwpassword = pwlel[i].password;
          var pwurl = pwlel[i].url;
          var pwnote = pwlel[i].note;
          var pwfav = pwlel[i].fav;

          if(pwlel[i].id < 0)
          {
            if(pwlel[i].id == indexsheesh)
            {
              pw += keky(row_id, indexsheesh, titel, username, password, url, note, fav);
            }
            else{
              pw += keky(row_id, pwid, pwtitel, pwusername, pwpassword, pwurl, pwnote, pwfav);
            }
          }
        }
  }
  $('#passwort').append(pw);

}

function srch()
{
  searchfunc();
}

function searchfunc()
{
  const slt = document.getElementById('slt');
  $('#passwort tbody').empty();
  count = 0;
  var pw;
  var len = pwlel.length;
  var i;

  var a = document.getElementById("search").value;
  a = a.toLowerCase();

  if(a == "")
  {
    slt_change();
  }
  else{
    if(slt.value == "Passwort")
    {
      pw = anfang();
    }
    else{
      pw = anfangzwei();
    }

    for(i=0; i < len; i++)
        {
          var row_id = random_id();
          var pwid = pwlel[i].id;
          var pwtitel = pwlel[i].titel;
          var pwusername = pwlel[i].username;
          var pwpassword = pwlel[i].password;
          var pwurl = pwlel[i].url;
          var pwnote = pwlel[i].note;

          var pwfav = pwlel[i].fav;


          var ti = decrypt(pwtitel);
          ti = ti.toString().toLowerCase();
          var us = decrypt(pwusername);
          us = us.toString().toLowerCase();
          var ur = decrypt(pwurl);
          ur = ur.toString().toLowerCase();
          var no = decrypt(pwnote);
          no = no.toString().toLowerCase();
          
            if(ti.indexOf(a) > -1 || us.indexOf(a) > -1 || ur.indexOf(a) > -1 || no.indexOf(a) > -1)
            {
              if(slt.value == "Passwort")
              {
                if(pwlel[i].id > 0)
                {
                  if(favbtn == 0)
                  {
                    pw += pew(row_id, pwid, pwtitel, pwusername, pwpassword, pwurl, pwnote, pwfav);
                  }
                  else{
                    if(pwfav == "1")
                    {
                      pw += pew(row_id, pwid, pwtitel, pwusername, pwpassword, pwurl, pwnote, pwfav);
                    }
                  }
                }
              }
              else{
                if(pwlel[i].id < 0)
                {
                  if(favbtn == 0)
                  {
                    pw += keky(row_id, pwid, pwtitel, pwusername, pwpassword, pwurl, pwnote, pwfav);
                  }
                  else{
                    if(pwfav == "1")
                    {
                      pw += keky(row_id, pwid, pwtitel, pwusername, pwpassword, pwurl, pwnote, pwfav);
                    }
                  }
                }
              }
            }
        }
          
  }
  $('#passwort').append(pw);
}


const s = document.getElementById('search');
s.addEventListener('keypress', (e) => {

  if (e.key === 'Enter') {
    searchfunc();
    
  }

});

function slt_change(){
  const slt = document.getElementById('slt');
  $('#passwort tbody').empty();
  count = 0;
  var pw;
  var len = pwlel.length;
  var i;
  if(slt.value == "Passwort"){
    store.set('dropdown', 0);
    pw = anfang();
    for(i=0; i < len; i++)
        {
          var row_id = random_id();
          var pwid = pwlel[i].id;
          var pwtitel = pwlel[i].titel;
          var pwusername = pwlel[i].username;
          var pwpassword = pwlel[i].password;
          var pwurl = pwlel[i].url;
          var pwnote = pwlel[i].note;

          var pwfav = pwlel[i].fav;

          if(favbtn == 0)
          {
            if(pwlel[i].id > 0)
            {
              pw += pew(row_id, pwid, pwtitel, pwusername, pwpassword, pwurl, pwnote, pwfav);
              count += 1;
            }
          }
          else
          {
            if(pwlel[i].id > 0 && pwlel[i].fav == "1")
            {
              pw += pew(row_id, pwid, pwtitel, pwusername, pwpassword, pwurl, pwnote, pwfav);
              count += 1;
            }
          }
        }
        $('#coun').text(count + ' Passwords');
        document.getElementById('sh').style.display = "inline";
        document.getElementById('txtpassword').style.width = "164px";
        document.getElementById('txtpassword').style.borderTopRightRadius = "0px";
        document.getElementById('txtpassword').style.borderBottomRightRadius = "0px";
        dropdown = 0;
  }
  else{
    store.set('dropdown', 1);
    pw = anfangzwei();
    for(i=0; i < len; i++)
      {
          var row_id = random_id();
          var pwid = pwlel[i].id;
          var pwtitel = pwlel[i].titel;
          var pwusername = pwlel[i].username;
          var pwpassword = pwlel[i].password;
          var pwurl = pwlel[i].url;
          var pwnote = pwlel[i].note;
          var pwfav = pwlel[i].fav;

        if(favbtn == 0)
        {
          if(pwlel[i].id < 0)
          {
              pw += keky(row_id, pwid, pwtitel, pwusername, pwpassword, pwurl, pwnote, pwfav);
              count += 1;
          }
        }
        else{
          if(pwlel[i].id < 0 && pwlel[i].fav == "1")
          {
              pw += keky(row_id, pwid, pwtitel, pwusername, pwpassword, pwurl, pwnote, pwfav);
              count += 1;
          }
        }
      }
      $('#coun').text(count + ' Keys');
      document.getElementById('sh').style.display = "none";
      document.getElementById('txtpassword').style.width = "198px";
      document.getElementById('txtpassword').style.borderTopRightRadius = "10px";
      document.getElementById('txtpassword').style.borderBottomRightRadius = "10px";
      dropdown = 1;
  }
  $('#passwort').append(pw);
}

function ex(){
  if(vorhersaven == true)
  {
    openrly(2)
    return;
  }
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
  store.set('favbtn', favbtn);
  store.set('dropdown', dropdown);
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

function allesSaven(ind, wer){
  sicherung = true;
  var element = document.getElementById("hahaha");
  element.classList.remove("hide");
  var amk = "[\n"
  var i;
  var len = pwlel.length;
  var len2 = len - 1;
  count = 1;
  var minuscount = -1;
  for(i=0;i< len;i++)
  {
    var id = pwlel[i].id;
    var titel = pwlel[i].titel;
    var username = pwlel[i].username;
    var password = pwlel[i].password;
    var url = pwlel[i].url;
    var note = pwlel[i].note;
    var fav = pwlel[i].fav;
    var newid = 0;
    if(id>0)
    {
      newid = count;
      count++;
    }
    else if(id<0){
      newid = minuscount;
      minuscount--;
    }
    else{
      newid = 0;
    }
    amk += '{"id":"'+newid+'", "fav":"'+fav+'", "titel":"'+titel+'","username":"'+username+'","password":"'+password+'","url":"'+url+'","note":"'+note+'"}';
    if(i < len2){
      amk += ",\n";
    }
    else{
      amk += "\n";
    }
  }
  amk += "]";

  uploadFile(amk, ind, wer);
}

function favfunc(id){
  var element = document.getElementById("reset");
  element.classList.remove("hide");
  var element = document.getElementById("rlsave");
  element.classList.remove("hide");
  vorhersaven = true;
  var i;
  for(i=0; i < pwlel.length; i++)
  {
    if(pwlel[i].id == id)
    {
      if(pwlel[i].fav == "1")
      {
        pwlel[i].fav = "0";
        changefunc();
        break;
      }
      else{
      if(pwlel[i].fav == "0")
      {
        pwlel[i].fav = "1";
        changefunc();
        break;
      }
    }
    }
  }

}

function changefunc(){
  $('#passwort tbody').empty();
  var pw;
  var len = pwlel.length;
  var i;
  const slt = document.getElementById('slt');
  if(slt.value == "Passwort"){
    pw = anfang();
    for(i=0; i < len; i++)
        {
          var row_id = random_id();
          var pwid = pwlel[i].id;
          var pwtitel = pwlel[i].titel;
          var pwusername = pwlel[i].username;
          var pwpassword = pwlel[i].password;
          var pwurl = pwlel[i].url;
          var pwnote = pwlel[i].note;

          var pwfav = pwlel[i].fav;

          if(favbtn == 0)
          {
            if(pwlel[i].id > 0)
            {
              pw += pew(row_id, pwid, pwtitel, pwusername, pwpassword, pwurl, pwnote, pwfav);
            }
          }
          else
          {
            if(pwlel[i].id > 0 && pwlel[i].fav == "1")
            {
              pw += pew(row_id, pwid, pwtitel, pwusername, pwpassword, pwurl, pwnote, pwfav);
            }
          }
        }
        
  }
  else{
    pw = anfangzwei();
    for(i=0; i < len; i++)
        {
          var row_id = random_id();
          var pwid = pwlel[i].id;
          var pwtitel = pwlel[i].titel;
          var pwusername = pwlel[i].username;
          var pwpassword = pwlel[i].password;
          var pwurl = pwlel[i].url;
          var pwnote = pwlel[i].note;
          var pwfav = pwlel[i].fav;

          if(favbtn == 0)
        {
          if(pwlel[i].id < 0)
          {
              pw += keky(row_id, pwid, pwtitel, pwusername, pwpassword, pwurl, pwnote, pwfav);
          }
        }
        else{
          if(pwlel[i].id < 0 && pwlel[i].fav == "1")
          {
              pw += keky(row_id, pwid, pwtitel, pwusername, pwpassword, pwurl, pwnote, pwfav);
          }
        }
        }
  }
  $('#passwort').append(pw);

}

function favbtnclick(){
  $('#con').text(bot);
  if(favbtn == 0)
  {
    favbtn = 1;
    store.set('favbtn',1);
    document.getElementById("favbutton").value = "★";
    var element = document.getElementById("favbutton");
    element.classList.add("blau");
    slt_change();
  }
  else{
    favbtn = 0;
    store.set('favbtn',0);
    document.getElementById("favbutton").value = "☆";
    var element = document.getElementById("favbutton");
    element.classList.remove("blau");
    slt_change();
  }
}

function favbtnclickzwei(){
  var inhalt = document.getElementById("favoritebtn").value
  if(inhalt == "☆")
  {
    document.getElementById("favoritebtn").value = "★";
    var element = document.getElementById("favoritebtn");
    element.classList.add("blau");
  }
  else{
    document.getElementById("favoritebtn").value = "☆";
    var element = document.getElementById("favoritebtn");
    element.classList.remove("blau");
  }
}

function clearsrch(){
  document.getElementById("search").value = "";
  const input = document.getElementById('search');
  input.focus();
  srch();

}

function canc(){
  if(vorhersaven == true)
  {
    openrly(0)
    return;
  }
  if(sicherung == false){
  cancel();
  store.set('pwtemp',pwtemp);
  var element = document.getElementById("containerid");
  element.classList.add("animateLeft");
  var elementzwei = document.getElementById("ana");
  elementzwei.classList.add("animateLeft");
  var elementdrei = document.getElementById("btnEd");
  elementdrei.classList.add("animateLeft");
  var elementdrei = document.getElementById("tit");
  elementdrei.classList.add("animateLeft");
  

    let remote = require('electron').remote;

    parentWindow.removeAllListeners('resize');
    parentWindow.removeAllListeners('focus');
    parentWindow.removeAllListeners('blur');
    parentWindow.removeAllListeners('unmaximize');
    parentWindow.removeAllListeners('maximize');
        
        const winSettings = remote.getCurrentWindow();
        winSettings.loadURL(url.format( {
          pathname: path.join(__dirname, 'settings.html'),
          protocol: 'file',
          slashes: true

        }))
      }
      else{
        $('#con').text('Working.. Please wait');
        setTimeout(() => {  $('#con').text(bot); }, 2000);
      }
}

function uploadFile(fil, i, wer){
  try {
    var dropboxToken = store.get('dropboxtoken');
  }
  catch(err) {
    $('#con').text('Dropbox Token is wrong!');
  }
  dropboxToken = decrypt(dropboxToken);

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
    var element = document.getElementById("hahaha");
    element.classList.add("hide");
    var element = document.getElementById("reset");
  element.classList.add("hide");
  var element = document.getElementById("rlsave");
  element.classList.add("hide");
  vorhersaven = false;
    if(i != 0)
    {
      if(wer == 0)
      {
        canc();
        cancelto();
      }
      else if(wer == 1){
        analy();
        cancelto();
      }
      else{
        ex();
      }
    }
  }
  else {
    var errorMessage = xhr.response || 'Unable to upload file';
    sicherung = false;
    console.log(errorMessage);

    var element = document.getElementById("hahaha");
    element.classList.add("hide");
    $('#con').text("Something went wrong..");
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

function uploadGoogleDrive(fil){
  const fs = require("fs");
  const request = require("request");

  const accessToken = "###";
  const filename = "./pw.json";

  const fileSize = fs.statSync(filename).size;

  request(
  {
    method: "POST",
    url:
      "https://www.googleapis.com/upload/drive/v3/files?uploadType=resumable",
    headers: {
      Authorization: `Bearer ${accessToken}`,
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ name: "pw.json", mimeType: "text/plain" })
  },
  (err, res) => {
    if (err) {
      console.log(err);
      return;
    }

    request(
      {
        method: "PUT",
        url: res.headers.location,
        headers: { "Content-Range": `bytes 0-${fileSize - 1}/${fileSize}` },
        body: fs.readFileSync(filename)
      },
      (err, res, body) => {
        if (err) {
          console.log(err);
          return;
        }
        console.log(body);
      }
    );
  }
);
}

function hideload() {
  
  var x = document.getElementById("haha");
  x.style.display = "none";
  $("#svglelid").fadeOut("slow");
}

function unzipp(){

var executablePath = "C:\\Users\\Ricardo\\Desktop\\NeuerOrdner\\NeuerOrdner\\cock.exe";

const {shell} = require('electron');
shell.openItem(executablePath);
}

function mouseUp(){
  document.getElementById("context-menu").classList.remove("active");
}

function mouseDown(text, id){
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
  //var y = event.clientY - 20;
  //var x = event.clientX - 170 - extr;
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

function analy(){
  if(vorhersaven == true)
  {
    openrly(1)
    return;
  }
  if(sicherung == false){
  store.set('pwtemp',pwtemp);
  store.set('list',pwlel);
  const { shell } = window.require('electron');
  var element = document.getElementById("containerid");
  element.classList.add("animateLeft");
  var elementzwei = document.getElementById("ana");
  elementzwei.classList.add("animateLeft");
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
    pathname: path.join(__dirname, 'analytics.html'),
    protocol: 'file',
    slashes: true

  }))
  }
  else{
    $('#con').text('Working.. Please wait');
    setTimeout(() => {  $('#con').text(bot); }, 2000);
  }
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
  store.set('favbtn', favbtn);
  store.set('dropdown', dropdown);
}

function relo(){
  store.set('pwtemp',pwtemp);
  window.location.reload();
}

function tarea(){
  var someText = document.getElementById("txtnote").value;
  someText = someText.replace(/(\r\n|\n|\r)/gm," ");
  return someText;
}

function showpw(){
  var ch = document.getElementById("txtpassword").type;
  if(ch == "password")
  {
    document.getElementById("txtpassword").type = "text";
    $('#con').text("Hide Password");
  }
  else{
    document.getElementById("txtpassword").type = "password";
    $('#con').text("Show Password");
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
    ontopvar = true;
  }
  else{
    document.getElementById("topkek").value = "○";
    remote.getCurrentWindow().setAlwaysOnTop(false, 'screen');
    var element = document.getElementById("topkek");
    element.classList.remove("blau");
    store.set('ontop', false);
    ontopvar = false;
  }

}

function showpwgen(){

  event.preventDefault();
  var contextElement = document.getElementById("context-menuzwei");
  contextElement.classList.add("active");
  onclvar = true;
  var contextElementzwei = document.getElementById("txtpassword");
  contextElementzwei.classList.add("bordercolor");

}

function showqr(){
  event.preventDefault();
  var contextElement = document.getElementById("context-menudrei");
  contextElement.classList.add("active");
  onclvar = true;

  const slt = document.getElementById('sltzwei');
  if(slt.value == "URL"){
    var contextElementzwei = document.getElementById("txturl");
    contextElementzwei.classList.add("bordercolor");
  }
  else{
    var contextElementzwei = document.getElementById("txtusername");
    contextElementzwei.classList.add("bordercolor");
    var contextElementzwei = document.getElementById("txtpassword");
    contextElementzwei.classList.add("bordercolor");
  }
  qrcodefunc();
}

function urlwifi(){
  const slt = document.getElementById('sltzwei');
  if(slt.value == "URL"){
    var contextElementzwei = document.getElementById("txturl");
    contextElementzwei.classList.add("bordercolor");
    var contextElementzwei = document.getElementById("txtusername");
    contextElementzwei.classList.remove("bordercolor");
    var contextElementzwei = document.getElementById("txtpassword");
    contextElementzwei.classList.remove("bordercolor");

    var contextElementzwei = document.getElementById("lelzwei");
    contextElementzwei.classList.add("disablediv");
    
  }
  else{
    var contextElementzwei = document.getElementById("txtusername");
    contextElementzwei.classList.add("bordercolor");
    var contextElementzwei = document.getElementById("txtpassword");
    contextElementzwei.classList.add("bordercolor");
    var contextElementzwei = document.getElementById("txturl");
    contextElementzwei.classList.remove("bordercolor");

    var contextElementzwei = document.getElementById("lelzwei");
    contextElementzwei.classList.remove("disablediv");
  }
  qrcodefunc();
}

//PW GEN

const characterAmountRange = document.getElementById('characterAmountRange')
const characterAmountNumber = document.getElementById('characterAmountNumber')
const includeUppercaseElement = document.getElementById('includeUppercase')
const includeNumbersElement = document.getElementById('includeNumbers')
const includeSymbolsElement = document.getElementById('includeSymbols')
const form = document.getElementById('passwordGeneratorForm')
const passwordDisplay = document.getElementById('txtpassword')

const UPPERCASE_CHAR_CODES = arrayFromLowToHigh(65, 90)
const LOWERCASE_CHAR_CODES = arrayFromLowToHigh(97, 122)
const NUMBER_CHAR_CODES = arrayFromLowToHigh(48, 57)
const SYMBOL_CHAR_CODES = arrayFromLowToHigh(33, 47).concat(
  arrayFromLowToHigh(58, 64)
).concat(
  arrayFromLowToHigh(91, 96)
).concat(
  arrayFromLowToHigh(123, 126)
)

characterAmountNumber.addEventListener('input', syncCharacterAmount)
characterAmountRange.addEventListener('input', syncCharacterAmount)

form.addEventListener('submit', e => {
  e.preventDefault()
  const characterAmount = characterAmountNumber.value
  const includeUppercase = includeUppercaseElement.checked
  const includeNumbers = includeNumbersElement.checked
  const includeSymbols = includeSymbolsElement.checked
  const password = generatePassword(characterAmount, includeUppercase, includeNumbers, includeSymbols)
  passwordDisplay.value = password;
  onclvar = false;
  document.getElementById("context-menuzwei").classList.remove("active");
})

function createpw(){
  /*e.preventDefault()*/
  const characterAmount = characterAmountNumber.value
  const includeUppercase = includeUppercaseElement.checked
  const includeNumbers = includeNumbersElement.checked
  const includeSymbols = includeSymbolsElement.checked
  const password = generatePassword(characterAmount, includeUppercase, includeNumbers, includeSymbols)
  passwordDisplay.innerText = password
}

function generatePassword(characterAmount, includeUppercase, includeNumbers, includeSymbols) {
  let charCodes = LOWERCASE_CHAR_CODES
  if (includeUppercase) charCodes = charCodes.concat(UPPERCASE_CHAR_CODES)
  if (includeSymbols) charCodes = charCodes.concat(SYMBOL_CHAR_CODES)
  if (includeNumbers) charCodes = charCodes.concat(NUMBER_CHAR_CODES)
  
  const passwordCharacters = []
  for (let i = 0; i < characterAmount; i++) {
    const characterCode = charCodes[Math.floor(Math.random() * charCodes.length)]
    passwordCharacters.push(String.fromCharCode(characterCode))
  }
  return passwordCharacters.join('')
}

function arrayFromLowToHigh(low, high) {
  const array = []
  for (let i = low; i <= high; i++) {
    array.push(i)
  }
  return array
}

function syncCharacterAmount(e) {
  const value = e.target.value
  characterAmountNumber.value = value
  characterAmountRange.value = value
}

function oncl(){
  if(onclvar == true)
  {
    document.getElementById("context-menuzwei").classList.remove("active");
    document.getElementById("context-menudrei").classList.remove("active");
    var contextElementzwei = document.getElementById("txtpassword");
    contextElementzwei.classList.remove("bordercolor");
    var contextElementzwei = document.getElementById("txturl");
    contextElementzwei.classList.remove("bordercolor");
    var contextElementzwei = document.getElementById("txtusername");
    contextElementzwei.classList.remove("bordercolor");
  }
}

function qrcodevor(){
  //$("#qr").slideDown("slow", function(){
    qrcodefunc();
  //});

}

function qrcodefunc(){
  const slt = document.getElementById('sltzwei');
  var textqr;
  if(slt.value == "URL"){
    textqr = document.getElementById("txturl").value;
    if(textqr == "")
    {
      $('#con').text('URL need to be filled out..');
      setTimeout(() => {  $('#con').text(bot); }, 2000);
      return;
    }
  }
  else{
    var qrname = document.getElementById("txtusername").value;
    var qrpw = document.getElementById("txtpassword").value;
    if(qrname == "" || qrpw == "")
    {
      $('#con').text('Username and Password need to be filled out..');
      setTimeout(() => {  $('#con').text(bot); }, 2000);
      return;
    }
    var wpa = "WPA";
    const sltdrei = document.getElementById('sltdrei');
    if(sltdrei.value == "WPA/WPA2"){
      wpa = "WPA";
      console.log(wpa);
    }
    if(sltdrei.value == "No Password"){
      wpa = "nopass";
      console.log(wpa);
    }
    if(sltdrei.value == "WEP"){
      wpa = "WEP";
      console.log(wpa);
    }
    if(sltdrei.value == "WPA2-EAP"){
      wpa = "WPA2-EAP";
      console.log(wpa);
    }
    textqr = "WIFI:T:" + wpa + ";S:" + qrname + ";P:"+ qrpw +";;";
    console.log(textqr);
  }

  var QRCode = require('qrcode')
  var canvas = document.getElementById('canvas')
 
  QRCode.toCanvas(canvas, textqr, function (error) {
    if (error) console.error(error)
    console.log('success!');
  })
}

require('electron').remote.getCurrentWindow().on('focus', () => {
  var contextElement = document.getElementById("sklel");
  contextElement.classList.remove("navbaroffle");
  var contextElement = document.getElementById("sk");
  contextElement.classList.remove("navbaroffle");
  if(blurvar == true)
  {
  if(ontopvar == false)
  {
  document.getElementById("blur").classList.add("blurcssout");
  document.getElementById("blur").classList.remove("blurcss");
  }
}

})

require('electron').remote.getCurrentWindow().on('blur', () => {
  var contextElement = document.getElementById("sklel");
  contextElement.classList.add("navbaroffle");
  var contextElement = document.getElementById("sk");
  contextElement.classList.add("navbaroffle");
  if(blurvar == true)
  {
  if(ontopvar == false)
  {
  document.getElementById("blur").classList.add("blurcss");
  document.getElementById("blur").classList.remove("blurcssout");
  }
}
})

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
    store.set('favbtn', favbtn);
    store.set('dropdown', dropdown);
  
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

function idk(){
  idkcount++;

  if(idkcount >= 8)
  {
    document.getElementById("sec").classList.remove("hide");
    document.getElementById("sec").classList.add("containerlezwei");
    document.getElementById("sec").classList.remove("containerremove");
  }

  if(idkvar == false){

    idkvar = true;
    setTimeout(() => {  
      idkcount = 0;
      idkvar = false;
    }, 2000);

  }
}

var chill = true;

function closesec(){
  if(chill == true)
  {
    chill = false;
  }
  else{
    document.getElementById("sec").classList.remove("containerlezwei");
    document.getElementById("sec").classList.add("containerremove");
    setTimeout(() => {  document.getElementById("sec").classList.add("hide"); }, 600);
  }
}

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
  document.getElementById("scrollbar-custom").style.height = bounds[1]-150 +"px";
}
once();

parentWindow.on('resize', function() {
  const bounds = parentWindow.getSize();
  document.getElementById("scrollbar-custom").style.height = bounds[1]-150 +"px";
});


ipcRenderer.on('download', (event, arg) => {
  store.set('download',true);
});

ipcRenderer.on('downloaded', (event, arg) => {
  store.set('down',true);
});








  
  
      
  
      
      
      
      
