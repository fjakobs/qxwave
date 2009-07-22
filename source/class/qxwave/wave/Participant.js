qx.Class.define("qxwave.wave.Participant", 
{
  extend : qx.core.Object,


  construct : function(displayName, thumbnailUrl)
  {
    this.base(arguments);
  
    this.__displayName = displayName;
    this.__thumbnailUrl = thumbnailUrl;
  },

  members :
  {
    getId : function() {
      return this.toHashCode();
    },
    
    getDisplayName : function() {
      return this.__displayName;
    },
    
    getThumbnailUrl : function() {
      return this.__thumbnailUrl;
    }
  }
});