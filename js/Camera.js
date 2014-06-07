Camera = Node.extend({
	rootContainer:null,
	moveTo:function(pos){
		//TODO:Figure out a better way to get the canvas dimension
		
 		this.scene.x = this.rootContainer.canvas.width/2 -pos.x;
 		this.scene.y = this.rootContainer.canvas.height/2 -pos.y;
	},

	zoom:function(steps){
		var byStep = .1;
		this.scene.scaleX *= howMuch;
		this.scene.scaleY *= howMuch;
	},
	//TODO: Inherit Transform?
	getPosition:function(){
		/*return new Vector(this.scene.x + this.rootContainer.canvas.width/2,
			this.scene.y + this.rootContainer.canvas.height/2);*/
		return this.toWorldPosition(new Vector(
				 this.rootContainer.canvas.width/2,
				 this.rootContainer.canvas.height/2
			));

		/*return new Vector(this.scene.x ,
			this.scene.y ) ;*/
	},

	getRawPosition:function(){
		return new Vector(this.scene.x ,
			this.scene.y )
	},

	toWorldPosition:function(screenPos){
		//TODO: Handle scaling
		return new Vector( screenPos.x -this.scene.x,screenPos.y-this.scene.y)
	},
	toScreenPosition:function(worldPos){
		//return 
	},
	Start:function(scene){
		this._super(scene);
		 this.rootContainer = this.scene;
		while(this.rootContainer.parent){
			this.rootContainer = this.rootContainer.parent;
		}
		this.scene.x = -10;
		this.scene.y = -20;
	}

})