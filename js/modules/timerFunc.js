function TimerFunc(time) 
{
    this.time = time;
    this.stop = false;
    this.setstop = function() 
    {
      this.stop = true;
    };
    this.start = function(time) 
    {
      console.log(this.stop)
      if(this.stop == true)return;
      if(time !=0)
      {
        $('#con').text('Copied for '+ time +' seconds..');
        setTimeout(() => { 
          if(this.stop == true)return;
          this.start(time-1);
        }, 1000);
      }
      else{
        $('#con').text(bot);
        clipboard.writeText('');
      }
    };
}

module.exports = TimerFunc;