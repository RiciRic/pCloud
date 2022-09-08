function stern(lel){
  var stern = "";
  for (i = 0; i < lel.length; i++) {
    stern = stern + "*"
  }
  return stern;
}

function highl(str, search){
  for(var i = 0; i<str.length;i++)
  {
    if(str.toLowerCase().charAt(i) == search.toLowerCase().charAt(0))
    {
      for(var b = 0; b<search.length;b++)
      {
        var start = i;
        var stop;
        if(str.toLowerCase().charAt(i+b) == search.toLowerCase().charAt(b))
        {
          if(b==search.length-1)
          {
            stop = i+b;
            var output = str.substring(0, start) + '<span class="highl">' + str.substring(start);
            output = output.substring(0, stop+21) + '</span>' + output.substring(stop+21);
            return output;
          }
        }
        else{
          break;
        }
      }
    }
  }
}

function anfang(){
  return '<tr style="cursor:pointer" onclick="sortieren()"><th></th><th></th><th class="labeltable">Titel</th><th class="labeltable">Username/E-Mail</th><th></th><th class="labeltable">Password</th><th></th><th></th><th class="labeltable">URL</th><th class="labeltable"></th><th></th></tr>';
}

function anfangzwei(){
  return '<tr style="cursor:pointer" onclick="sortieren()"><th></th><th></th><th class="labeltable">Titel</th><th class="labeltable">Key/Pin</th><th></th><th class="labeltable">URL</th><th class="labeltable"></th><th></th></tr>';
}
  
function pew(row_id, id, titel, username, email, password, url, note, fav, created, updated, group, selectEU, a){
  var dec = decrypt(password);
  var us = decrypt(username);
  var em = decrypt(email)
  var ur = decrypt(url);
  var groupvar = decrypt(group);
  var createdvar = decrypt(created);
  var updatedvar = decrypt(updated);
  var favvar = decrypt(fav);

  var usem = "";
  if(decrypt(selectEU) == "username")
  {
    usem = us;
  }
  else{
    usem = em;
  }
  var pw = "";
      pw += '<tr row_id="' + row_id +'" id="table-row'+row_id+'" onmouseover="mover(\''+"urlid"+id+'\', \''+"delete"+id+'\', \''+"ed"+id+'\', \''+"username"+id+'\', \''+"password"+id+'\', \''+"titel"+id+'\')" onmouseleave="mleave(\''+"urlid"+id+'\', \''+"delete"+id+'\', \''+"ed"+id+'\', \''+"username"+id+'\', \''+"password"+id+'\', \''+"titel"+id+'\')" draggable="true" ondragstart="start(\''+id+'\')" ondragover="dragover(\'table-row'+row_id+'\')" onDragLeave="dragleave(\'table-row'+row_id+'\')" onDrop="std(\''+id+'\')" class="trsh bordertr" ondblclick="check(\''+ id + '\', \'' + decrypt(titel) + '\', \''+ us + '\', \''+ decrypt(email) + '\', \'' + dec + '\', \'' + ur + '\', \'' + decrypt(note) +'\', \'' + favvar + '\', \'' + createdvar + '\', \'' + updatedvar + '\', \'' + groupvar + '\', \'' + decrypt(selectEU) + '\')">';
      if(favvar == "1"){
      pw += '<td><button type="button" style="padding: 0px 5px 2px 5px; font-size: 15px; color: rgb(1, 138, 230); border-radius: 50%;" class="buttonzwei effectbuttonanders gray" id="titel' + id + '" onclick="favfunc(\'' + id + '\')" value="★" /><i id="i' + id + '" class="fas fa-star"></i></button></td>';
      }
      else{
        pw += '<td><button type="button" style="padding: 0px 5px 2px 5px; font-size: 15px; border-radius: 50%;" class="buttonzwei effectbuttonanders gray" id="titel' + id + '" onclick="favfunc(\'' + id + '\')" value="☆" /><i id="i' + id + '" class="far fa-star"></i></button></td>';
      }
      if(ur == ""){
        pw += '<td style="user-select: none;"></td>';
      }
      else{
        pw += '<td style="user-select: none;"><img style="max-width:16px; max-height:16px;" src="https://www.google.com/s2/favicons?domain=' + ur + '"></td>';
      }
      var dectit = decrypt(titel);
      if(a != null && dectit.toLowerCase().indexOf(a.toLowerCase()) > -1){
        dectit = highl(dectit, a);
        pw += '<td><div class="labelzwei" oncontextmenu="contextMenubar(\''+"table-row"+row_id+'\', \''+id+'\')" edit_type="click" col_name="tit">' + dectit + '</div></td>';
      }
      else{
        pw += '<td><div class="labelzwei" oncontextmenu="contextMenubar(\''+"table-row"+row_id+'\', \''+id+'\')" edit_type="click" col_name="tit">' + dectit + '</div></td>';
      }
      var decus = kurz(usem);
      if(a != null && decus.toLowerCase().indexOf(a.toLowerCase()) > -1){
        decus = highl(decus, a);
        pw += '<td><div class="labelzwei" edit_type="click" col_name="user" oncontextmenu="copy(\'' + usem + '\')">' + decus + '</div></td>';
      }
      else{
        pw += '<td><div class="labelzwei" edit_type="click" col_name="user" oncontextmenu="copy(\'' + usem + '\')">' + decus + '</div></td>';
      }
      pw += '<td><button class="buttonzwei effectbuttonanders nada" id="username' + id + '" style="outline: 0;" onmouseover="copyus()" onmouseout="leave()" onclick="copy(\'' + usem + '\')" value="🗐" /><i class="fas fa-copy"></i></button>' +'</td>';
      pw += '<td><div class="labelzwei" edit_type="click" col_name="psw" oncontextmenu="copy(\'' + dec + '\')">' + kurzst(stern(dec)) + '</div></td>'
      pw += '<td><button type="button" class="buttonzwei effectbuttonanders" id="auge' + id + '" onfocusout="mouseUp()" onmouseover="showbot()" onmouseout="leave()" onmousedown="mouseDown(\'' + dec + "\', \'auge" + id + '\')" onmouseup="mouseUp()" value="👁" /><i class="far fa-eye"></i></button>' +'</td>';
      pw += '<td><button class="buttonzwei effectbuttonanders nada" id="password' + id + '" style="outline: 0;" onmouseover="copypw()" onmouseout="leave()" onclick="copy(\'' + dec + '\')" value="🗐" /><i class="fas fa-copy"></i></button>' +'</td>';
      if(ur == ""){
        pw += '<td style="user-select: none;"></td>';
      }
      else{
        pw += '<td><button style="outline: 0;" type="button" class="buttonzwei effectbuttonanders gray" id="urlid' + id + '" onmouseover="run()" onmouseout="leave()"  onclick="ope(\'' + ur + '\')" value="ᐅ" /><i class="fas fa-play"></i></button>' +'</td>';
      }
      pw += '<td><div class="labelzwei" edit_type="click" col_name="but">' + '<button data-modal-target="#modallel" type="button" style="outline: 0;" class="buttonzwei effectbuttonanders gray" id="ed' + id + '" onmouseover="editme()" onmouseout="leave()" onclick="check(\''+ id + '\', \'' + decrypt(titel) + '\', \''+ us + '\', \''+ decrypt(email) + '\', \'' + dec + '\', \'' + ur + '\', \'' + decrypt(note) +'\', \'' + favvar + '\', \'' + createdvar + '\', \'' + updatedvar + '\', \'' + groupvar + '\', \'' + decrypt(selectEU) + '\')" value="✎" /><i class="far fa-edit"></i></button></td>';
      pw += '<td><button type="button" onmouseover="entfern()" onmouseout="leave()" class="buttonzwei btn_row_delete rot gray" id="delete' + id + '" value="✖" onclick="del(' + id +')"><i class="fas fa-times"></i></button>' + '</td>';
      pw += '</tr>';
      /*if(a != null && decrypt(titel).indexOf(a) != -1){
        pw.replace(a, '<span class="highl">'+a+'</span>')
      }*/
      return pw;

}

  function keky(row_id, id, titel, username, email, password, url, note, fav, created, updated, group, selectEU, a){
    var pw = "";
    var ur = decrypt(url);
    var groupvar = decrypt(group);
    var createdvar = decrypt(created);
    var updatedvar = decrypt(updated);
    var favvar = decrypt(fav);
  
    pw += '<tr row_id="' + row_id +'" id="table-row'+row_id+'" onmouseover="mover2(\''+"delete"+id+'\', \''+"ed"+id+'\', \''+"password"+id+'\', \''+"urlid"+id+'\', \''+"titel"+id+'\')" onmouseleave="mleave2(\''+"delete"+id+'\', \''+"ed"+id+'\', \''+"password"+id+'\', \''+"urlid"+id+'\', \''+"titel"+id+'\')" draggable="true" ondragstart="start(\''+id+'\')" ondragover="dragover(\'table-row'+row_id+'\')" onDragLeave="dragleave(\'table-row'+row_id+'\')" onDrop="std(\''+id+'\')" class="trsh bordertr" ondblclick="check(\''+ id + '\', \'' + decrypt(titel) + '\', \''+ decrypt(username) + '\', \''+ decrypt(email) + '\', \'' + decrypt(password) + '\', \'' + decrypt(url) + '\', \'' + decrypt(note) +'\', \'' + favvar + '\', \'' + createdvar + '\', \'' + updatedvar + '\', \'' + groupvar + '\', \'' + decrypt(selectEU) + '\')">';
    if(favvar == "1"){
      pw += '<td><button type="button" style="padding: 0px 5px 2px 5px; font-size: 15px; color: rgb(1, 138, 230); border-radius: 50%;" class="buttonzwei effectbuttonanders gray" id="titel' + id + '" onclick="favfunc(\'' + id + '\')" value="★" /><i id="i' + id + '" class="fas fa-star"></i></button></td>';
      }
      else{
        pw += '<td><button type="button" style="padding: 0px 5px 2px 5px; font-size: 15px; border-radius: 50%;" class="buttonzwei effectbuttonanders gray" id="titel' + id + '" onclick="favfunc(\'' + id + '\')" value="☆" /><i id="i' + id + '" class="far fa-star"></i></button></td>';
      }
    if(ur == ""){
      pw += '<td style="user-select: none;"></td>';
    }
    else{
      pw += '<td style="user-select: none;"><img style="max-width:16px; max-height:16px;" src="https://s2.googleusercontent.com/s2/favicons?domain=' + ur + '"></td>';
    }
    var dectit = decrypt(titel);
    if(a != null && dectit.toLowerCase().indexOf(a.toLowerCase()) > -1){
      dectit = highl(dectit, a);
      pw += '<td><div class="labelzwei" edit_type="click" oncontextmenu="contextMenubar(\''+"table-row"+row_id+'\', \''+id+'\')" col_name="tit">' + dectit + '</div></td>';
    }
    else{
      pw += '<td><div class="labelzwei" edit_type="click" oncontextmenu="contextMenubar(\''+"table-row"+row_id+'\', \''+id+'\')" col_name="tit">' + dectit + '</div></td>';
    }
    pw += '<td><div class="labelzwei" edit_type="click" col_name="psw" oncontextmenu="copy(\'' + decrypt(password) + '\')">' + decrypt(password) + '</div></td>';
    pw += '<td><button class="buttonzwei effectbuttonanders nada" id="password' + id + '" onmouseover="copykey()" onmouseout="leave()" onclick="copy(\'' + decrypt(password) + '\')" value="🗐" /><i class="fas fa-copy"></i></button>' +'</td>';
    if(ur == ""){
      pw += '<td style="user-select: none;"></td>';
    }
    else{
      pw += '<td><button type="button" class="buttonzwei effectbuttonanders gray" id="urlid' + id + '" onmouseover="run()" onmouseout="leave()" onclick="ope(\'' + ur + '\')" value="ᐅ" /><i class="fas fa-play"></i></button>' +'</td>';
    }
    pw += '<td><div class="labelzwei" edit_type="click" col_name="but">' + '<button data-modal-target="#modallel" type="button" class="buttonzwei effectbuttonanders gray" id="ed' + id + '" onmouseover="editmekey()" onmouseout="leave()" onclick="check(\''+ id + '\', \'' + decrypt(titel) + '\', \''+ decrypt(username) + '\', \''+ decrypt(email) + '\', \'' + decrypt(password) + '\', \'' + ur + '\', \'' + decrypt(note) +'\', \'' + favvar + '\', \'' + createdvar + '\', \'' + updatedvar + '\', \'' + groupvar + '\', \'' + decrypt(selectEU) + '\')" value="✎" /><i class="far fa-edit"></i></button></td>';
    pw += '<td><button type="button" class="buttonzwei btn_row_delete rot gray" id="delete' + id + '" value="✖" onmouseover="entfernkey()" onmouseout="leave()" onclick="del('+ id +')"><i class="fas fa-times"></i></button>' + '</td>';
    pw += '</tr>';
    return pw;
  }

  const table = {
    anfang: anfang,
    anfangzwei: anfangzwei,
    pew: pew,
    keky: keky
  };

  module.exports = table;