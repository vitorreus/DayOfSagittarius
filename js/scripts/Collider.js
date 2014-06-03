Collider = Node.extend({
	init:function(){
		this._super();
		
	},
	Start:function(scene){
		this._super(scene);
		if (this.parent){
			if (!this.parent._colliders) this.parent._colliders = [];
			this.parent._colliders.push(this);
		}
	},
	CollidesWith:function(otherCollider,otherPosition){
		return false;
	}
})