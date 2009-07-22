qx.Class.define("qxwave.wave.Wave", 
{
  extend : qx.core.Object,


  construct : function()
  {
    this.base(arguments);
  
    this.__state = new qxwave.wave.State();
  },

  members :
  {
    getState : function() {
      return this.__state;
    },
    
    
    setStateCallback : function(cb) {
      this.__state.setStateCallback(cb);
    },
    
    
    isInWaveContainer : function() {
      return true;
    }
  }
});