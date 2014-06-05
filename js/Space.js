Space = Node.extend({
	//The map
	container:null,
	lines:null,
	Start:function(scene){
		this.container = new createjs.Container();
		scene.addChild(this.container); 
		this._super(this.container);
		this.lines = new createjs.Shape(); 
		this.lines.z = -100;
		this.lines.graphics.beginStroke("#04a");
		var lineNumber = 300;
		var lineSpacing = 100;
		var lineSize = 300*10;

		for(var  x = 0; x< lineNumber;x++){
			this.lines.graphics.moveTo(lineSpacing*x,-lineSize).lineTo(lineSpacing*x,lineSize);
		}

		for(var  y = 0; y< lineNumber;y++){
			this.lines.graphics.moveTo(-lineSize,lineSpacing*y).lineTo(lineSize,lineSpacing*y);
		}
		
		//.moveTo(200,200).lineTo(200,100)
		this.container.addChild(this.lines); 

	}
})