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
			//TODO:Figure out a better way to get the canvas dimension
			var rootContainer = this.scene;
			while(rootContainer.parent){
				rootContainer = rootContainer.parent;
			}
	 		this.scene.x = rootContainer.canvas.width/2 -this.selectedFleets[0].transform.x;
	 		this.scene.y = rootContainer.canvas.height/2 -this.selectedFleets[0].transform.y;
 		}
	}
});