Fleet = Node.extend({
	ships:15000,
	owner:null, /*Player*/
	transform:null,
	engines:null, 
	subSystems:null,
	baseSpeed:1, //depends on engines engine susbsystem lvl
	init:function(){
		this.subSystems = new SubsystemHandler();
		this.addChild(this.subSystems);

		this.engines = new GotoPosition(this);
		this.addChild(this.engines)
	},
	FixedUpdate:function(){
		/*this.transform.x+= 1;
		this.transform.y+= 1;  */
		this.engines.speed = this.subSystems.getRelativeEnergyLevel("engine")
	},
	Start:function(scene){
		this.transform = new createjs.Shape(); 
		this.transform.addEventListener("click",this.handleClick);
		this.transform.x = 50;
		this.transform.y = 50;
		


		this.transform.graphics.beginFill("#000000").drawCircle(0,0,50);
		 
	 
	 

		//createjs.Tween.get(ball,{loop:true}).to({x:450}, 3000).to({x:50},3000);
		

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
