const stringEntropy = require('fast-password-entropy')

function stern(lel){
  var stern = "";
  for (i = 0; i < lel.length; i++) {
    stern = stern + "*"
  }
  return stern;
}

function anfang(){
  return '<tr><th class="analy"></th><th class="analy"></th><th class="labeltable analy">Titel</th><th class="labeltable analy">Username</th><th class="labeltable analy">Password</th><th class="analy"></th><th class="labeltable analy">Entropy</th><th class="analy"></th></tr>';
}
  
function pew(row_id, id, titel, username, password, url, note, count){
  var decrPw = decrypt(password);
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
      pw += '<td><div class="labelzwei" edit_type="click" col_name="psw">' + stern(decrPw) + '</div></td>'
      pw += '<td><button type="button" class="buttonzwei effectbuttonanders" id="auge' + id + '" onfocusout="mouseUp()" onmousedown="mouseDown(\'' + decrPw + '\', \'auge' + id + '\')" onmouseup="mouseUp()" value="👁"><i class="far fa-eye"></i></button>' +'</td>';
      pw += '<td><div class="labelzwei" edit_type="click" col_name="entropy">' + stringEntropy(decrPw) + ' bits</div></td>';
      var ch = pwcheckAnfang(decrPw);
      if(ch < 10){
        pw += '<td><div class="labelzwei" style="color:'+colorred+';" edit_type="click" col_name="kak"><i class="fas fa-circle"></i></div></td>';
      }
      if(ch >= 10 && ch < 13){
        pw += '<td><div class="labelzwei" style="color:'+coloryellow+';" edit_type="click" col_name="kak"><i class="fas fa-circle"></i></div></td>';
      }
      if(ch >= 13){
        pw += '<td><div class="labelzwei" style="color:'+colorgreen+';" edit_type="click" col_name="kak"><i class="fas fa-check-circle"></i></div></td>';
      }
      pw += '</tr>';
      return pw;
  }

  const table = {
    anfang: anfang,
    pew: pew
  };

  module.exports = table;