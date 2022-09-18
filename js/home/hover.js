function mover(playidd, delid, edid, usid, passid, favid)
{
  document.getElementById(delid).classList.remove("gray");
  document.getElementById(edid).classList.remove("gray");
  document.getElementById(usid).classList.remove("nada");
  document.getElementById(passid).classList.remove("nada");
  document.getElementById(favid).classList.remove("gray");
  try {
    document.getElementById(playidd).classList.remove("gray");
  } catch (error) {
    
  }
}

function mleave(playidd, delid, edid, usid, passid, favid)
{
  document.getElementById(delid).classList.add("gray");
  document.getElementById(edid).classList.add("gray");
  document.getElementById(usid).classList.add("nada");
  document.getElementById(passid).classList.add("nada");
  document.getElementById(favid).classList.add("gray");
  try {
    document.getElementById(playidd).classList.add("gray");
  } catch (error) {
    
  }
}

function mover2(delid, edid, passid, playidd, favid)
{
  document.getElementById(delid).classList.remove("gray");
  document.getElementById(edid).classList.remove("gray");
  document.getElementById(passid).classList.remove("nada");
  document.getElementById(favid).classList.remove("gray");
  try {
    document.getElementById(playidd).classList.remove("gray");
  } catch (error) {
    
  }
}

function mleave2(delid, edid, passid, playidd, favid)
{
  document.getElementById(delid).classList.add("gray");
  document.getElementById(edid).classList.add("gray");
  document.getElementById(passid).classList.add("nada");
  document.getElementById(favid).classList.add("gray");
  try {
    document.getElementById(playidd).classList.add("gray");
  } catch (error) {
    
  }
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
  //var element = document.getElementById("saveBar");
  //element.classList.remove("hide");
  $("#saveBar").slideDown("slow", function(){});
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

function ope(link){
  if(link.charAt(0) == "w" && link.charAt(1) == "w" && link.charAt(2) == "w" && link.charAt(3) == ".")
  {
    link = "https://" + link;
  }
  const {shell} = require('electron')
  shell.openExternal(link);
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
  //var element = document.getElementById("saveBar");
  //element.classList.remove("hide");
  $("#saveBar").slideDown("slow", function(){});
  vorhersaven = true;
}