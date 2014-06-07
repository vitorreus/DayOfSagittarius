Camera = Node.extend({
	//TODO:Make all of this much better
	rootContainer:null,
	moveTo:function(worldPos){
 		var delta = worldPos.subtract(this.getPosition());
 		this.scene.x -= delta.x;
 		this.scene.y -= delta.y;

	},

	zoom:function(steps,byStep,screenPos){

		var worldPos = this.toWorldPosition(screenPos);
		
		var pos = this.getPosition();
		//if (byStep == undefined) byStep = .1;;
		var howMuch = 1+ steps*byStep;

		console.log(this.scene.scaleX);
		
		this.scene.scaleX *= howMuch;
		this.scene.scaleY *= howMuch;

		if (this.scene.scaleX < .55){
			this.scene.scaleX = .55;
			this.scene.scaleY = .55;
		}


		var worldPosAfterScaling = this.toWorldPosition(screenPos);

		var delta = worldPosAfterScaling.subtract(worldPos);
		console.log(delta);
 
		this.moveTo(this.getPosition().subtract(delta.multiply(
			new Vector (this.scene.scaleX,this.scene.scaleY)
			)));
		
	},
	//TODO: Inherit Transform?
	getPosition:function(){
		/*return new Vector(this.scene.x + this.rootContainer.canvas.width/2,
			this.scene.y + this.rootContainer.canvas.height/2);*/
		var pos =  this.toWorldPosition(new Vector(
				 this.rootContainer.canvas.width/2,
				 this.rootContainer.canvas.height/2
			));

		//console.log(pos);

		return pos;

		/*return new Vector(this.scene.x ,
			this.scene.y ) ;*/
	},

	/*getRawPosition:function(){
		return new Vector(this.scene.x ,
			this.scene.y )
	},*/

	toWorldPosition:function(screenPos){
		//this.rootContainer.update();
		var point = this.scene.globalToLocal (screenPos.x,screenPos.y);
		return new Vector(point.x,point.y)
	},
	toScreenPosition:function(worldPos){
		//return 
	},
	Start:function(scene){
		//TODO:Figure out a better way to get the canvas dimension
		this._super(scene);
		 this.rootContainer = this.scene;
		while(this.rootContainer.parent){
			this.rootContainer = this.rootContainer.parent;
		}
		/*this.scene.x = -10;
		this.scene.y = -20;*/
	}

})