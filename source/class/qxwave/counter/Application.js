/* ************************************************************************

#asset(qxwave/*)

************************************************************************ */

qx.Class.define("qxwave.counter.Application",
{
  extend : qx.application.Standalone,

  members :
  {
    main : function()
    {
      this.base(arguments);

      this.wave = new qxwave.wave.WaveFactory().getWave();
      this.wave.setStateCallback(this.stateUpdate, this);

      var grid = new qx.ui.layout.Grid(10, 10);
      grid.setRowFlex(0, 1);
      grid.setRowFlex(1, 1);
      grid.setColumnFlex(0, 1);
      grid.setColumnFlex(1, 1);

      var container = new qx.ui.container.Composite(grid).set({
        backgroundColor: "white"
      });
      this.getRoot().add(container, {edge: 0});
      
      var btnIncrement = new qx.ui.form.Button("Click me!");
      btnIncrement.addListener("execute", this.incrementCounter, this);
      container.add(btnIncrement, {row: 0, column: 0});

      var btnReset = new qx.ui.form.Button("Reset");
      btnReset.addListener("execute", this.resetCounter, this);
      container.add(btnReset, {row: 0, column: 1});
      
      this.counter = new qx.ui.basic.Atom("0").set({
        iconPosition: "top",
        center: true,
        font: "bold",
        backgroundColor: "rgb(201,226,252)"
      });
      container.add(this.counter, {row: 1, column: 0, colSpan: 2});
      
      this.stateUpdate(this.wave);
    },    
    
    stateUpdate : function() {
      this.counter.setLabel("The count is " + this.wave.getState().get('count', '0'));
    },
    
    incrementCounter : function() 
    {
      var value = parseInt(this.wave.getState().get('count', '0'));
      this.wave.getState().submitDelta({'count': value + 1});      
    },
    
    resetCounter : function() {
      this.wave.getState().submitDelta({'count': '0'});      
    }
  }
});
