GotoPosition = Node.extend({
	goal:null,
	active:false,
	speed:1,
	objects:[], 
	init:function(parent){
		//this.parent  = parent;
	},
	Event:function(e){ 
		if (e.name == "stagemousedown"){
			this.active = true;
			this.goal = new Vector( e.evt.stageX,e.evt.stageY)
			//console.log.
		}
	},
	FixedUpdate:function(){
		if (this.active){ 

			var direction = new Vector(this.parent.transform.x,this.parent.transform.y)
				.subtract(this.goal).unit();


			this.parent.transform.x -= direction.x*this.speed; 
			this.parent.transform.y  -= direction.y*this.speed; 

			//check arrival
			var distance = new Vector(this.parent.transform.x,this.parent.transform.y)
				.subtract(this.goal);
			if (distance.length() <= this.speed){
				this.active = false;  
			} 
		}
	}
})