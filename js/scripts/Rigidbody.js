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
			otherFleet = items[i].owner
			if (otherFleet != this){  

				var thisCircle = this.parent.GetComponent(CircleCollider);
				var otherCircle = otherFleet.GetComponent(CircleCollider)
				if (thisCircle &&  otherCircle &&this.parent.getPosition &&otherFleet.getPosition){
						var distance = this.parent.getPosition()
							.subtract(otherFleet.getPosition())
							.length();
						if (distance <= thisCircle.radius + otherCircle.radius ){
							this.SendMessageUpwards("OnCollisionStay",
								[{collider:otherCircle, gameObject:otherFleet}]);

						}


				}
			
			}
		}
	}
})

//TODO:
//static array with all rigidbodies, for Quadtree update