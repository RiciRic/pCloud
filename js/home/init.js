const store = require('../storedata.js');

const bot = "";

/**
 * Sets dark or light theme.
 * Value 0 sets dark theme.
 * Value 1 sets light theme.
 */
const theme = () =>
{
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
}

const favButton = () =>
{
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
}

/**
 * Create hover events for informationbox.
 */
const hover = () =>
{
    $('#gen').hover(function(){$('#con').text('Generate Password');},
    function() {$('#con').text(bot);});

    $('#txtemail').hover(function(){$('#con').text('E-Mail');},
    function() {$('#con').text(bot);});

    $('#selectwrappergroup').hover(function(){$('#con').text('Select Group');},
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
  
    $('#txtusernameDiv').hover(function(){$('#con').text('Username');},
      function() {$('#con').text(bot);});
  
    $('#txtpasswordDiv').hover(function(){$('#con').text(document.getElementById("txtpassword").placeholder);},
      function() {$('#con').text(bot);});
  
    $('#txturl').hover(function(){$('#con').text('Url');},
      function() {$('#con').text(bot);});
  
    $('#txtnote').hover(function(){$('#con').text('Note');},
      function() {$('#con').text(bot);});
  
    $('#topkekle').hover(function(){$('#con').text('Lock Program');},
    function() {$('#con').text(bot);});
  
    $('#btnEd').hover(function(){$('#con').text('Settings');},
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
}

const init = () =>
{
    favButton();
    hover();
    theme();
}

module.exports = init;