qx.Class.define("qxwave.wave.State", 
{
  extend : qx.core.Object,


  construct : function()
  {
    this.base(arguments);
  
    this.__state = {};
    this.__callback = function() {};
  },

  members :
  {
    get : function(key, opt_default)
    {
      if (this.__state[key] !== undefined) {
        return this.__state[key] + "";
      } else {
        return opt_default + "";
      }
    },
    
    submitDelta : function(delta)
    {
      for (var key in delta)
      {
        if (delta.hasOwnProperty(key)) {
          this.__state[key] = delta[key];
        }
      }
      this.__fireChangeEvent();
    },    
    
    setStateCallback : function(callback) {
      this.__callback = callback;
    },
    
    __fireChangeEvent : function() {
      qx.event.Timer.once(this.__callback, window, 0);
    }
  }
});