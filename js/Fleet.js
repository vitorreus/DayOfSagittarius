Fleet = Transform.extend({
	ships:15000,
	owner:null, /*Player*/
	engine:null, 
	rotationEngine: null,
	subSystems:null,
	baseSpeed:1, //depends on engines engine susbsystem lvl
	selected:false, //TODO when micromanagement is working
	attackLine:null,
	weaponsRange:200,
	weaponAngle:10,//in deg
	attacking:false,
	init:function(){
		this._super();
		this.subSystems = new SubsystemHandler();
		this.addChild(this.subSystems);

		this.engine = new GotoPosition();
		this.addChild(this.engine)

		this.rotationEngine = new RotateTowards();
		this.addChild(this.rotationEngine)

		this.direction = new Vector(0,1);

		this.addChild(new Rigidbody());
		this.addChild(new CircleCollider(this.weaponsRange));


		
	},
	FixedUpdate:function(){
		this.attackLine.graphics.clear();
		this._super();
		/*this.transform.x+= 1;
		this.transform.y+= 1;  */
		this.engine.maxSpeed = this.subSystems.getRelativeEnergyLevel("engine");
		this.engine.acceleration = this.subSystems.getRelativeEnergyLevel("engine");  
		this.rotationEngine.speed = this.subSystems.getRelativeEnergyLevel("engine"); 
 		if (this.engine.active && !this.attacking){ 
 			this.lookAt(this.engine.goal)
 		} 
 		this.attacking = false;
	},
	inRange:function(otherFleet){
		var distance = this.getPosition()
						.subtract(otherFleet.getPosition())
						.length();
		return (distance < this.weaponsRange);
	},
	getPosition:function(){
		return new Vector(this.transform.x,this.transform.y);
	},
	getDirection:function(){
		var deg = this.transform.rotation;
		return  new Vector(Math.cos(degToRad(deg)),Math.sin(degToRad(deg)));
	},
	attack:function(otherFleet){
		this.attacking = true;
		var angle = radToDeg(this.getDirection().angleTo(otherFleet.getPosition().subtract(this.getPosition())));
		if (angle > this.weaponAngle/2){
			this.lookAt(otherFleet.getPosition());
		}
		
		if (angle <= this.weaponAngle){
			this.attackLine.graphics.beginStroke("#F00");
			this.attackLine.graphics
					.moveTo(this.transform.x+10,this.transform.y+10)//+10 just to diferentiate attacking from attackers
					.lineTo(otherFleet.transform.x, otherFleet.transform.y )
		} 
	},
	moveTo:function(pos){
		console.log(pos);
		this.engine.moveTo(pos); 
		this.lookAt(pos)
	},
	lookAt:function(pos){ 
		this.rotationEngine.lookAt(pos); 
	},
	Start:function(scene){
		this._super(scene);
		this.transform.addEventListener("click",this.handleClick);
		this.transform.x = 50;
		this.transform.y = 50;
		this.transform.owner = this;

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

		this.attackLine = new createjs.Shape(); 
		stage.addChild(this.attackLine);


	}, 
	handleClick:function (event){
		//this should be someting with input
		console.log("click");
		var bmp = new createjs.Bitmap(queue.getResult("bg"));
		bmp.x = Math.random()*500;
		bmp.y = Math.random()*500;

		stage.addChild(bmp);
	},
	Event:function(e){ 
		if (e.name == "stagemousedown"){
			//this.moveTo(new Vector( e.evt.stageX,e.evt.stageY)); 
			 
		}

	}

})
