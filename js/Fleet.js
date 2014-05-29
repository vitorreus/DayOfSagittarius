Fleet = Node.extend({
	ships:15000,
	owner:null, /*Player*/
	graphics:null,
	init:function(){
		this.addChild(new SubsystemHandler());
	},
	fixedUpdate:function(){
		/*graphics.x+= 1;
		graphics.y+= 1;  */
	},
	Start:function(scene){
		graphics = new createjs.Shape(); 
		graphics.addEventListener("click",this.handleClick);
		graphics.x = 50;
		graphics.y = 50;
		


		graphics.graphics.beginFill("#000000").drawCircle(0,0,50);
		 
	 
	 

		//createjs.Tween.get(ball,{loop:true}).to({x:450}, 3000).to({x:50},3000);
		

		stage.addChild(graphics);
		//stage.removeChild(ball);
	},
	Event:function(e){ 
		if (e.name == "stagemousedown"){
			/*graphics.x = e.evt.stageX;
			graphics.y = e.evt.stageY;*/
			createjs.Tween.get(graphics,{loop:false}).to({x:e.evt.stageX,y:e.evt.stageY}, 1000);
		}
	},
	handleClick:function (event){
		console.log("click");
		var bmp = new createjs.Bitmap(queue.getResult("bg"));
		bmp.x = Math.random()*500;
		bmp.y = Math.random()*500;

		stage.addChild(bmp);
	}

})
