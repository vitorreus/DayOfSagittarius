HumanPlayer  = Player.extend({ 
	Event:function(e){ 
		if (e.name == "stagemousedown"){
			this.moveFleets(new Vector( e.evt.stageX -this.scene.x,e.evt.stageY-this.scene.y));
		}
	},
	FixedUpdate:function(){
		this._super();
		//TODO: Follow average position of all selected fleets
		if (this.selectedFleets[0]){
	 		this.scene.x = 300 -this.selectedFleets[0].transform.x;
	 		this.scene.y = 300 -this.selectedFleets[0].transform.y;
 		}
	}
});