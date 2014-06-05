//handles physics

Rigidbody = Node.extend({



	/*OnCollisionEnter	OnCollisionEnter is called when this collider/rigidbody has begun touching another rigidbody/collider.
	OnCollisionExit	OnCollisionEnter is called when this collider/rigidbody has stopped touching another rigidbody/collider.
	OnCollisionStay	OnCollisionStay is called once per frame for every collider/rigidbody that is touching rigidbody/collider.*/

	Start:function(){
		this._super();
		//TODO: optimize this, do not use strings
		//TODO: insert with correct bounding boxes, depending on colliders 
		this.SendMessageUpwards("quadtreeInsert",[this.parent.transform]);
	},
	FixedUpdate:function(){
		//check collisions:

		//TODO:Update Quadtree


 		//find nearest enemy ship and atack it
		var items = this.SendMessageUpwards("quadtreeRetrieve",[this.parent.transform]);
		
		
		
		for (var i = 0; i < items.length ; i++){
			var otherObject = items[i].owner
			if (otherObject != this){  
				//checks all colliders:
				for (var my = 0;my < this.parent._colliders.length;my++){
					var thisCollider = this.parent._colliders[my];
					for (var theirs = 0;theirs < otherObject._colliders.length;theirs++){
						var otherCollider = otherObject._colliders[theirs];
						if (thisCollider.CollidesWith(otherCollider,otherObject.getPosition())){
							this.SendMessageUpwards("OnCollisionStay",
										[{collider:otherCollider, gameObject:otherObject}]);
						}
					}
				}
			}
		}
	}
})

//TODO:
//static array with all rigidbodies, for Quadtree update