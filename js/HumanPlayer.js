HumanPlayer  = Player.extend({ 
	camera:null,
	//TODO: Create a touch class to handle this events. Aka UI class or something
	touchStart:null,
	touchStartCamera:null,
	touchStartCameraWorld:null,
	touchStartWorld:null,
	touching:false,
	moved:false,
	init:function(arg){
		this._super(arg);
		this.camera = new Camera();
		this.addChild(this.camera);
	},
	Event:function(e){ 
		if (e.name == "stagemousedown"){
			this.touchStart =(new Vector( e.evt.stageX ,e.evt.stageY));
			this.touchStartCamera =  (this.camera.getPosition());
			console.log(this.touchStartCamera);
			this.touching = true; 
			this.moved = false;
			
		}

		if (e.name == "stagemouseup"){
			this.touching = false;  
			if (!this.moved){
				this.moveFleets(this.camera.toWorldPosition(this.touchStart));
			}
		}

		if (e.name == "stagemousemove"){
			if (this.touching){

				
				var touch = this.camera.toWorldPosition(  new Vector( e.evt.stageX ,e.evt.stageY));
				console.log(touch);
				var delta = touch.subtract(this.camera.toWorldPosition(this.touchStart));
				if (delta.length() > 10){
					this.moved = true;
				}
				//console.log(this.camera.getRawPosition());
				this.camera.moveTo(
					this.touchStartCamera
					.subtract( delta)	
				);
			}
		}

		if (e.name == "mousewheel"){ 
			this.camera.zoom(e.evt.originalEvent.wheelDelta,0.001,new Vector(e.evt.offsetX,e.evt.offsetY));
		}

		
	},
	FixedUpdate:function(){
		this._super();
		//TODO: Follow average position of all selected fleets
		if (this.selectedFleets[0]){
			//this.camera.moveTo(this.selectedFleets[0].getPosition())
 		}
	},
	Start:function(scene){
		this._super(scene);

	}

});