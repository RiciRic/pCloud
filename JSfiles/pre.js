const electron = require('electron');
const { ipcRenderer, webContents, remote } = require("electron");
const { app, BrowserWindow, Menu } = require('electron')

ipcRenderer.on("scope", (event, arg) => {
  document.querySelector(".radio__label").click();
  document.querySelector("#app_folder_permission").click();
  //document.querySelectorAll("body").style.backgroundColor = "red";
  document.querySelector("#app-name").value = arg.text;
});

ipcRenderer.on("app", () => {
  document.querySelector("#app_folder_permission").click();
});

ipcRenderer.on("pcloudinhalt", (event, arg) => {
  document.querySelector("#app-name").value = arg.text;
  console.log("hallo");
});

ipcRenderer.on("ausf", () => {
let x = document.body.querySelectorAll('.button-primary');
 let index = 0;
 for(index=0; index < x.length; index++) {
    if(x[index].type = "submit")
    {
      x[index].disabled = false;
      x[index].click();
    }
 }
});

ipcRenderer.on("permission", (event, arg) => {
  //let x = document.body.querySelectorAll('a');
  //console.log(x[13])
  //x[13].click();

  let a = document.body.querySelectorAll('input');
  for(index=0; index < a.length; index++) {
    if(a[index].value == "Generate")
    {
      a[index].click();
    }
 }

  let y = document.body.querySelectorAll('input');
  for(index=0; index < y.length; index++) {
    if(y[index].id = "files.content.write")
    {
      if(y[index].name == "files.content.write")
      {
        y[index].click();
      }
      if(y[index].name == "files.content.read")
      {
        y[index].click();
      }
    }
 }

  let z = document.body.querySelectorAll('button');
  console.log(z[4]);
  z[4].click();

  let x = document.body.querySelectorAll('option');
  x[3].selected = "selected"

});

ipcRenderer.on("getToken", (event, arg) => {
  let a = document.body.querySelectorAll('input');
  for(index=0; index < a.length; index++) {
    if(a[index].id == "generated-token")
    {
      a[index].click();

      var text = "";
      if (window.getSelection) {
          text = window.getSelection().toString();
      } else if (document.selection && document.selection.type != "Control") {
          text = document.selection.createRange().text;
      }

      console.log(text);
      event.sender.send("Tokensetzen", {token:text});
      console.log("bitte");
    }
 }
});

ipcRenderer.on("testen", (event, arg) => {
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
      
      xhr.open('https://content.dropboxapi.com/2/files/download');
      xhr.setRequestHeader('Authorization', 'Bearer ' + dropboxToken);
      xhr.
      
      xhr.send();
});