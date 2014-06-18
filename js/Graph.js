var Graph = Transform.extend({
	vertices:null,
	configurations:null,
	bestConfig:null,
	configValue:-1,
	circles:null,
	//maxSteps:10000,
	step:0,
	init:function(vertices){
		this.vertices = vertices;
		this._super();
		this.configurations = [];
		this.bestConfig = this.createRandomConfig(vertices.length);
		this.configValue = this.evaluateConfig(this.bestConfig)
	},
	Update:function(){
		

		
		this._super();
		this.transform.graphics.clear();

		this.transform.graphics.beginStroke("#F00");
		//draw current best configuration
		var lastVertex =this.vertices[this.bestConfig [this.bestConfig.length-1]];
		this.transform.graphics.moveTo(lastVertex.x,lastVertex.y);
		for (var i in this.bestConfig){
			var v = this.vertices[this.bestConfig[i ]];
			this.transform.graphics.lineTo(v.x,v.y );

		}
		/*this.attackLine.graphics
				.moveTo(this.transform.x+10,this.transform.y+10)//+10 just to diferentiate attacking from attackers
				.lineTo(otherFleet.transform.x, otherFleet.transform.y );
		*/

	},
	FixedUpdate:function(){
		this._super();
		var newConfig = this.createRandomConfig(this.vertices.length);

		var newConfigValue = this.evaluateConfig(newConfig);
		if (newConfigValue < this.configValue){
			this.bestConfig = newConfig;
			this.configValue = newConfigValue
		}

		newConfig = this.mutateConfig(this.bestConfig);
		newConfigValue = this.evaluateConfig(newConfig);
		this.step++;
		if (newConfigValue < this.configValue*(1+1/(this.step/10))){
			this.bestConfig = newConfig;
			this.configValue = newConfigValue
		}

	},
	draw:function(){
		this._super();
		console.log(this.configValue  );
	},
	createRandomConfig:function(length){
		var c = [];
		for (var i = 0; i < length; i++){
			c.push(i);
		}
		//scramble:
		for (var i = 0; i < length; i++){
			//swap
			var randompos = Math.floor( Math.random()*length );
			var tmp = c[randompos];
			c[randompos]  = c[i];
			c[i] = tmp;
		}
		return c;
	},
	evaluateConfig:function(config){
		var d = 0;
		var lastVertex =this.vertices[config [config.length-1]];
		for (var i in config){
			var v = this.vertices[config[i ]];
			d += new Vector(v.x,v.y).subtract(new Vector(lastVertex.x,lastVertex.y)).length();
			lastVertex = v;
		}
		return d;
	},
	//makes a 2-change op
	mutateConfig:function(configOrig){
		var config = [];
		for (var i in configOrig){
			config.push(configOrig[i]);
		}
		var length = config.length;
		var p2 = Math.floor( Math.random()*length );
		var p1 = Math.floor( Math.random()*p2 );
		//swap:
		for (var i = p1 ; i < (p2+p1)/2; i++){
			var tmp = config[i];
			config[i] = config[p1+p2-i];
			config[p2-i+p1] = tmp;
			
		}
		return config;

	},
	Start:function(scene){
		this.circles = new createjs.Shape(); 
		this._super(scene);
		
		scene.addChild(this.circles)

		
		for (var i in this.vertices){
			var v=this.vertices[i]
			this.circles.graphics.f("#f00");
			this.circles.graphics.dc(v.x,v.y,3);
		}

	}
})

//The actual order of things. It stores an array of the order of the graph vertices:
var GraphConfiguration = Node.extend({});