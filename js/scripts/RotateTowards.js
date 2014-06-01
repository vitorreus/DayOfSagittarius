function degToRad(deg){
	return deg*Math.PI/180
}
function radToDeg(rad){
	return rad*180/Math.PI
}

RotateTowards = Node.extend({
	goal:null,
	active:false,
	speed:1,
	objects:[], 
	Event:function(e){ 
		if (e.name == "stagemousedown"){
			this.active = true;
			this.goal = new Vector( e.evt.stageX,e.evt.stageY)
				.subtract( new Vector(this.parent.transform.x,this.parent.transform.y))
				.unit();
			 
		}

	},
	FixedUpdate:function(){
		if (this.active && this.goal){  
			var deg = this.parent.transform.rotation;
			var currentDirection = new Vector(Math.cos(degToRad(deg)),Math.sin(degToRad(deg)));
			var currentDirection = Vector.lerp(currentDirection,this.goal,.1);
			 

			//angleTo will always be positive
			//toAngles theta will be 0/90
			//var rotator = this.goal.toAngles();
			var rotator = currentDirection.toAngles();
			this.parent.transform.rotation = radToDeg(
				rotator.phi * Math.cos(rotator.theta)
			   + rotator.theta); 

			/*this.parent.transform.x -= direction.x*this.speed; 
			this.parent.transform.y  -= direction.y*this.speed; 

			//check arrival
			var distance = new Vector(this.parent.transform.x,this.parent.transform.y)
				.subtract(this.goal);
			if (distance.length() <= this.speed){
				this.active = false;  
			} */
		}
	}


})