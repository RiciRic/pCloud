/*
* Returns true if lowercase is in String.
*/
function getLower(wert) {
    var lower = 97;
    for (var i = lower; i < 123; i++) {
      if(String.fromCharCode(i) == wert)
      {
        return true;
      }
    }
    return false;
}
  
/*
* Returns true if uppercase is in String.
*/
function getUpper(wert) {
    var lower = 65;
    for (var i = lower; i < 91; i++) {
      if(String.fromCharCode(i) == wert)
      {
        return true;
      }
    }
    return false;
}

/*
* Returns true if number is in String.
*/
function getNumber(wert) {
    var lower = 48;
    for (var i = lower; i < 58; i++) {
      if(String.fromCharCode(i) == wert)
      {
        return true;
      }
    }
    return false;
}

/*
* Returns true if symbol is in String.
*/
function getSymbol(wert) {
    var symbol = ['!', '@','#', '$','%', '^','&', '*','(', ')','{', '}','[', ']','=', '<', '>', '/', ',', '', '.'];
      for (var i = 0; i < symbol.length; i++) {
      if(symbol[i] == wert)
      {
        return true;
      }
    }
    return false;
}

/*
* Returns value from 0 to 20. Determines if String has strong (20) or weak (0) password features.
*/
function checkPassword(wort){
    var lower=false;
    var upper=false;
    var number=false;
    var symbol=false;
    var sheesh = 0;
    for (var i = 0; i < wort.length; i++) {
      if(lower == false)
      {
        lower = getLower(wort.charAt(i));
      }
      if(upper == false)
      {
        upper = getUpper(wort.charAt(i));
      }
      if(number == false)
      {
        number = getNumber(wort.charAt(i));
      }
      if(symbol == false)
      {
        symbol = getSymbol(wort.charAt(i));
      }
    }
    if(lower == true)
    {
        sheesh += 3;
    }
    if(upper == true)
    {
        sheesh += 3;
    }
    if(number == true)
    {
        sheesh += 4;
    }
    if(symbol == true)
    {
        sheesh += 4;
    }
    if(wort.length > 8)
    {
        sheesh += 3;
    }
    if (wort.length > 13)
    {
        sheesh += 3;
    }
    if (wort.length == 1)
    {
        sheesh = 0;
    }
    if (wort.length == 2)
    {
        sheesh = 1;
    }
    if (wort.length > 25)
    {
        if(sheesh <= 17)
        {
          sheesh += 3;
        }
    }
    if(wort.length > 35)
    {
        if(sheesh <= 18)
        {
          sheesh += 2;
        }
    }
    return sheesh;
}

module.exports = checkPassword;