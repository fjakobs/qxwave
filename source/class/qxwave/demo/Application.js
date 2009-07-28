/* ************************************************************************

#asset(qxwave/*)

************************************************************************ */

qx.Class.define("qxwave.demo.Application",
{
  extend : qx.application.Standalone,

  members :
  {
    main : function()
    {
      this.base(arguments);

      var state = new qxwave.wave.State();
      var participants = [
        new qxwave.wave.Participant("Fabian Jakobs", "http://www.gravatar.com/avatar/a6d98536d90d2987d40a6abe731805ca"),
        new qxwave.wave.Participant("Peter Pan", "http://gadget-doc-examples.googlecode.com/svn/trunk/images/unknown.gif"),
        new qxwave.wave.Participant("Faulskemper", "http://gadget-doc-examples.googlecode.com/svn/trunk/images/unknown.gif")        
      ];
            
      this.addGadget(new qxwave.wave.Wave(state, participants, 0));
      this.addGadget(new qxwave.wave.Wave(state, participants, 1));
    },
    
    
    createGadget : function(wave) {
      return new qxwave.auction.Auction(wave);
    },
    
    left : 10,
    top : 20,
    
    addGadget : function(wave)
    {
      var caption = "Gadget (" + wave.getViewer().getDisplayName() + ")";
      var win = new qx.ui.window.Window(caption).set({
        contentPadding: 0,
        allowMinimize: false
      });
      win.setLayout(new qx.ui.layout.Grow());
      win.add(this.createGadget(wave).set({
        padding: 10
      }));
            
      win.moveTo(this.left, this.top);
      this.left += 50;
      this.top += 30;
      
      win.open();
    }
  }
});
