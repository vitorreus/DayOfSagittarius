Scout=Fleet.extend({
	Start:function(scene){
		this.ships = 1;
		this._super(scene);
		this.transform.graphics.clear();
		this.transform.graphics.f("#f00").dc(0,0,5);
			
	}
})