Player = Node.extend({
	selectedFleets:null,
	fleets:null,
	color:"#000",
	init:function(color){
		this._super(); 
		this.selectedFleets = [];
		if (color){
			this.color = color;
		}
		this.fleets  = new Node();
		this.addChild(this.fleets);
		
	},
	selectFleet:function(fleet){
		this.selectedFleets.push(fleet);
	},
	selectNone:function(){
		this.selectedFleets = [];
	},
	moveFleets:function(pos){
		for (var i = 0 ; i < this.selectedFleets.length; i++){
			this.selectedFleets[i].moveTo(pos);
		}
	},
	//factory method for any new object, usually used for Fleets:
	construct:function(type){
		var newObj = new type();
		this.fleets.addChild(newObj);
		return newObj;
	}

});