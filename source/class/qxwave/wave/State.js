qx.Class.define("qxwave.wave.State", 
{
  extend : qx.core.Object,


  construct : function()
  {
    this.base(arguments);
  
    this.__state = {};
    this.__fireChangeEventAsync();    
  },
  
  events :
  {
    "changeState" : "qx.event.type.Event"
  },

  members :
  {
    get : function(key, opt_default)
    {
      if (this.__state[key] !== undefined) {
        return this.__state[key] + "";
      } else {
        return (opt_default || "") + "";
      }
    },
    
    getKeys : function() {
      return qx.lang.Object.getKeys(this.__state);
    },
    
    submitDelta : function(delta)
    {
      qx.event.Timer.once(function() {
        for (var key in delta)
        {
          if (delta.hasOwnProperty(key)) {
            this.__state[key] = delta[key];
          }
        }
        this.__fireChangeEvent();
      }, this, 0);
    },    
    
    __fireChangeEvent : function() {
      this.fireEvent("changeState");
    },
    
    __fireChangeEventAsync : function() 
    {
      qx.event.Timer.once(function() {
        this.__fireChangeEvent();
      }, this, 0);
    }
  }
});