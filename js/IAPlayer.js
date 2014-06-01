IAPlayer  = Player.extend({

	Start:function(){ 
		setTimeout(function(obj){return function (){obj.randomMove()}}(this),Math.random()*3000);
	},
	randomMove:function(){
		this.moveFleets(new Vector(Math.random()*500,Math.random()*500));
		setTimeout(function(obj){return function (){obj.randomMove()}}(this),Math.random()*3000)
	}

});