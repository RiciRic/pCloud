const store = require('../storedata.js');

const bot = "";

/**
 * Sets dark or light theme.
 * Value 0 sets dark theme.
 * Value 1 sets light theme.
 */
const theme = () =>
{
  var theme = store.get('theme');

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
}

/**
 * Create hover events for informationbox.
 */
const hover = () =>
{
  $('#droptok').hover(function(){$('#con').text('Token');},
  function() {$('#con').text(bot);});

  $('#clcache').hover(function(){document.getElementById("clcache").style.cursor = "pointer";},
  function() {document.getElementById("clcache").style.cursor = "initial";});

  $('#dropdropa').hover(function(){document.getElementById("dropdropa").style.cursor = "pointer";},
  function() {document.getElementById("dropdropa").style.cursor = "initial";});

  $('#hideqr').hover(function(){document.getElementById("hideqr").style.cursor = "pointer";},
  function() {document.getElementById("hideqr").style.cursor = "initial";});

  $('#currkeybut').hover(function(){document.getElementById("currkeybut").style.cursor = "pointer";},
  function() {document.getElementById("currkeybut").style.cursor = "initial";});

  $('#genkeybut').hover(function(){document.getElementById("genkeybut").style.cursor = "pointer";},
  function() {document.getElementById("genkeybut").style.cursor = "initial";});

  $('#clcache').hover(function(){$('#con').text('Delete some files that aren\'t nessessary anymore');},
  function() {$('#con').text(bot);});

  $('#tokenshow').hover(function(){$('#con').text('Show current Token');},
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

  $('#btncloud').hover(function(){$('#con').text('Set up Dropbox');},
  function() {$('#con').text(bot);});

  $('#btnexp').hover(function(){$('#con').text('Export your Settings');},
  function() {$('#con').text(bot);});

  $('#btnimp').hover(function(){$('#con').text('Import your Settings');},
  function() {$('#con').text(bot);});

  $('#btnopenbackup').hover(function(){$('#con').text('Import your Passwords');},
  function() {$('#con').text(bot);});

  $('#btnsavebackup').hover(function(){$('#con').text('Export your Passwords');},
  function() {$('#con').text(bot);});

  $('#enkeybut').hover(function(){$('#con').text('Overwrite current Key');},
  function() {$('#con').text(bot);});

  $('#encryptionkey').hover(function(){$('#con').text('Enter encryption Key');},
  function() {$('#con').text(bot);});

  $('#currkeybut').hover(function(){$('#con').text('Show current Key');},
  function() {$('#con').text(bot);});

  $('#genkeybut').hover(function(){$('#con').text('Generate new Key');},
  function() {$('#con').text(bot);});

  $('#enfile').hover(function(){$('#con').text('Encrypt FIle');},
  function() {$('#con').text(bot);});

  $('#btntest2').hover(function(){$('#con').text('Decrypt File');},
  function() {$('#con').text(bot);});

  $('#installExt').hover(function(){$('#con').text('Install pCloud Chrome Extension');},
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
}

const init = () =>
{
    hover();
    theme();
}

module.exports = init;