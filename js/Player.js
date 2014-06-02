Player = Node.extend({
	selectedFleets:null,
	init:function(){
		this._super(); 
		this.selectedFleets = [];
		
	},
	selectFleet:function(fleet){
		this.selectedFleets.push(fleet);
	},
	moveFleets:function(pos){
		for (var i = 0 ; i < this.selectedFleets.length; i++){
			this.selectedFleets[i].moveTo(pos);
		}
	},
	//factory method for any new object, usually used for Fleets:
	construct:function(type){
		var newObj = new type();
		this.addChild(newObj);
		return newObj;
	}

});