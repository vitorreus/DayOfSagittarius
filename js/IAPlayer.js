IAPlayer  = Player.extend({

	Start:function(scene){ 
		this._super(scene);
		setTimeout(function(obj){return function (){obj.randomMove()}}(this),Math.random()*500+500);
	},
	randomMove:function(){
		this.selectNone();
		this.selectFleet(this.fleets.GetChild(Math.floor(Math.random()*this.fleets.childCount())));
		this.moveFleets(new Vector(Math.random()*500,Math.random()*500));
		setTimeout(function(obj){return function (){obj.randomMove()}}(this),Math.random()*3000+3000)
	}

});