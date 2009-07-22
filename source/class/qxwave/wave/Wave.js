qx.Class.define("qxwave.wave.Wave", 
{
  extend : qx.core.Object,


  construct : function()
  {
    this.base(arguments);
  
    this.__state = new qxwave.wave.State();
    
    this.__participants = [
      new qxwave.wave.Participant("Fabian Jakobs", "http://www.gravatar.com/avatar/a6d98536d90d2987d40a6abe731805ca")
    ];
    
    this.__participantCallback = function() {};    
    this.__fireParticipantCallback();
  },

  members :
  {
    getState : function() {
      return this.__state;
    },    
    
    setStateCallback : function(callback, opt_context) {
      this.__state.setStateCallback(callback, opt_context);
    },    
    
    setParticipantCallback : function(callback, opt_context) {
      this.__participantCallback = qx.lang.Function.bind(callback, opt_context || window);
    },
    
    getParticipants : function() {
      return this.__participants;
    },   
    
    getViewer : function() {
      return this.__participants[0];
    },
    
    isInWaveContainer : function() {
      return true;
    },
    
    __fireParticipantCallback : function() 
    {
      qx.event.Timer.once(function() {
        this.__participantCallback()
      }, this, 0);
    }
  }
});