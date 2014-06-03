Scene = Node.extend({

	tree:null,//quadtree for collision detection 	
	
	Start:function(stage){
		var isPointQuad = true;
		this.tree = new QuadTree(
		{
			x:0,
			y:0,
			width:300,
			height:300
		} , isPointQuad, 7); 
		this._super(stage); 
		
	},
	quadtreeInsert:function(transform){
		this.tree.insert(transform);
	},
	quadtreeRetrieve:function(pos){ 
		return  this.tree.retrieve(pos);
	},
	
	FixedUpdate:function(){
		this._super();
	}
})