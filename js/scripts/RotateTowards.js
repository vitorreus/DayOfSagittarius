RotateTowards = Node.extend({
	goal:null,
	active:false,
	speed:1,
	objects:[], 
	Event:function(e){ 
		if (e.name == "stagemousedown"){
			this.active = true;
			this.goal = new Vector( e.evt.stageX,e.evt.stageY)
				.subtract( new Vector(this.parent.transform.x,this.parent.transform.y));
			 
		}
	},
})