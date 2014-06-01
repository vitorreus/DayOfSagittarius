HumanPlayer  = Player.extend({ 
	Event:function(e){ 
		if (e.name == "stagemousedown"){
			this.moveFleets(new Vector( e.evt.stageX,e.evt.stageY));
		}
	}
});