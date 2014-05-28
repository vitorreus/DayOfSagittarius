var Node = Class.extend({
	objects:[],
	pos:{x:0,y:0},
	add:function(obj){
		this.objects.push(obj);
	},
	draw:function(){
		for (var i = 0; i < this.objects.length ; i ++){
			this.objects[i].draw();
		}
	},
	fixedUpdate:function(){
		for (var i = 0; i < this.objects.length ; i ++){
			this.objects[i].fixedUpdate();
		}
	}
	
})


Fleet = Node.extend({
	energy:0,
	maxEnergy:100,
	reactorPower:.01,
	ships:15000,
	fixedUpdate:function(){
		//this._super();
		this.energy += this.reactorPower;
	},
	draw:function(){
		//this._super();
		console.log(this.energy);
	}
})

app  = new Node(); 
app.add(new Fleet());


setInterval( function(a){return function (){a.draw()}}(app),1000 /*60fps*/ ); //try to do dynamic? Or will it be automatically slowed down and fixedupdate will have no problem?
setInterval( function(a){return function (){a.fixedUpdate()}}(app),1000/60 /*60fps*/ );