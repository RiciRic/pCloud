const Store = require('./store');

const store = new Store({
    configName: 'user-preferences',
    defaults: {
      theme:"0",
      pw:"",
      pwtemp:"",
      list:[],
      x:455,
      y:269,
      width:700,
      height:500,
      dropdown:0,
      favbtn:0,
      max:false,
      indexclose:false,
      dropboxtoken:"",
      ontop:false,
      blur:true,
      navbaricon:false,
      lock:true,
      lastsett:false,
      backupkey:"",
      eventhome:false,
      eventindex:false,
      eventanalytics:false,
      download:false,
      down:false,
      delcache:false,
      copyrightclick:true,
      copystayontop:true,
      copyseconds:10,
      contentprotection:true,
      displayName:""
    }
  });

  const get = (key) =>
  {
    return store.get(key);
  }

  const set = (key, val) =>
  {
    store.set(key, val);
  }

  const storedata = {
    get: get,
    set: set
  };

  module.exports = storedata;