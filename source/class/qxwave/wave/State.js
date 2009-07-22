qx.Class.define("qxwave.wave.State", 
{
  extend : qx.core.Object,


  construct : function()
  {
    this.base(arguments);
  
    this.__state = {};
    this.__callback = function() {};
    this.__callbackContext = window;
    
    this.__fireChangeEvent();
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
    
    getKeys : function() {
      return qx.lang.Object.getKeys(this.__state);
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
    
    setStateCallback : function(callback, opt_context) 
    {
      this.__callback = callback;
      this.__callbackContext = opt_context || window;
    },
    
    __fireChangeEvent : function() 
    {
      qx.event.Timer.once(function() {
        this.__callback.call(this.__callbackContext)
      }, this, 0);
    }
  }
});