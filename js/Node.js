var Node = Class.extend({
	objects:null, 
	parent:null,
	started:false,
	scene:null,
	addChild:function(obj){
		obj.parent = this;
		this.objects.push(obj);
	},
	init:function(){
		this.objects = [];
	},
	draw:function(arg){ //TODO:Deprecated, using CreateJS now
		for (var i = 0; i < this.objects.length ; i ++){
			if (this.objects[i] != this  ){
				this.objects[i].draw(arg);
			}
		}
	},
	FixedUpdate:function(arg){
		for (var i = 0; i < this.objects.length ; i ++){
			if (this.objects[i] != this  ){
				this.objects[i].FixedUpdate(arg);
			}
		}
	},
	Start:function(scene){
		this.scene = scene;
		if (this.started) return;
		this.started = true;
		for (var i = 0; i < this.objects.length ; i ++){
			if (this.objects[i] != this && this.objects[i].Start){
				this.objects[i].Start(scene);
			}
		}
	},
	//standard function to propagate anything to all objects:
	Event:function(e){
		for (var i = 0; i < this.objects.length ; i ++){
			if (this.objects[i] != this && this.objects[i].Event){
				this.objects[i].Event(e);
			}
		}
	},
	SendMessageUpwards:function(methodName,value){
		var retValue = null;
		if (this.parent){
			retValue = this.parent.SendMessageUpwards(methodName,value);
			if (this.parent[methodName]){
				retValue =  this.parent[methodName].apply(this.parent,value);
			}
		}
		return retValue;
	}

})
