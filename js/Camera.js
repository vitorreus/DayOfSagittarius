Camera = Node.extend({
	//TODO:Make all of this much better
	rootContainer:null,
	moveTo:function(worldPos){
 		//TODO: Use globalToLocal
		this.scene.x = -(worldPos.x)*this.scene.scaleX+this.rootContainer.canvas.width/2;
		this.scene.y = -(worldPos.y)*this.scene.scaleY+this.rootContainer.canvas.height/2;
 		

	},

	zoom:function(steps,byStep,screenPos){

		var worldPos = this.toWorldPosition(screenPos);
		
		var pos = this.getPosition();
		//if (byStep == undefined) byStep = .1;;
		var howMuch =  steps*byStep;
		if (this.scene.scaleX > 1){
			howMuch *=2;
		}

		if (this.scene.scaleX + howMuch > byStep){
			this.scene.scaleX += howMuch;
			this.scene.scaleY += howMuch;
		}

		var worldPosAfterScaling = this.toWorldPosition(screenPos);

		var delta = worldPosAfterScaling.subtract(worldPos);
 
		this.moveTo(this.getPosition().subtract(delta));
		
	},
	//TODO: Inherit Transform?
	getPosition:function(){
		var pos =  this.toWorldPosition(new Vector(
				 this.rootContainer.canvas.width/2,
				 this.rootContainer.canvas.height/2
			));

		//console.log(pos);

		return pos;
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