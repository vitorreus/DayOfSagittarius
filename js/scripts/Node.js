function sortByZ(a,b) {
	if (a.z === null) a.z = 0;
	if (b.z === null) b.z = 0;
    if (a.z < b.z) return -1;
    if (a.z > b.z) return 1;
    return 0;
}

var Node = Class.extend({
	objects:null, 
	parent:null,
	components:null,//stores a hash of childs with key beying the type of the child. To be used with GetComponent  
	started:false,
	scene:null,
	tick:0,
	_started:false,
	addChild:function(obj){
		obj.parent = this;
		this.objects.push(obj);
		this.components[obj.constructor] = obj;
		if (this._started){
			obj.Start(this.scene);
		}
	},
	init:function(){
		this.objects = [];
		this.components ={};
	},
	childCount:function(){
		return this.objects.length;
	},
	GetChild:function(i){
		return this.objects[i];
	},
	RemoveChild:function(obj){
		var index =  this.objects.indexOf(obj);
		this.objects.splice(index,1);
		return true;
	},
	Destroy:function(){
		//going from back to forward because we are removing elements
		for (var i = this.objects.length-1; i >= 0; i--){
			if (this.objects[i] != this && this.objects[i].Destroy){
	    		this.objects[i].Destroy();
	    	}
	    }
		if (this.parent){
	    	this.parent.RemoveChild(this);
	    	delete components;
	    	delete objects;
	    	return true;
	    }
	    return false;

	},
	draw:function(arg){ //TODO:Deprecated, using CreateJS now
		for (var i = 0; i < this.objects.length ; i ++){
			if (this.objects[i] != this  ){
				this.objects[i].draw(arg);
			}
		}
	},
	FixedUpdate:function(arg){
		//this.tick ++;
		
		for (var i = 0; i < this.objects.length ; i ++){
			if (this.objects[i] != this  ){
				this.objects[i].FixedUpdate(arg);
			}
		}
	},
	Update:function(arg){
		//this.tick ++;
		
		for (var i = 0; i < this.objects.length ; i ++){
			if (this.objects[i] != this   &&this.objects[i].Update){
				this.objects[i].Update(arg);
			}
		}
		//if (this.scene&&this.scene.tick <= this.tick){
			//this.scene.tick ++ 
			//TODO: change to false only if a z changes
			//TODO:Optimize this, it takes up to 2% of processing time:
		/*if (this.scene){
			this.scene.sortChildren(sortByZ);
		}*/
		//}
	},
	SortZIndex:function(){
		if (this.scene){
			this.scene.sortChildren(sortByZ);
		}
		for (var i = 0; i < this.objects.length ; i ++){
			if (this.objects[i] != this && this.objects[i].SortZIndex){
				this.objects[i].SortZIndex();
			}
		}
	},
	Start:function(scene){
		this._started = true;
		this.scene = scene;
		/*if (scene){
			this.scene.tick = this.tick;
		}*/
		if (this.started) return;
		this.started = true;
		for (var i = 0; i < this.objects.length ; i ++){
			if (this.objects[i] != this && this.objects[i].Start){
				this.objects[i].Start(scene);
			}
		}
		this.SortZIndex();
		//this.SendMessageUpwards("SortZIndex");
	},
	//standard function to propagate anything to all objects:
	Event:function(e){
		for (var i = 0; i < this.objects.length ; i ++){
			if (this.objects[i] != this && this.objects[i].Event){
				this.objects[i].Event(e);
			}
		}
	},
	//TODO: optimize this, do not use strings
	SendMessageUpwards:function(methodName,value){
		var retValue = null;
		if (this.parent){
			retValue = this.parent.SendMessageUpwards(methodName,value);
			if (this.parent[methodName]){
				retValue =  this.parent[methodName].apply(this.parent,value);
			}
		}
		return retValue;
	},
	GetComponent:function(type){
		return this.components[type];
	}

})
