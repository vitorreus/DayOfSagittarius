var Node = Class.extend({
	objects:[], 
	addChild:function(obj){
		this.objects.push(obj);
	},
	add:function(obj){
		console.log("Node.add method is Deprecated");
		this.addChild(obj);
	},
	draw:function(arg){ //TODO:Deprecated, using CreateJS now
		for (var i = 0; i < this.objects.length ; i ++){
			if (this.objects[i] != this  ){
				this.objects[i].draw(arg);
			}
		}
	},
	fixedUpdate:function(arg){
		for (var i = 0; i < this.objects.length ; i ++){
			if (this.objects[i] != this  ){
				this.objects[i].fixedUpdate(arg);
			}
		}
	},
	Start:function(scene){
		for (var i = 0; i < this.objects.length ; i ++){
			if (this.objects[i] != this && this.objects[i].Start){
				this.objects[i].Start(scene);
			}
		}
	},
	//standard function to propagate anything to all objects:
	Event:function(scene){
		for (var i = 0; i < this.objects.length ; i ++){
			if (this.objects[i] != this && this.objects[i].Event){
				this.objects[i].Event(scene);
			}
		}
	}

})
