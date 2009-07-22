qx.Class.define("qxwave.wave.WaveFactory", 
{
  extend : qx.core.Object,

  members :
  {
    getWave : function()
    {
      if (this.isInWaveContainer()) {
        return wave;
      } else {
        return new qxwave.wave.Wave();
      }
    },
    
    isInWaveContainer : function() {
      return window.wave && wave.isInWaveContainer()
    }
  }
});