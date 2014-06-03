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
		
		
		//TODO: filter only enemies
		for (var i = 0; i < items.length ; i++){
			otherFleet = items[i].owner
			if (otherFleet != this){  
				if (this.parent.inRange(otherFleet)){
					this.parent.attack(otherFleet);
					continue; //attack just one
				}/*
				var thisCircle = this.parent.GetComponent(CircleCollider);
				var otherCircle = otherFleet.parent.GetComponent(CircleCollider)
				if (thisCircle &&  otherCircle
					&& this.parent.GetComponent){

				}
				*/
			}
		}
	}
})

//TODO:
//static array with all rigidbodies, for Quadtree update