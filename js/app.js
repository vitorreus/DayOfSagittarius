
Player = Class.extend();



app  = new Node(); 
fleet1 = new Fleet();
//fleet1.add(new Fleet());
app.add(fleet1);


setInterval( function(a){return function (){a.draw()}}(app),1000 /*60fps*/ ); //try to do dynamic? Or will it be automatically slowed down and fixedupdate will have no problem?
setInterval( function(a){return function (){a.fixedUpdate()}}(app),1000/60 /*60fps*/ );


window.addEventListener("load",function() {

	// Set up an instance of the Quintus engine  and include
	// the Sprites, Scenes, Input and 2D module. The 2D module
	// includes the `TileLayer` class as well as the `2d` componet.
	var Q = window.Q = Quintus({audioSupported: [ 'wav','mp3','ogg' ]})
	        .include("Sprites, Scenes, Input, 2D, Anim, Touch, UI, TMX, Audio")
	        // Maximize this game to whatever the size of the browser is
	        .setup({ maximize: true })
	        // And turn on default input controls and touch input (for UI)
	        .controls(true).touch()
	        // Enable sounds.
	        .enableSound(); 
});
