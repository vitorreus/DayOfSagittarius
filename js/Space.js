Space = Node.extend({
	//The map
	container:null,
	lines:null,
	linesOutside:null,
	bg:null,
	bounds:null,
	FOW:null,
	FOWBorders:null,
	Start:function(scene){

		this.container = new createjs.Container();
		scene.addChild(this.container); 
		this._super(this.container);


		this.lines = new createjs.Shape(); 
		this.lines.z = 200;
		this.lines.graphics.beginStroke("#04a");

		var lineNumber = 300;
		var lineSpacing = 100;
		var lineSize = 200*10;

		this.bounds = {x:-lineSize,y:-lineSize,w:2*lineSize,h:2*lineSize}; 

		for(var  x = 0; x< lineNumber;x++){
			this.lines.graphics.moveTo(lineSpacing*x,-lineSize).lineTo(lineSpacing*x,lineSize);
		}

		for(var  y = 0; y< lineNumber;y++){
			this.lines.graphics.moveTo(-lineSize,lineSpacing*y).lineTo(lineSize,lineSpacing*y);
		}

		// masks can only be shapes.
		this.FOW = new createjs.Shape();
		// the mask's position will be relative to the parent of its target:

		// only the drawPolyStar call is needed for the mask to work:
		this.FOW.graphics.beginStroke("#FF0")
		this.FOWBorders = [];
		this.bg = new createjs.Shape()
		this.bg.mask = this.FOW;
		this.bg.z = 100
		
		this.bg.graphics.beginFill("#123").drawRect(this.bounds.x,this.bounds.y,this.bounds.w,this.bounds.h);

		this.container.addChild(this.bg); 

		//this.bg.cache(0,0, 150,150);
		

		//this.lines.filters = [ new createjs.ColorFilter(0, 0, 0, 1, 255, 0, 0)];
		//this.lines.cache(0,0, lineSize, lineSize);
		//.moveTo(200,200).lineTo(200,100)
		this.container.addChild(this.lines); 

	},
	FixedUpdate:function(){
		this._super();
		//this.lines.updateCache();
		this.FOW.graphics.clear();
		this.FOW.graphics.drawRect(this.bounds.x,this.bounds.y,this.bounds.w,this.bounds.h);
		var fleets = this.GetComponent(HumanPlayer).objects;
		//TODO:Create/remove borders depending on the mumber of ships
		for (var i in fleets){
			this.FOW.graphics.arc(fleets[i].transform.x,fleets[i].transform.y,200,0,Math.PI*2,true);
			if (!this.FOWBorders[i]){
				this.FOWBorders.push(new createjs.Shape());
				this.scene.addChild(this.FOWBorders[i]);
				this.FOWBorders[i].graphics.beginStroke ("#123").drawCircle(0,0,200);
				this.FOWBorders[i].z = 100
			} 
			
			 
			this.FOWBorders[i].x = fleets[i].transform.x;
			this.FOWBorders[i].y = fleets[i].transform.y;
		}
		//TODO:Remove excess borders:
	}

})