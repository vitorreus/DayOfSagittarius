var Node = Class.extend({
	objects:[],
	pos:{x:0,y:0},
	add:function(obj){
		this.objects.push(obj);
	},
	draw:function(arg){ //TODO:Deprecated, using CreateJS now
		for (var i = 0; i < this.objects.length ; i ++){
			this.objects[i].draw(arg);
		}
	},
	fixedUpdate:function(arg){
		for (var i = 0; i < this.objects.length ; i ++){
			this.objects[i].fixedUpdate(arg);
		}
	},
	start:function(scene){
		for (var i = 0; i < this.objects.length ; i ++){
			this.objects[i].start(scene);
		}
	}

})
