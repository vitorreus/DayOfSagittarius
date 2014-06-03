CircleCollider  = Collider.extend({
	radius:0,
	transform:null,//TODO: make Collider extend Transform?
	init:function(radius,flags){
		//TODO:flags are used for collision layers
		this._super(flags);
		this.radius = radius;
	},
	FixedUpdate:function(){
		this._super();
		if (!debugPhysics) return;
		var pos = this.parent.getPosition();
		this.transform.x = pos.x;
		this.transform.y = pos.y;
	},
	Start:function(scene){
		this._super(scene);
		if (!debugPhysics) return;
		this.transform = new createjs.Shape();
		this.transform.graphics.beginStroke("#000000");
		this.transform.graphics.drawCircle(0, 0, this.radius);
		scene.addChild(this.transform);
	},
	CollidesWith:function(otherCollider,otherPosition){
		//sanity check:
		if (!(this.parent && this.parent.getPosition && otherPosition )) return false;

		if (otherCollider&& otherCollider instanceof CircleCollider){
			var distance = this.parent.getPosition()
								.subtract(otherPosition)
								.length();
			return  (distance <= this.radius + otherCollider.radius );
		}

	}
})