Fleet = Node.extend({
	ships:15000,
	owner:null, /*Player*/
	transform:null,
	engine:null, 
	rotationEngine: null,
	subSystems:null,
	baseSpeed:1, //depends on engines engine susbsystem lvl
	selected:false, //TODO when micromanagement is working
	init:function(){
		this.subSystems = new SubsystemHandler();
		this.addChild(this.subSystems);

		this.engine = new GotoPosition(this);
		this.addChild(this.engine)

		this.rotationEngine = new RotateTowards(this);
		this.addChild(this.rotationEngine)

		this.direction = new Vector(0,1);
	},
	FixedUpdate:function(){
		/*this.transform.x+= 1;
		this.transform.y+= 1;  */
		this.engine.maxSpeed = this.subSystems.getRelativeEnergyLevel("engine");
		this.engine.acceleration = this.subSystems.getRelativeEnergyLevel("engine");  
		this.rotationEngine.speed = this.subSystems.getRelativeEnergyLevel("engine"); 
	},
	Start:function(scene){
		this.transform = new createjs.Shape(); 
		this.transform.addEventListener("click",this.handleClick);
		this.transform.x = 50;
		this.transform.y = 50;
		


		this.transform.graphics.beginFill("#000000");
		//this.transform.graphics.drawCircle(0,0,50);  

		var fleetSize = 50; 
		this.transform.graphics
			.moveTo(-fleetSize, -fleetSize)
			.lineTo(fleetSize, 0)
			.lineTo(-fleetSize, fleetSize)
			.lineTo(-fleetSize, -fleetSize);  

		stage.addChild(this.transform);
		//stage.removeChild(ball);
	}, 
	handleClick:function (event){
		console.log("click");
		var bmp = new createjs.Bitmap(queue.getResult("bg"));
		bmp.x = Math.random()*500;
		bmp.y = Math.random()*500;

		stage.addChild(bmp);
	}

})
