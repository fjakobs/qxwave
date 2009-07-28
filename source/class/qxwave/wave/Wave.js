qx.Class.define("qxwave.wave.Wave", 
{
  extend : qx.core.Object,


  construct : function(state, participantList, viewerIndex)
  {
    this.base(arguments);
  
    this.__state = state;    
    this._setParticipants(participantList);
    this.__viewerIndex = viewerIndex || 0;
    
    this.__participantCallback = function() {};    
    this.__fireParticipantCallback();
  },

  members :
  {    
    getState : function() {
      return this.__state;
    },    
    
    setStateCallback : function(callback, opt_context)
    {
      if (this.__stateCallbackId) {
        this.__state.removeListenerById(this.__stateCallbackId);
      }
      
      this.__stateCallbackId = this.__state.addListener("changeState", callback, opt_context);
    },    
    
    setParticipantCallback : function(callback, opt_context) {
      this.__participantCallback = qx.lang.Function.bind(callback, opt_context || window);
    },
    
    _setParticipants : function(participantList) {
      this.__participants = participantList
    },
    
    getParticipants : function() {
      return this.__participants;
    },   
    
    getViewer : function() {
      return this.__participants[this.__viewerIndex];
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