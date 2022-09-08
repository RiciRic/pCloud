const Typewriter = require('typewriter-effect/dist/core');

const os = require ('os');

function getUsername(){
  var storeUsername = store.get("username");
  if(storeUsername == null || storeUsername == "")
  {
    return os.userInfo().username;
  }
  else{
    return storeUsername;
  }
}
const username = getUsername();

var lbltext = document.getElementById('lbltext');

var customNodeCreator = function(character) {
  return document.createTextNode(character);
}

var typewriter = new Typewriter(lbltext, {
  loop: false,
  delay: 75,
  cursor:'',
  onCreateTextNode: customNodeCreator
});

const typing = () =>
{
    typewriter.typeString('Hello <strong><span style="color: #0099ff;">'+username+'</span></strong>!').start();
}

module.exports = typing;