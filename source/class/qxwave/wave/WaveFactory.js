qx.Class.define("qxwave.wave.WaveFactory", 
{
  extend : qx.core.Object,

  members :
  {
    getWave : function()
    {
      if (this.isInWaveContainer())
      {
        return wave;
      }
      else
      {
        var state = new qxwave.wave.State();
        var participants = [
          new qxwave.wave.Participant("Fabian Jakobs", "http://www.gravatar.com/avatar/a6d98536d90d2987d40a6abe731805ca")
        ];
        
        return new qxwave.wave.Wave(state, participants);
      }
    },
    
    isInWaveContainer : function() {
      return window.wave && wave.isInWaveContainer()
    }
  }
});