Transform = Node.extend({

	transform:null,
	_speed :null,
	init:function(){
		this._speed = new Vector(0,0,0);
		this._super();
		this.transform = new createjs.Shape(); 

	},
	getPosition:function(){
		return new Vector(this.transform.x,this.transform.y);
	},
	getSpeed:function(){
		//TODO:Fix this
		return this._speed;
	},
	FixedUpdate:function(){
		var pos = this.getPosition();
		this._super();
		this._speed=  this.getPosition().subtract(pos); 
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