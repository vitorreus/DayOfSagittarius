function leadingZeros(num,size){
	num = ""+ num;
	while (num.length < size){
		num = "0" + num; 
	}
	return num;
}

Fleet = Transform.extend({
	ships:15000,
	engine:null, 
	rotationEngine: null,
	subSystems:null,
	attackLine:null,
	weaponsRange:200,
	weaponAngle:10,//in deg
	attacking:false,
	isAttacking:false, //TODO:Remove this
	attackingTarget:null,
	inRange:null,
	fleetNumberText:null,
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
		this.addChild(new CircleCollider(this.weaponsRange)); //the weapon range
		this.addChild(new PointCollider()); //Its position to the other fleets


		
	},
	FixedUpdate:function(){
		this.inRange = [];
		this._super();
		this.attackNearest(this.inRange);
		
		this.engine.maxSpeed = this.subSystems.getRelativeEnergyLevel("engine");
		this.engine.acceleration = this.subSystems.getRelativeEnergyLevel("engine");  
		this.rotationEngine.speed = this.subSystems.getRelativeEnergyLevel("engine"); 
 		if (this.engine.active && !this.attacking){ 
 			this.lookAt(this.engine.goal)
 		} 
 		//TODO: Change on colisoinLeave;
 		this.isAttacking=this.attacking;
 		this.attacking = false;
 		if (this.ships <= 0) this.die();
	},
	Update:function(){
		this._super();

 		this.fleetNumberText.x = this.transform.x;
 		this.fleetNumberText.y = this.transform.y+70;
 		this.fleetNumberText.text = leadingZeros(Math.floor(this.ships),5);

		this.attackLine.graphics.clear();
		//TODO:pul line drawing here
		if (this.isAttacking && this.attackingTarget){
			this.drawAttackLine(this.attackingTarget);
		}
	},
	die:function(){
		this.Destroy();
	},
	attackNearest:function(otherFleets){
		var nearest = null;
		var minDistance = 0;

		for (var i = 0; i < otherFleets.length;i++){
			var distance = this.getPosition().subtract(otherFleets[i].getPosition()).length();
			if (nearest === null || distance < minDistance){
				minDistance = distance;
				nearest = otherFleets[i];
			}
		}
		if (nearest)
			this.attack(nearest);

	},
	receiveDamage:function(dam){
		this.ships -= (dam-2*dam*this.subSystems.getRelativeEnergyLevel("shield")/3)/1000;
	},
	drawAttackLine:function(otherFleet){
		this.attackLine.graphics.beginStroke("#F00");
		this.attackLine.graphics
				.moveTo(this.transform.x+10,this.transform.y+10)//+10 just to diferentiate attacking from attackers
				.lineTo(otherFleet.transform.x, otherFleet.transform.y );
	},
	attack:function(otherFleet){
		this.attacking = true;
		if (  this.subSystems.nextEnergyLevel("weapon") > 1){ //if we have energy to fire
			var angle = radToDeg(this.getDirection().angleTo(otherFleet.getPosition().subtract(this.getPosition())));
			if (angle > this.weaponAngle/2){
				var distance = otherFleet.getPosition().subtract(this.getPosition()).length();
				this.lookAt(otherFleet.getPosition().add(otherFleet.getSpeed().multiply(700/(distance+1))));
			}
			if (angle <= this.weaponAngle){
					otherFleet.receiveDamage(this.subSystems.getRelativeEnergyLevel("weapon")*this.ships);
				 	this.attackingTarget = otherFleet;

			}
		}else{this.attacking = false;}
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
		this.transform.z = 10;
		this.transform.owner = this;

		this.transform.graphics.beginFill(this.parent.color);
		//this.transform.graphics.drawCircle(0,0,50);  

		var fleetSize = 50; 
		this.transform.graphics
			.moveTo(-fleetSize, -fleetSize)
			.lineTo(fleetSize, 0)
			.lineTo(-fleetSize, fleetSize)
			.lineTo(-fleetSize, -fleetSize);

		//stage.removeChild(ball);

		this.attackLine = new createjs.Shape(); 
		this.attackLine.z =20 ;
		scene.addChild(this.attackLine);


		//this.fleetNumberText = new createjs.Text("Hello World", "bold 86px Arial", "#ff7700");
		this.fleetNumberText = new createjs.Text(this.ships,"bold 14px Arial","white");
		this.fleetNumberText.textAlign = "center"
		this.fleetNumberText.z = 30;
		scene.addChild(this.fleetNumberText);

	}, 
	Destroy:function(){
		this._super();
		this.scene.removeChild(this.transform,this.fleetNumberText,this.attackLine);
	},
	handleClick:function (event){
		//this should be someting with input
		console.log("click");
		var bmp = new createjs.Bitmap(queue.getResult("bg"));
		bmp.x = Math.random()*500;
		bmp.y = Math.random()*500;

		scene.addChild(bmp);
	},
	Event:function(e){ 
		if (e.name == "stagemousedown"){
			//this.moveTo(new Vector( e.evt.stageX,e.evt.stageY)); 
			 
		}

	},
	OnCollisionStay:function(collisionInfo ){
		//just add to list, and afterwards find the nearest to atack
		if (collisionInfo.collider instanceof PointCollider){
			//TODO: filter only enemies
			if (collisionInfo.gameObject.parent != this.parent){ //if its other player
				//this.attack(collisionInfo.gameObject);
				this.inRange.push(collisionInfo.gameObject);
			}
		}
	}

})
