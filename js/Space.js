Space = Node.extend({
	//The map
	container:null,
	lines:null,
	linesOutside:null,
	FOWGraphics:null,
	bounds:null,
	FOWMask:null,
	InverseFOWMask:null,
	FOWAlphaMap:null,
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

		//filter:
		var removeThisVar = 1000
		this.FOWAlphaMap = new createjs.Shape();
		this.FOWAlphaMap.graphics.f("#fff").drawRect(0, 0, removeThisVar, removeThisVar).ef();
		this.FOWAlphaMap.graphics.f("#000").dc(100,100,200);
		this.FOWAlphaMap.cache(0, 0, removeThisVar, removeThisVar);
		
		
		
		//this.scene.addChild(this.FOWAlphaMap);
		//this.FOWAlphaMap.z = 500;
		//box.graphics.beginLinearGradientFill(["#000000", "rgba(0, 0, 0, 0)"], [0, 1], 0, 0, lineSize, lineSize)
		//box.graphics.drawRect(0, 0, lineSize, lineSize);
		
		

		// masks can only be shapes.
		this.FOWMask = new createjs.Shape();
		// the mask's position will be relative to the parent of its target:

		// only the drawPolyStar call is needed for the mask to work:
		//this.FOWMask.graphics.beginStroke("#FF0")
		this.FOWGraphics = new createjs.Shape()
		this.FOWGraphics.filters = [new createjs.AlphaMapFilter(this.FOWAlphaMap.cacheCanvas)];
		
		this.FOWGraphics.z = 100
		
		this.linesOutside.mask = this.FOWMask;

		this.FOWGraphics.graphics.beginFill("#080c10").drawRect(this.bounds.x,this.bounds.y,this.bounds.w,this.bounds.h);

		this.FOWGraphics.cache(0,0,removeThisVar,removeThisVar);
		
		this.bg = new createjs.Shape()
		this.bg.z = 0;
		this.bg.graphics.beginFill("#1f263d").drawRect(this.bounds.x,this.bounds.y,this.bounds.w,this.bounds.h);
		this.container.addChild(this.bg); 

		this.container.addChild(this.linesOutside);
		this.container.addChild(this.lines); 
		this.container.addChild(this.FOWGraphics); 
		//


		//we are using a dirty trick here to discern between move and scout. 
		this.InverseFOWMask = new createjs.Shape();
		this.InverseFOWMask.z=10000;

		//roles are inverted because mask does not work, so we are using layer stacking:
		this.FOWGraphics.addEventListener("click",function(self){
													return function(e){
														self.handleMove(e);
													}
												}(this)
		);
		this.bg.addEventListener("click",		function(self){
													return function(e){
														self.handleScout(e);
													}
												}(this)
		);

		//inverted!
		this.FOWGraphics.hitArea = this.InverseFOWMask; 

		//this.container.addChild(this.InverseFOWMask);

		this.InverseFOWMask.z = 1;
		//this.InverseFOWMask.compositeOperation= "destination-out";
		//this.FOWMask.z = 10000;
		//this.container.addChild(this.FOWMask);
		//this.container.addChild(this.FOWGraphics.hitArea);
		//this.FOWGraphics.cache(0,0, 150,150);
		

		//this.lines.filters = [ new createjs.ColorFilter(0, 0, 0, 1, 255, 0, 0)];
		//this.lines.cache(0,0, lineSize, lineSize);
		//.moveTo(200,200).lineTo(200,100)


	},
	handleMove:function(e){
		console.log("move");
		console.log(e);
		this.Event({name:"seeingClick",evt:e});
	},
	handleScout:function(e){
		console.log("scout");
		console.log(e);
		this.Event({name:"fogClick",evt:e});
	},
	Update:function(){
		this._super();
		//this.lines.updateCache();
		this.FOWMask.graphics.clear();
		this.InverseFOWMask.graphics.clear(); //Is this needed?
		this.FOWAlphaMap.graphics.clear();
		//this.FOWMask.graphics.f("#f00").dc(100,100,70);
		//return ;
		var fleets = this.GetComponent(HumanPlayer).fleets.objects;
		
		var removeThisVar = 1000;//todo change this with canvas bounds, get from camera, etc
		this.FOWAlphaMap.graphics.f("#fff").drawRect(0, 0, removeThisVar, removeThisVar).ef();
		
		
		

		for (var i in fleets){
			//this.FOWMask.graphics.moveTo(fleets[i].transform.x,fleets[i].transform.y);
			//this.FOWMask.graphics.f("#f00").arc(fleets[i].transform.x,fleets[i].transform.y,200,0,Math.PI*2,true).cp().ef();
			
			this.InverseFOWMask.graphics.f("#f00").drawCircle(fleets[i].transform.x,fleets[i].transform.y,200);
			 
			this.FOWAlphaMap.graphics.f("#000").dc(fleets[i].transform.x,fleets[i].transform.y,200);
		}
		this.FOWMask.graphics.f("#f00").drawRect(this.bounds.x,this.bounds.y,this.bounds.w,this.bounds.h).cp().ef();
		
		this.FOWAlphaMap.updateCache(true);
		this.FOWGraphics.filters = [new createjs.AlphaMapFilter(this.FOWAlphaMap.cacheCanvas)];
		this.FOWGraphics.updateCache(true);
		
	}

})