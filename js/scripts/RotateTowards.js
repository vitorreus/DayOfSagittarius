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
	lookAt:function(pos){
		this.active = true;
		this.goal = pos.subtract( new Vector(this.parent.transform.x,this.parent.transform.y))
				.unit();
	},
	FixedUpdate:function(){
		if (this.active && this.goal){  
			var deg = this.parent.transform.rotation;
			var currentDirection = new Vector(Math.cos(degToRad(deg)),Math.sin(degToRad(deg)));
			currentDirection = Vector.lerp(currentDirection,this.goal,this.speed*.1);
			 

			//angleTo will always be positive
			//toAngles theta will be 0/90
			//var rotator = this.goal.toAngles();
			var rotator = currentDirection.toAngles();
			this.parent.transform.rotation = radToDeg(
				rotator.phi * Math.cos(rotator.theta)
			   + rotator.theta); 

			//check arrival 
			if (currentDirection.angleTo(this.goal)  <= degToRad(1)){
				this.active = false;  
			}
		}
	}


})