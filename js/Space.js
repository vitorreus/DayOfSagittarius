Space = Node.extend({
	//The map
	container:null,
	lines:null,
	linesOutside:null,
	FOWGraphics:null,
	bounds:null,
	FOWMask:null,
	FOWBorders:null,
	bg:null,
	Start:function(scene){

		this.container = new createjs.Container();
		scene.addChild(this.container); 
		this._super(this.container);


		this.lines = new createjs.Shape(); 
		this.lines.z = 5;
		this.lines.graphics.beginStroke("#84dfdc");


		this.linesOutside = new createjs.Shape(); 
		this.linesOutside.z = 200;
		this.linesOutside.graphics.beginStroke("#2d3e44");

		var lineNumber = 300;
		var lineSpacing = 100;
		var lineSize = 200*10;


		this.bounds = {x:-lineSize,y:-lineSize,w:2*lineSize,h:2*lineSize}; 

		for(var  x = 0; x< lineNumber;x++){
			this.lines.graphics.moveTo(lineSpacing*x,-lineSize).lineTo(lineSpacing*x,lineSize);
			this.linesOutside.graphics.moveTo(lineSpacing*x,-lineSize).lineTo(lineSpacing*x,lineSize);
		
		}

		for(var  y = 0; y< lineNumber;y++){
			this.lines.graphics.moveTo(-lineSize,lineSpacing*y).lineTo(lineSize,lineSpacing*y);
			this.linesOutside.graphics.moveTo(-lineSize,lineSpacing*y).lineTo(lineSize,lineSpacing*y);
		
		}

		

		// masks can only be shapes.
		this.FOWMask = new createjs.Shape();
		// the mask's position will be relative to the parent of its target:

		// only the drawPolyStar call is needed for the mask to work:
		//this.FOWMask.graphics.beginStroke("#FF0")
		this.FOWBorders = [];
		this.FOWGraphics = new createjs.Shape()
		this.FOWGraphics.mask = this.FOWMask;
		this.FOWGraphics.z = 100
		
		this.linesOutside.mask = this.FOWMask;

		this.FOWGraphics.graphics.beginFill("#080c10").drawRect(this.bounds.x,this.bounds.y,this.bounds.w,this.bounds.h);


		


		this.bg = new createjs.Shape()
		this.bg.z = 0;
		this.bg.graphics.beginFill("#1f263d").drawRect(this.bounds.x,this.bounds.y,this.bounds.w,this.bounds.h);
		this.container.addChild(this.bg); 

		this.container.addChild(this.linesOutside);
		this.container.addChild(this.lines); 
		this.container.addChild(this.FOWGraphics); 
		//



		//this.FOWGraphics.cache(0,0, 150,150);
		

		//this.lines.filters = [ new createjs.ColorFilter(0, 0, 0, 1, 255, 0, 0)];
		//this.lines.cache(0,0, lineSize, lineSize);
		//.moveTo(200,200).lineTo(200,100)


	},
	FixedUpdate:function(){
		this._super();
		//this.lines.updateCache();
		this.FOWMask.graphics.clear();
		this.FOWMask.graphics.drawRect(this.bounds.x,this.bounds.y,this.bounds.w,this.bounds.h);
		var fleets = this.GetComponent(HumanPlayer).objects;
		
		while (this.FOWBorders.length > fleets.length  ){
			var c = this.FOWBorders.pop();
			this.scene.removeChild(c);
			delete c;
		}


		for (var i in fleets){
			this.FOWMask.graphics.arc(fleets[i].transform.x,fleets[i].transform.y,200,0,Math.PI*2,true);
			if (!this.FOWBorders[i]){
				this.FOWBorders.push(new createjs.Shape());
				this.scene.addChild(this.FOWBorders[i]);
				this.FOWBorders[i].graphics.beginStroke ("#080c10").drawCircle(0,0,200);
				this.FOWBorders[i].z = 50
			} 
			
			 
			this.FOWBorders[i].x = fleets[i].transform.x;
			this.FOWBorders[i].y = fleets[i].transform.y;
		}

		
	}

})