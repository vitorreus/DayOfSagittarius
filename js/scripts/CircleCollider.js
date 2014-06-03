CircleCollider  = Collider.extend({
	radius:0,
	init:function(radius,flags){
		//TODO:flags are used for collision layers
		this._super(flags);
		this.radius = radius;
	}
})