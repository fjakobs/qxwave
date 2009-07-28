/* ************************************************************************

#asset(qxwave/*)

************************************************************************ */

qx.Class.define("qxwave.auction.Application",
{
  extend : qx.application.Standalone,

  members :
  {
    main : function()
    {
      this.base(arguments);

      var wave = new qxwave.wave.WaveFactory().getWave();
      this.getRoot().add(new qxwave.auction.Auction(wave), {edge: 0});
    }    
  }
});
