qx.Class.define("qxwave.auction.Auction", 
{
  extend : qx.ui.core.Widget,


  construct : function(wave)
  {
    this.base(arguments);
    
    this.wave = wave;
    wave.setStateCallback(this.renderInfo, this);
    wave.setParticipantCallback(this.renderInfo, this);    
    
    this.setBackgroundColor("white");
    this._setLayout(new qx.ui.layout.VBox(8));
    
    this.winnerAtom = new qx.ui.basic.Atom();
    this._add(this.winnerAtom);
    
    this.bidLabel = new qx.ui.basic.Label("");
    this._add(this.bidLabel);
    
    var yourBidContainer = new qx.ui.container.Composite(new qx.ui.layout.HBox(5));
    this._add(yourBidContainer);
    
    yourBidContainer.add(new qx.ui.basic.Label("Your bid:").set({
      marginTop: 3
    }));
    this.yourBidField = new qx.ui.form.Spinner().set({
      minimum: 0,
      maximum: 1000000
    });
    yourBidContainer.add(this.yourBidField);
    
    var bidButton = new qx.ui.form.Button("Bid");
    bidButton.addListener("execute", this.onBid, this);
    yourBidContainer.add(bidButton);
    
    this.participantSummary = new qx.ui.basic.Label();
    this._add(this.participantSummary);    
  },

  members :
  {
    renderInfo : function()
    {
      var wave = this.wave;

      if (!wave.getState()) {
        return;
      }
      
      var highestBid = 0;
      var highestBidderId = null;
      var state = wave.getState();
      var keys = state.getKeys();
      for (var i = 0; i < keys.length; ++i) 
      {
        var bidder = keys[i];
        var bid = parseInt(state.get(bidder));
        if (bid > highestBid) {
          highestBid = bid;
          highestBidderId = bidder;
        }
      }
      
      var bidderName = 'Nobody';
      var thumbNail = 'http://gadget-doc-examples.googlecode.com/svn/trunk/images/unknown.gif';
      if (highestBidderId) 
      {
        bidderName = highestBidderId;
        var participants = wave.getParticipants();
        var numPeople = participants.length;        
        if (participants) 
        {
          for (var i = 0; i < participants.length; ++i) 
          {
            if (participants[i].getId() == highestBidderId) 
            {
              var highestBidder = participants[i];
              bidderName = highestBidder.getDisplayName();
              if (!bidderName) {
                bidderName = highestBidder.getId();
              }
              thumbNail = highestBidder.getThumbnailUrl();
            }
          }
        }
      }
      
      this.winnerAtom.setIcon(thumbNail);
      this.winnerAtom.setLabel(bidderName);
      this.bidLabel.setValue("Highest bid: " + highestBid);
      this.yourBidField.set({
        minimum: highestBid,
        value: highestBid
      });
      this.participantSummary.setValue("Number of wave participants: " + numPeople);
    },
    
    onBid : function()
    {
      var wave = this.wave;
      var viewerId = wave.getViewer().getId();
      var state = wave.getState();
      var bid = this.yourBidField.getValue();
      var currentBid = parseInt(state.get(viewerId, '0'));
      if (bid > currentBid) 
      {
        var delta = {};
        delta[viewerId] = bid;
        state.submitDelta(delta);
      }      
    }    
  }
});