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
	},
	Destroy:function(){
		this._super();
		var me = this.parent._colliders.indexOf(this);
		this.parent._colliders.splice(me,1);
	}
})