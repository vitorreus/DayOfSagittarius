GotoPosition = Node.extend({
	goal:null,
	active:false,
	maxSpeed:1,
	speed:0,
	acceleration:1, //this is just a factor, real acceleration is acceleration*0.1 
	currentAccel:1,
	moveTo:function(pos){
		this.active = true;
		this.goal = pos;
	},
	FixedUpdate:function(){
		if (this.active){ 

			var parentPosition = new Vector(this.parent.transform.x,this.parent.transform.y);

			var direction = parentPosition
				.subtract(this.goal).unit();

			//check arrival
			var distance = parentPosition
				.subtract(this.goal);

			var acceleration = this.acceleration*0.1;

			//figure out the time to stop
			//var timeToStop = this.speed/acceleration;	
			//figure out the traveled distance while deaceclerating:
			//using uniform acceleration equation of motion S=So+Vot+at^2/2
			//var distanceTraveledWhileStopping = this.speed *timeToStop 
			//					+ acceleration*Math.pow(timeToStop,2)/2
			//plugging timeToStop:
			//d = s*s/a + a*s^2/a^2 = (s^2 + as^2/a)/a = 2s^2/a
			//simplifying the abofe formula gives:
			var distanceTraveledWhileStopping = 2*Math.pow(this.speed,2)/acceleration;
 
 			//figure out if we should break or accelerate
			if (distanceTraveledWhileStopping >= distance.length()){ 
				this.speed -= acceleration;
				this.currentAccel = -acceleration;
			} else{

				this.speed += acceleration;
				this.currentAccel = +acceleration;
			}
			
			if (this.speed > this.maxSpeed){
				this.speed = this.maxSpeed;
			}
			this.parent.transform.x -= direction.x*this.speed; 
			this.parent.transform.y  -= direction.y*this.speed; 


			//check arrival
			parentPosition = new Vector(this.parent.transform.x,this.parent.transform.y);
			distance = parentPosition
				.subtract(this.goal);


			if (distance.length() <= this.maxSpeed){
				this.active = false;  
				this.speed = 0;
			} 
		}
	}
})