Player = Node.extend({
	selectedFleets:null,
	init:function(){
		this.selectedFleets = [];
		this._super();
	},
	addFleet:function(fleet){
		this.selectedFleets.push(fleet);
	},
	moveFleets:function(pos){
		for (var i = 0 ; i < this.selectedFleets.length; i++){
			this.selectedFleets[i].moveTo(pos);
		}
	}
});