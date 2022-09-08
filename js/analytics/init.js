const store = require('../storedata.js');

const bot = "";

/**
 * Sets dark or light theme.
 * Value 0 sets dark theme.
 * Value 1 sets light theme.
 */
const theme = () =>
{
    if (store.get('theme') == '1'){
        document.body.classList.add('hell');
    }
    else if(store.get('theme') == '0'){
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


/**
 * Create hover events for informationbox.
 */
const hover = () =>
{
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

    $('#max-btn').hover(function(){
        if(store.get('max') == false)
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
        if(store.get('ontop') == false)
        {
            $('#con').text('Stay on Top');
        }
        else
        {
            $('#con').text('Back to normal');
        }
    },
    function() {$('#con').text(bot);});

    $('#da').hover(function(){document.getElementById("da").style.cursor = "pointer";},
    function() {document.getElementById("da").style.cursor = "initial";});

    if(store.get('ontop') == true){
        let remote = require('electron').remote;
        document.getElementById("topkek").value = "●";
        document.getElementById("topkeki").classList.add("fas");
        document.getElementById("topkeki").classList.remove("far");
        remote.getCurrentWindow().setAlwaysOnTop(true, 'screen');
        var element = document.getElementById("topkek");
        element.classList.add("blau");
    }
}

const init = () =>
{
    hover();
    theme();
}

module.exports = init;