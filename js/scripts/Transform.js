Transform = Node.extend({

	transform:null,
	init:function(){
		this._super();
		this.transform = new createjs.Shape(); 
	}

})