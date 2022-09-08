console.log('home loaded')

const store = require('./js/storedata.js');
const init = require('./js/home/init.js');
const {anfang, anfangzwei, pew, keky} = require('./js/home/table.js');
const initIpcRenderer = require('./js/home/ipcRenderer.js');

const encryptModule = require('./js/modules/encrypt.js');
const decryptModule = require('./js/modules/decrypt.js');
const checkPassword = require('./js/modules/checkPassword.js');
const TimerFunc = require('./js/modules/timerFunc.js');

const { ipcRenderer } = require('electron');
const electron = require('electron');
const path = require('path');
const url = require('url');

const { Menu } = require('electron');

const nativeTheme = electron.remote.nativeTheme; 

var sicherung = true;
var onclvar = false;

var vorhersaven = false;

var idkvar = false;
var idkcount = 0;

init();
initIpcRenderer();


/*const contextMenu = require('electron-context-menu');
const { SSL_OP_NETSCAPE_REUSE_CIPHER_CHANGE_BUG, SSL_OP_NO_SESSION_RESUMPTION_ON_RENEGOTIATION } = require('constants');

            contextMenu({
                prepend: (params, browserWindow) => [
                  {
                    role: "selectAll",
                    visible: params.mediaType === 'text'
                },
                ],
                showInspectElement:false
            });*/

var bot = "";

var edit = false;


var pwtemp = store.get('pwtemp');
store.set('pwtemp','');

var maxim = store.get('max');
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


    if(ontopvar == true){
      let remote = require('electron').remote;
      document.getElementById("topkek").value = "●";
      document.getElementById("topkeki").classList.add("fas");
      document.getElementById("topkeki").classList.remove("far");
      remote.getCurrentWindow().setAlwaysOnTop(true, 'screen');
      var element = document.getElementById("topkek");
      element.classList.add("blau");
    }

    if (dropdown == 1){
      document.getElementById("slt").selectedIndex = "1";
    }
    else if(dropdown == 2)
    {
      document.getElementById("slt").selectedIndex = "2";
    }
        
        if (favbtn == '0'){
          //document.getElementById("favbutton").value = "☆";
          document.getElementById("favbuttoni").classList.remove("fas")
          document.getElementById("favbuttoni").classList.add("far")
        }
        else{
          //document.getElementById("favbutton").value = "★";
          document.getElementById("favbuttoni").classList.add("fas")
          document.getElementById("favbuttoni").classList.remove("far")
          var element = document.getElementById("favbutton");
          element.classList.add("blau");
        }

        /*if(store.get("eventhome") == false)
        {
          ipcRenderer.send('eventhome');
          store.set("eventhome", true);
        }*/

        //document.getElementById("svglelid").style.height = heightvar + "px";
        //document.getElementById("svglelid").style.width = widthvar + "px";

var pwlel = [];

var indexsheesh = "";
var currentfav = "";
var row_index;

var pwkey = 1;

var quitsicherung = true;

function encrypt(text)
{
  return encryptModule(text, pwtemp);
}

function decrypt(text)
{
  return decryptModule(text, pwtemp);
}

var random_id = function(){
  var id_str = Math.random().toString(36).substr(2);
  return id_str;
}

var count = 0;

$(document).ready(function(){
  ipcRenderer.send('checkInBounds');

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
      document.getElementById("txtpassword").placeholder = "Key/Pin";
      document.getElementById("txtusername").placeholder = "";
      document.getElementById("txtusername").disabled = true;
      var element = document.getElementById("txtusername");
      element.classList.remove("effectkreislel");

    }
  });

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

/*var horizontalContainer = document.getElementById("horizontalScroll")
horizontalContainer.addEventListener("wheel", function (e) {
    if (e.deltaY > 0) {
      horizontalContainer.scrollLeft += 100;
      e.preventDefault();
// prevenDefault() will help avoid worrisome 
// inclusion of vertical scroll 
    }
    else {
      horizontalContainer.scrollLeft -= 100;
      e.preventDefault();
    }
  });*/

    //---------------SHEEEEEESH------------------

    
    const getVer = () =>{
      try {
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
            /*for(var i = 1; i<pwlel.length;i++)
            {
              pwlel[i].selectEU = encrypt("username");
            }*/
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
  
        xhr.onerror = function() { 
          $('#con').text('No Connection to Cloud');
          var element = document.getElementById("resetzwei");
          element.classList.remove("hide");
          var elementzwei = document.getElementById("haha");
          elementzwei.classList.add("hide");
          sicherung = false;
         }
        
        xhr.open('POST', 'https://content.dropboxapi.com/2/files/download');
        xhr.setRequestHeader('Authorization', 'Bearer ' + dropboxToken);
        xhr.setRequestHeader('Dropbox-API-Arg', JSON.stringify({
          path: '/pw.json'
        }));
        
        xhr.send();
      } catch (error) {
        console.log(error);
  
        $('#con').text('No Connection to Cloud');
        var element = document.getElementById("resetzwei");
        element.classList.remove("hide");
        var elementzwei = document.getElementById("haha");
        elementzwei.classList.add("hide");
        sicherung = false;
      }
  
    }
    getVer();
    //----------------ENDSHEEEESH-----------------

  
});

function getGroups()
    {
      for(var i = 0; i<pwlel.length; i++)
      {
        if(pwlel[i].id == "0")
        {
          return pwlel[i].groups
        }
      }
    }

    function createOption(name)
    {
      let option = document.createElement("option");
      if(name == "- no group -")
      {
        option.value = "";
      }
      else{
        option.value = name;
      }
      option.append(document.createTextNode(name));
      return option;
    }


    function changeOption()
    {
      document.getElementById('sltgroups').innerHTML = '';
      var groups = getGroups();
      document.getElementById('sltgroups').append(createOption("- no group -"));
      document.getElementById('sltgroups').value == "";
      for(var i = 0; i<groups.length;i++)
      {
        document.getElementById('sltgroups').append(createOption(groups[i]));
      }
    }

  function contextMenubar(id, ID)
  {
    if(slt.value == "Passwort"){
      document.getElementById('KeyPassword').innerText = "Convert to Key";
    }
    else{
      document.getElementById('KeyPassword').innerText = "Convert to Password";
    }
    //document.getElementById('KeyPassword').onclick = function(){changePasswortKey(ID)};
    //document.getElementById('overlay').onclick = function(){overlayfunc(ID)};
    document.getElementById('KeyPassword2').onclick = function(){changePasswortKey(ID); document.getElementById("context-menuvier").classList.remove("active");};
    document.getElementById('overlay2').onclick = function(){overlayfunc(ID); document.getElementById("context-menuvier").classList.remove("active");};
    event.preventDefault();
    var contextElement = document.getElementById("context-menuvier");
    var y = event.clientY;
    var x = event.clientX;
    //var y = window.scrollY + document.querySelector('#'+id+'').getBoundingClientRect().top -70// Y
    //var x = window.scrollX + document.querySelector('#'+id+'').getBoundingClientRect().left - 145 - extr// X
    contextElement.style.top = y + "px";
    contextElement.style.left = x + "px";
    contextElement.classList.add("active");
    contextElement.focus();
  }

  function overlayfunc(id)
  {
    for(i=1;i<pwlel.length;i++)
    {
      var currid = parseInt(pwlel[i].id)
      if(currid == id)
      {
        console.log("bin drin");
        const BrowserWindow = require('electron').remote.BrowserWindow;
        let winoverlay = new BrowserWindow({
          width: 350,
          height: 160,
          minWidth: 350,
          minHeight: 160,
          alwaysOnTop: true,
          show:false,
          frame: false,
          backgroundColor: "red",
          icon: 'pictures/icon.ico',
          contextIsolation: true,
          
          webPreferences: {
            nodeIntegration: true,
            preload: path.join(__dirname, 'js/preload.js')
          }
        }) 
      
        winoverlay.loadURL(url.format( {
          pathname: path.join(__dirname, 'overlay.html'),
          protocol: 'file',
          slashes: true
      
        }))

        //winoverlay.webContents.openDevTools();

        winoverlay.webContents.on('did-finish-load', () => {
          winoverlay.webContents.send ('perm', {titel: decrypt(pwlel[i].titel), username: decrypt(pwlel[i].username), password: decrypt(pwlel[i].password)})
          winoverlay.show()
          remote.getCurrentWindow().minimize();
        })

        winoverlay.webContents.on('close', () => {
          remote.getCurrentWindow().restore();
        })
        return;
      }
    }
  }

  function changePasswortKey(id)
  {
    const slt = document.getElementById('slt');
    var i = 1;
    var count = 1;
    var objPWKEY;
    if(slt.value == "Passwort"){
      for(i=1;i<pwlel.length;i++)
      {
        var currid = parseInt(pwlel[i].id)
        if(currid > 0)
        {
          count++;
        }
        if(currid == id)
        {
          objPWKEY = i;
        }
      }
      pwlel[objPWKEY].id = 0-(count+pwlel.length);
      console.log(0-(count+pwlel.length));
    }
    else{
      for(i=1;i<pwlel.length;i++)
      {
        var currid = parseInt(pwlel[i].id)
        if(currid < 0)
        {
          count++;
        }
        if(currid == id)
        {
          objPWKEY = i;
        }
      }
      console.log((count+pwlel.length))
      pwlel[objPWKEY].id = (count+pwlel.length);
    }
      //var element = document.getElementById("saveBar");
    //element.classList.remove("hide");
    $("#saveBar").slideDown("slow", function(){});
    slt_change();
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
  //var element = document.getElementById("saveBar");
  //element.classList.remove("hide");
  $("#saveBar").slideDown("slow", function(){});
  vorhersaven = true;
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

let timerfunc = null;
const { clipboard } = require('electron');
function copy(text){
  console.log(store.get('copyrightclick'))
  if(store.get('copyrightclick') == true)
  {
    clipboard.writeText(text);
    if(timerfunc != null)
    {
      timerfunc.setstop();
    }
    /*else{
      if(store.get('copystayontop') == true && store.get('ontop') == false)
      {
        ontop();
      }
    }*/
    timerfunc = new TimerFunc(store.get('copyseconds'), false);
    timerfunc.start(store.get('copyseconds'));
  }
}

function countdown(countvar){
    if(countvar !=0)
    {
      $('#con').text('Copied for '+ countvar +' seconds..');
      setTimeout(() => { 
        countdown(countvar-1);
      }, 1000);
    }
    else{
      $('#con').text(bot); 
      clipboard.writeText('');
    }
}

function checkIfInGroups(group){
  var tem = getGroups();
  for(var d = 0; d<tem.length; d++)
  {
    if(tem[d] == group)
    {
        return true;
    }
  }
  return false;
}

function check(id, titel, username, email, password, url, note, fav, created, updated, group, selectEU){
    edit = true;

    changeOption();

    document.getElementById("saverly").value = "✎Edit";
    $('#bg-modal').animate({
      opacity: 1
  }, 'swing');

  $('#bg-modal').css("z-index", "9997");

  $('#timeed').text('created: '+created+',     last updated: '+updated);
    
    indexsheesh = id;
    row_index = $(this).parent('table').index();

    const slt = document.getElementById('slt');
    
    if(checkIfInGroups(group))
    {
      document.getElementById('sltgroups').value = group;
    }
    else{
      document.getElementById('sltgroups').value = "";
    }

    if(selectEU == "email")
    {
      document.getElementById('radio2').checked = "checked";
    }
    else{
      document.getElementById('radio1').checked = "checked";
    }

  if(slt.value == "Passwort")
  {
    document.getElementById("txtpassword").placeholder = "Password";
    var element = document.getElementById("txtUsernameEmailDiv");
    document.getElementById("txtpassword").type = "password";
    document.getElementById("shsh").classList.remove("fa-eye-slash");
    document.getElementById("shsh").classList.add("fa-eye");
    element.classList.remove("hide");
  }
  else{
    document.getElementById("txtpassword").placeholder = "Key/Pin";
    var element = document.getElementById("txtUsernameEmailDiv");
    document.getElementById("txtpassword").type = "text";
    document.getElementById("shsh").classList.remove("fa-eye");
    document.getElementById("shsh").classList.add("fa-eye-slash");
      element.classList.add("hide");
  }
    
  document.getElementById("txttitel").value = titel;
  document.getElementById("txtusername").value = username;
  document.getElementById("txtpassword").value = password;
  document.getElementById("txturl").value = url;
  document.getElementById("txtnote").value = note;
  document.getElementById("txtemail").value = email;
  if(fav == "1")
  {
    document.getElementById("favoritebtn").value = "★";
    document.getElementById("favoritebtni").classList.add("fas")
    document.getElementById("favoritebtni").classList.remove("far")
    var element = document.getElementById("favoritebtn");
    element.classList.add("blau");
  }
  else{
    document.getElementById("favoritebtn").value = "☆";
    document.getElementById("favoritebtni").classList.remove("fas")
    document.getElementById("favoritebtni").classList.add("far")
    var element = document.getElementById("favoritebtn");
    element.classList.remove("blau");
  }
  pwCheck();
}

function testttt(i)
{
  console.log(i);
}

function openrly(i)
{
  document.getElementById("cancel2").setAttribute('onclick','cancel2('+i+')');
  document.getElementById("saverly2").setAttribute('onclick','allesSaven(1, '+i+')');
  $('#bg-modal2').css("z-index", "9998");
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

setTimeout(() => {  $('#bg-modal').css("z-index", "0"); $('#timeed').text('');}, 350);

  $("#lel").attr('disabled', false);

  //document.getElementById("save").style.visibility = "visible";
  indexsheesh = "";
  currentfav = "";

  document.getElementById("context-menuzwei").classList.remove("active");
    document.getElementById("context-menudrei").classList.remove("active");
    document.getElementById("context-menuvier").classList.remove("active");
    var contextElementzwei = document.getElementById("txtpasswordDiv");
    contextElementzwei.classList.remove("bordercolor");
    var contextElementzwei = document.getElementById("txturl");
    contextElementzwei.classList.remove("bordercolor");
    var contextElementzwei = document.getElementById("txtusernameDiv");
    contextElementzwei.classList.remove("bordercolor");
    modalcanc = false;

    setTimeout(() => {  
      document.getElementById("txttitel").value = "";
      document.getElementById("txtusername").value = "";
      document.getElementById("txtpassword").value = "";
      document.getElementById("txturl").value = "";
      document.getElementById("txtnote").value = "";
      document.getElementById("txtemail").value = "";
      document.getElementById("radio1").checked = "checked";
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
      pwCheck();
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
  //return str;
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

  changeOption();
  
  //document.getElementById("save").style.visibility = "hidden";
  $("#lel").attr('disabled', true);
  document.getElementById("saverly").value = "🞤Add";
  var proghom = document.getElementById("progresshome");
  proghom.classList.remove("progred");
  proghom.classList.remove("progyel");
  proghom.classList.remove("proggre");
  proghom.value = "";

  if(favbtn == 0)
  {
    document.getElementById("favoritebtn").value = "☆";
    var element = document.getElementById("favoritebtn");
    document.getElementById("favoritebtni").classList.add("far")
    document.getElementById("favoritebtni").classList.remove("fas")
    element.classList.remove("blau");
  }
  else{
    document.getElementById("favoritebtn").value = "★";
    var element = document.getElementById("favoritebtn");
    document.getElementById("favoritebtni").classList.remove("far")
    document.getElementById("favoritebtni").classList.add("fas")
    element.classList.add("blau");
  }

  const slt = document.getElementById('slt');
  if(slt.value == "Passwort")
  {
    document.getElementById("txtpassword").placeholder = "Password";
    var element = document.getElementById("txtUsernameEmailDiv");
    element.classList.remove("hide");
    var elementzwei = document.getElementById("tools");
    elementzwei.classList.remove("hide");
    document.getElementById("txtpassword").type = "password";
    document.getElementById("shsh").classList.remove("fa-eye-slash");
    document.getElementById("shsh").classList.add("fa-eye");
    $("#strich").css("height","100px");
  }
  else{
    document.getElementById("txtpassword").placeholder = "Key/Pin";
    var element = document.getElementById("txtUsernameEmailDiv");
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

function isValidURL(string) {
  var res = string.match(/(http(s)?:\/\/.)?(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/g);
  return (res !== null)
};


function save(){
  edit = false;

  var titel = document.getElementById("txttitel").value;
  titel = encrypt(titel);
  var username = document.getElementById("txtusername").value;
  username = encrypt(username);
  var password = document.getElementById("txtpassword").value;
  password = encrypt(password);
  var url = document.getElementById("txturl").value;

  var selectEU = "";
  if(document.getElementById("radio1").checked)
  {
    selectEU = encrypt("username");
  }
  else{
    selectEU = encrypt("email");
  }

  url = encrypt(url);
  var note = tarea();
  note = encrypt(note);
  var fav = currentfav;

  var favinform = "";
  if(document.getElementById("favoritebtn").value == "☆")
  {
    favinform = encrypt("0");
    console.log("fav: 0");
  }
  else{
    favinform = encrypt("1");
    console.log("fav: 1");
  }

  if(decrypt(titel) != "" | decrypt(username) != "" | decrypt(password) != "")
  {
    if(indexsheesh == "")
    {
      var count2 = pwlel.length;
      var row_id = random_id();

      const slt = document.getElementById('slt');
      if(slt.value == "Passwort"){
        const idk = {"id":count2.toString(), "fav":favinform, "titel":titel, "username":username, "email": encrypt(document.getElementById("txtemail").value), "password":password, "url":url, "note":note, "created":encrypt(new Date().toLocaleDateString()), "updated":encrypt(new Date().toLocaleDateString()), "group":encrypt(document.getElementById("sltgroups").value), "selectEU":selectEU};
        pwlel.push(idk);
        console.log(idk)
      }
      else{
        var sek = "-" + count2.toString();
        const idk = {"id":sek, "fav":favinform, "titel":titel, "username":username, "email": encrypt(document.getElementById("txtemail").value), "password":password, "url":url, "note":note, "created":encrypt(new Date().toLocaleDateString()), "updated":encrypt(new Date().toLocaleDateString()), "group":encrypt(document.getElementById("sltgroups").value), "selectEU":selectEU};
        pwlel.push(idk);
        console.log(idk)
      }
      console.log(pwlel);
      cancel();
    }
    else{
        var i;
        for(i=0; i < pwlel.length; i++)
        {
          if(pwlel[i].id == indexsheesh)
          {
            console.log(pwlel[i].id + " "+ indexsheesh)
            pwlel[i].titel = titel;
            pwlel[i].username = username;
            pwlel[i].password = password;
            pwlel[i].url = url;
            pwlel[i].note = note;
            pwlel[i].fav = favinform;
            pwlel[i].updated = encrypt(new Date().toLocaleDateString());
            pwlel[i].group = encrypt(document.getElementById("sltgroups").value);
            pwlel[i].email = encrypt(document.getElementById("txtemail").value);
            pwlel[i].selectEU = selectEU;
            cancel();
            break;
          }
        }

    }
    //var element = document.getElementById("saveBar");
    //element.classList.remove("hide");
    $("#saveBar").slideDown("slow", function(){});
    var element = document.getElementById("saveBar");
    element.classList.add("containerlezwei");
    vorhersaven = true;
    changefunc();

  }
  else{
    $('#con').text('Titel, Username and Password need some Information');
  }
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

    for(i=1; i < len; i++)
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
          var em = decrypt(pwlel[i].email);
          em = em.toString().toLowerCase();
          var ur = decrypt(pwurl);
          ur = ur.toString().toLowerCase();
          var no = decrypt(pwnote);
          no = no.toString().toLowerCase();
          
            if(ti.indexOf(a) > -1 || us.indexOf(a) > -1 || ur.indexOf(a) > -1 || em.indexOf(a) > -1 || no.indexOf(a) > -1)
            {
              if(slt.value == "Passwort")
              {
                if(pwlel[i].id > 0)
                {
                  pw += pew(row_id, pwid, pwtitel, pwusername, pwlel[i].email, pwpassword, pwurl, pwnote, pwfav, pwlel[i].created,  pwlel[i].updated, pwlel[i].group, pwlel[i].selectEU, a);
                }
              }
              else{
                if(pwlel[i].id < 0)
                {
                  pw += keky(row_id, pwid, pwtitel, pwusername, pwlel[i].email, pwpassword, pwurl, pwnote, pwfav, pwlel[i].created,  pwlel[i].updated, pwlel[i].group, pwlel[i].selectEU, a);
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

function erzeugeKachel(name)
{

  let i = document.createElement("i");
  i.classList.add("fas");
  i.classList.add("fa-lock");
  i.classList.add("primary");

  let i2 = document.createElement("i");
  i2.classList.add("fas");
  i2.classList.add("fa-file");
  i2.classList.add("primarySize");

    let div = document.createElement("div");
    div.classList.add("kacheldiv");
    div.append(i2);
    div.append(i);

    let a = document.createElement("a");
    a.classList.add("adiv");
    a.append(document.createTextNode(name));

    let divItem = document.createElement("div");
    divItem.classList.add("kacheldiv2");
    divItem.append(div);
    divItem.append(a);

    return divItem;
}

function getVersuch(){
  try {
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
        console.log(e.currentTarget.response);
        let div = document.createElement("div");
        div.id = "containeritems";
        for(var i = 0; i<e.currentTarget.response.entries.length;i++)
        {
          div.append(erzeugeKachel(e.currentTarget.response.entries[i].name.slice(0, -5)));
        }
        document.getElementById("blur").after(div);
        document.getElementById("blur").classList.add("hide");

      }
      else {
        var errorMessage = xhr.response || 'Unable to download file';
        console.log(errorMessage);
        console.log("RICHTIGGGGGGGGGGGGGGG "+errorMessage.error_summary)
        if(errorMessage.error_summary.indexOf("path/not_found/") > -1)
        {
          createFolder(dropboxToken);
        }
      }
    };
    
    xhr.open('POST', 'https://api.dropboxapi.com/2/files/list_folder');
    xhr.setRequestHeader('Authorization', 'Bearer ' + dropboxToken);
    xhr.setRequestHeader('Content-Type', 'application/json');
    
    xhr.send(JSON.stringify({
      "path": "/files",
      "recursive": false,
      "include_media_info": false,
      "include_deleted": false,
      "include_has_explicit_shared_members": false,
      "include_mounted_folders": true,
      "include_non_downloadable_files": true
    }));
  } catch (error) {
    console.log(error);
    console.log("FAAAAAAAAAAAAAAAAAAAAAALSCH")
  }

}

function createFolder(dropboxToken){
  try {
    var xhr = new XMLHttpRequest();
    xhr.responseType = 'json';
    xhr.upload.onprogress = function(evt) {
      var percentComplete = parseInt(100.0 * evt.loaded / evt.total);
      console.log(percentComplete);
    };
    
    xhr.onload = function(e) {
      if (xhr.status === 200) {
        console.log("Folder created")
        console.log(e.currentTarget.response);
      }
      else {
        var errorMessage = xhr.response || 'Unable to download file';
        console.log(errorMessage);
      }
    };
    
    xhr.open('POST', 'https://api.dropboxapi.com/2/files/create_folder_v2');
        xhr.setRequestHeader('Authorization', 'Bearer ' + dropboxToken);
        xhr.setRequestHeader('Content-Type', 'application/json');
        
        xhr.send("{\"path\": \"/files\",\"autorename\": false}");
  } catch (error) {
    console.log(error);
  }
}

function slt_change(){
  const slt = document.getElementById('slt');
  document.getElementById("blur").classList.remove("hide");
  $('#passwort tbody').empty();
  try {
    document.getElementById("containeritems").remove();
  } catch (error) {
    
  }
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
              pw += pew(row_id, pwid, pwtitel, pwusername, pwlel[i].email, pwpassword, pwurl, pwnote, pwfav, pwlel[i].created, pwlel[i].updated, pwlel[i].group, pwlel[i].selectEU);
              count += 1;
            }
          }
          else
          {
            if(pwlel[i].id > 0 && decrypt(pwlel[i].fav) == "1")
            {
              pw += pew(row_id, pwid, pwtitel, pwusername, pwlel[i].email, pwpassword, pwurl, pwnote, pwfav, pwlel[i].created, pwlel[i].updated, pwlel[i].group, pwlel[i].selectEU);
              count += 1;
            }
          }
        }
        if(count == 0)
        {
          $('#coun').text('no Passwords');
        }
        else if(count == 1)
        {
          $('#coun').text(count + ' Password');
        }
        else{
          $('#coun').text(count + ' Passwords');
        }
        document.getElementById('sh').style.display = "inline";
        document.getElementById('progresshome').style.display = "inline";
        document.getElementById('txtpassword').style.width = "206px";
        document.getElementById('txtpassword').style.borderTopRightRadius = "0px";
        document.getElementById('txtpassword').style.borderBottomRightRadius = "0px";
        dropdown = 0;
  }
  else if(slt.value == "Key"){
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
              pw += keky(row_id, pwid, pwtitel, pwusername, pwlel[i].email, pwpassword, pwurl, pwnote, pwfav, pwlel[i].created, pwlel[i].updated, pwlel[i].group, pwlel[i].selectEU);
              count += 1;
          }
        }
        else{
          if(pwlel[i].id < 0 && decrypt(pwlel[i].fav) == "1")
          {
              pw += keky(row_id, pwid, pwtitel, pwusername, pwlel[i].email, pwpassword, pwurl, pwnote, pwfav, pwlel[i].created, pwlel[i].updated, pwlel[i].group, pwlel[i].selectEU);
              count += 1;
          }
        }
      }
      if(count == 0)
      {
        $('#coun').text('no Keys');
      }
      else if(count == 1)
      {
        $('#coun').text(count + ' Key');
      }
      else{
        $('#coun').text(count + ' Keys');
      }
      document.getElementById('sh').style.display = "none";
      document.getElementById('progresshome').style.display = "none";
      document.getElementById('txtpassword').style.width = "240px";
      document.getElementById('txtpassword').style.borderTopRightRadius = "10px";
      document.getElementById('txtpassword').style.borderBottomRightRadius = "10px";
      dropdown = 1;
  }
  else{
    store.set('dropdown', 2);
    getVersuch();
  }
  $('#passwort').append(pw);
}

function ex(){
  if(vorhersaven == true)
  {
    openrly(2)
    return;
  }
  //if(sicherung == false)
  //{
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
    ipcRenderer.send('close_app');
  }
  else{
    window.close();
  }
//}
//else{
  //$('#con').text('Working.. Please wait');
  //setTimeout(() => {  $('#con').text(bot); }, 2000);
//}
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
  document.getElementById("hideAllesSavenLbl").classList.add("hide");
  var amk = []

  if(pwlel[0].groups == null)
  {
    amk.push({"id":"0", "groups":[]})
  }
  else{
    amk.push({"id":"0", "groups":getGroups()})
  }

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

    if(newid != 0)
    {
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
      var group = "";
      if(pwlel[i].group != null)
      {
        group = pwlel[i].group;
      }
      var email = encrypt("");
      if(pwlel[i].email != null || pwlel[i].email != "")
      {
        email = pwlel[i].email;
      }
      var selectEU = encrypt("");
      if(pwlel[i].selectEU != null)
      {
        selectEU = pwlel[i].selectEU;
      }
      amk.push({"id":""+newid, "fav":""+fav, "titel":titel, "username":username, "email":email, "password":password,"url":url,"note":note, "created":created, "updated":updated, "group":group, "selectEU":selectEU});
    }
  }
  uploadFile(JSON.stringify(amk, null, 1), ind, wer);
}

function favfunc(id){
  //var element = document.getElementById("saveBar");
  //element.classList.remove("hide");
  $("#saveBar").slideDown("slow", function(){});
  vorhersaven = true;
  var i;
  for(i=0; i < pwlel.length; i++)
  {
    if(pwlel[i].id == id)
    {
      if(decrypt(pwlel[i].fav) == "1")
      {
        pwlel[i].fav = encrypt("0");
        changefunc();
        break;
      }
      else{
      if(decrypt(pwlel[i].fav) == "0")
      {
        pwlel[i].fav = encrypt("1");
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
              pw += pew(row_id, pwid, pwtitel, pwusername, pwlel[i].email, pwpassword, pwurl, pwnote, pwfav, pwlel[i].created,  pwlel[i].updated, pwlel[i].group, pwlel[i].selectEU);
            }
          }
          else
          {
            if(pwlel[i].id > 0 && decrypt(pwlel[i].fav) == "1")
            {
              pw += pew(row_id, pwid, pwtitel, pwusername, pwlel[i].email, pwpassword, pwurl, pwnote, pwfav, pwlel[i].created,  pwlel[i].updated, pwlel[i].group, pwlel[i].selectEU);
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
              pw += keky(row_id, pwid, pwtitel, pwusername, pwlel[i].email, pwpassword, pwurl, pwnote, pwfav, pwlel[i].created, pwlel[i].updated, pwlel[i].group, pwlel[i].selectEU);
          }
        }
        else{
          if(pwlel[i].id < 0 && decrypt(pwlel[i].fav) == "1")
          {
              pw += keky(row_id, pwid, pwtitel, pwusername, pwlel[i].email, pwpassword, pwurl, pwnote, pwfav, pwlel[i].created, pwlel[i].updated, pwlel[i].group, pwlel[i].selectEU);
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
    //document.getElementById("favbutton").value = "★";
    document.getElementById("favbuttoni").classList.add("fas")
    document.getElementById("favbuttoni").classList.remove("far")
    var element = document.getElementById("favbutton");
    element.classList.add("blau");
    slt_change();
  }
  else{
    favbtn = 0;
    store.set('favbtn',0);
    //document.getElementById("favbutton").value = "☆";
    document.getElementById("favbuttoni").classList.remove("fas")
    document.getElementById("favbuttoni").classList.add("far")
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
    document.getElementById("favoritebtni").classList.add("fas")
    document.getElementById("favoritebtni").classList.remove("far")
  }
  else{
    document.getElementById("favoritebtn").value = "☆";
    var element = document.getElementById("favoritebtn");
    document.getElementById("favoritebtni").classList.add("far")
    document.getElementById("favoritebtni").classList.remove("fas")
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
  //if(sicherung == false){
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

    remote.getCurrentWindow().removeAllListeners('resize');
    remote.getCurrentWindow().removeAllListeners('focus');
    remote.getCurrentWindow().removeAllListeners('blur');
    remote.getCurrentWindow().removeAllListeners('unmaximize');
    remote.getCurrentWindow().removeAllListeners('maximize');
    /*ipcRenderer.removeListener('restart_app');
    ipcRenderer.removeListener('exit');
    ipcRenderer.removeListener('download');*/
    ipcRenderer.removeAllListeners();
        
        const winSettings = remote.getCurrentWindow();
        winSettings.loadURL(url.format( {
          pathname: path.join(__dirname, 'settings.html'),
          protocol: 'file',
          slashes: true
        }))
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

xhr.onerror = function () {
  sicherung = false;
  var element = document.getElementById("hahaha");
  element.classList.add("hide");
  document.getElementById("hideAllesSavenLbl").classList.remove("hide");
  $('#con').text("Something went wrong..");
}
 
xhr.onload = function() {
  if (xhr.status === 200) {
    var fileInfo = JSON.parse(xhr.response);
    sicherung = false;
    console.log(fileInfo);
    var element = document.getElementById("hahaha");
    element.classList.add("hide");
    document.getElementById("hideAllesSavenLbl").classList.remove("hide");
    //var element = document.getElementById("saveBar");
  //element.classList.add("hide");
  vorhersaven = false;
  $("#saveBar").slideUp("slow", function(){});
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
    console.log(errorMessage);
    sicherung = false;
    var element = document.getElementById("hahaha");
    element.classList.add("hide");
    document.getElementById("hideAllesSavenLbl").classList.remove("hide");
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
  document.getElementById('cont').innerText = text;
  event.preventDefault();
  var contextElement = document.getElementById("context-menu");
  //var y = event.clientY - 20;
  //var x = event.clientX - 170 - extr;
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

function showContextMenuText()
{
  document.getElementById('copyItem').onclick = function(){
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
  document.getElementById("context-menuText").focus();
}

function yee(){
  document.getElementById("context-menuText").classList.remove("active");
}

function getSelectionText() {
  var text = "";
  if (window.getSelection) {
      text = window.getSelection().toString();
  } else if (document.selection && document.selection.type != "Control") {
      text = document.selection.createRange().text;
  }
  return text;
}

window.addEventListener("click",function(){
  document.getElementById("context-menu").classList.remove("active");
  //document.getElementById("context-menuText").classList.remove("active");
});

function removeContextMenu()
{
  document.getElementById("context-menuvier").classList.remove("active");
}

function analy(){
  if(vorhersaven == true)
  {
    openrly(1)
    return;
  }
  //if(sicherung == false){
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
  remote.getCurrentWindow().removeAllListeners('resize');
  remote.getCurrentWindow().removeAllListeners('focus');
  remote.getCurrentWindow().removeAllListeners('blur');
  remote.getCurrentWindow().removeAllListeners('unmaximize');
  remote.getCurrentWindow().removeAllListeners('maximize');
    ipcRenderer.removeAllListeners('restart_app');
    ipcRenderer.removeAllListeners('exit');
    ipcRenderer.removeAllListeners('download');
    ipcRenderer.removeAllListeners('downloaded');
  winAnalytics.loadURL(url.format( {
    pathname: path.join(__dirname, 'analytics.html'),
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
    document.getElementById("shsh").classList.remove("fa-eye");
    document.getElementById("shsh").classList.add("fa-eye-slash");
    document.getElementById("txtpassword").type = "text";
    $('#con').text("Hide Password");
  }
  else{
    document.getElementById("shsh").classList.remove("fa-eye-slash");
    document.getElementById("shsh").classList.add("fa-eye");
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

function showpwgen(){

  event.preventDefault();
  var contextElement = document.getElementById("context-menuzwei");
  contextElement.classList.add("active");
  onclvar = true;
  var contextElementzwei = document.getElementById("txtpasswordDiv");
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
    var contextElementzwei = document.getElementById("txtusernameDiv");
    contextElementzwei.classList.add("bordercolor");
    var contextElementzwei = document.getElementById("txtpasswordDiv");
    contextElementzwei.classList.add("bordercolor");
  }
  qrcodefunc();
}

function urlwifi(){
  const slt = document.getElementById('sltzwei');
  if(slt.value == "URL"){
    var contextElementzwei = document.getElementById("txturl");
    contextElementzwei.classList.add("bordercolor");
    var contextElementzwei = document.getElementById("txtusernameDiv");
    contextElementzwei.classList.remove("bordercolor");
    var contextElementzwei = document.getElementById("txtpasswordDiv");
    contextElementzwei.classList.remove("bordercolor");

    var contextElementzwei = document.getElementById("lelzwei");
    contextElementzwei.classList.add("disablediv");
    
  }
  else{
    var contextElementzwei = document.getElementById("txtusernameDiv");
    contextElementzwei.classList.add("bordercolor");
    var contextElementzwei = document.getElementById("txtpasswordDiv");
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
const SYMBOL_CHAR_CODES = arrayFromLowToHigh(33, 33).concat(arrayFromLowToHigh(35, 47)).concat(arrayFromLowToHigh(58, 64)).concat(arrayFromLowToHigh(91, 96)).concat(arrayFromLowToHigh(123, 126))

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
    var contextElementzwei = document.getElementById("txtpasswordDiv");
    contextElementzwei.classList.remove("bordercolor");
    var contextElementzwei = document.getElementById("txturl");
    contextElementzwei.classList.remove("bordercolor");
    var contextElementzwei = document.getElementById("txtusernameDiv");
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
      var contextElementzwei = document.getElementById("txtpasswordDiv");
      contextElementzwei.classList.add("bordercolor");
    }
    if(sltdrei.value == "No Password"){
      wpa = "nopass";
      console.log(wpa);
      var contextElementzwei = document.getElementById("txtpasswordDiv");
      contextElementzwei.classList.remove("bordercolor");
    }
    if(sltdrei.value == "WEP"){
      wpa = "WEP";
      console.log(wpa);
      var contextElementzwei = document.getElementById("txtpasswordDiv");
      contextElementzwei.classList.add("bordercolor");
    }
    if(sltdrei.value == "WPA2-EAP"){
      wpa = "WPA2-EAP";
      console.log(wpa);
      var contextElementzwei = document.getElementById("txtpasswordDiv");
      contextElementzwei.classList.add("bordercolor");
    }
    textqr = "WIFI:T:" + wpa + ";S:" + qrname + ";P:"+ qrpw +";;";
    console.log(textqr);
  }

  var QRCode = require('qrcode')
  var canvas = document.getElementById('canvas')
 
  QRCode.toCanvas(canvas, textqr, function (error) {
    if (error) console.error(error)
    console.log('success! '+textqr);
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

function closesec(){

  document.getElementById("sec").classList.remove("containerlezwei");
  document.getElementById("sec").classList.add("containerremove");
  setTimeout(() => {  document.getElementById("sec").classList.add("hide"); }, 600);
}

const { remote } = require('electron');

function once(){
  const bounds = remote.getCurrentWindow().getSize();
  document.getElementById("scrollbar-custom").style.height = bounds[1]-155 +"px";
}
once();

remote.getCurrentWindow().on('resize', function() {
  const bounds = remote.getCurrentWindow().getSize();
  document.getElementById("scrollbar-custom").style.height = bounds[1]-155 +"px";
  //document.getElementById("passwort").style.width = bounds[1]-150 +"px";
});


function pwCheck(){
  var wort = document.getElementById("txtpassword").value;
  if(wort == "")
  {
    var proghom = document.getElementById("progresshome");
    proghom.classList.remove("progred");
    proghom.classList.remove("progyel");
    proghom.classList.remove("proggre");
    proghom.value = "";
    return;
  }

  var sheesh = checkPassword(wort);
    
  var proghom = document.getElementById("progresshome");
  proghom.classList.remove("progred");
  proghom.classList.remove("progyel");
  proghom.classList.remove("proggre");

    if(sheesh < 10){
      proghom.classList.add("progred");
    }
    if(sheesh >= 10 && sheesh < 13){
      proghom.classList.add("progyel");
    }
    if(sheesh >= 13){
      proghom.classList.add("proggre");
    }
    console.log(sheesh);
    document.getElementById("progresshome").value = ""+sheesh;
}

function opconsfunc()
{
  let remote = require('electron').remote;
  remote.getCurrentWindow().webContents.openDevTools();
  closesec();
}

Mousetrap.bind(['command+f', 'ctrl+f'], function() {
  document.getElementById('search').focus()
  return false;
});

function checkEmptyEmail(){
  if(document.getElementById("txtemail").value == "")
  {
    document.getElementById("radio1").checked = "checked";
  }
}

function checkEmptyUsername(){
  if(document.getElementById("txtusername").value == "")
  {
    document.getElementById("radio2").checked = "checked";
  }
}





  
  
      
  
      
      
      
      
