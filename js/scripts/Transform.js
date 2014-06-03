Transform = Node.extend({

	transform:null,
	init:function(){
		this._super();
		this.transform = new createjs.Shape(); 
	},
	getPosition:function(){
		return new Vector(this.transform.x,this.transform.y);
	},
	getDirection:function(){
		var deg = this.transform.rotation;
		return  new Vector(Math.cos(degToRad(deg)),Math.sin(degToRad(deg)));
	},
	Start:function(stage){
		this._super(stage);
		stage.addChild(this.transform);
	}

})