
//TODO: put this var insede collider or other physics-related class
var debugPhysics = false;
function handleComplete(){
	var canvas = document.getElementById('myCanvas');
	var stage;
	stage = new createjs.Stage(canvas);
	var enemy = new IAPlayer("#0FF");
	enemy.selectFleet(enemy.construct(Fleet) );
	enemy.construct(Fleet) ;
 
	var player = new HumanPlayer("#00F");
	var fleet1 = player.construct(Fleet);
	//fleet1.ships = 100;
	player.selectFleet(fleet1); 


	  app  = new Scene();

	var map = new Space();
	map.addChild(enemy);
	map.addChild(player);

	app.addChild(map);
	
	app.Start(stage);

	fleet1.transform.x = 300;
	fleet1.transform.y = 300;

	//TODO: Normalize fixedUpdate in case of FPS Drop
	var FixedUpdateRate = 1000/60
	var MaxFrameRate = 60;
	var iddleTimeCheckInterval = 500;
	var iddleTimeMs = iddleTimeCheckInterval;

	setInterval( function(a){return function (){a.draw()}}(app),1000 /*60fps*/ ); //try to do dynamic? Or will it be automatically slowed down and fixedupdate will have no problem?
	setInterval( function(a){return function (){
		//Decomment for quick n dirty fast forward:
		var start = new Date().getTime();
		for (var i = 0 ; i < 20; i++)
			a.FixedUpdate()
		iddleTimeMs -= new Date().getTime()-start;
	}}(app),FixedUpdateRate /*60fps*/ );



	function tick(event){
		var start = new Date().getTime();
		app.Update();
		stage.update();
		var delta = new Date().getTime()-start;
	}

	 
	var currentFPS = MaxFrameRate;
	/*setInterval(
		function(){
			if (iddleTimeMs > 0 ){
				currentFPS*= 1 + iddleTimeMs/iddleTimeCheckInterval;
			}else{
				currentFPS = createjs.Ticker.getMeasuredFPS()*1.05;
			}
			if (currentFPS > MaxFrameRate){
				currentFPS = MaxFrameRate;
			}
			currentFPS = Math.floor(currentFPS);
			createjs.Ticker.setFPS(currentFPS);
			console.log(new Date() .getTime()); 
			iddleTimeMs = iddleTimeCheckInterval
		},iddleTimeCheckInterval)*/

	
	createjs.Ticker.setFPS(MaxFrameRate); 
	createjs.Ticker.addEventListener("tick",tick);
	//setInterval(tick,1000/60);
	
	var events = ["stagemousedown","stagemousemove","stagemouseup"] ;

	for (var i in events){
		stage.on(events[i], function(evt) {
			app.Event({name:evt.type,evt:evt});
		})
	}

	//special case for whel:
	$(canvas).bind('mousewheel', function(event) { 
		//console.log(app)
	    app.Event({name:"mousewheel",evt:event});
	}); 

	$(canvas).bind('DOMMouseScroll', function(event) {
		console.log(event)
	    app.Event({name:"mousewheel",evt:event});
	});
 

	//Fullscreen 
    function resizeCanvas() {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
            //need to update the stage on resize to avaid flashing
            stage.update();
    }
    // resize the canvas to fill browser window dynamically
    window.addEventListener('resize', resizeCanvas, false);
    resizeCanvas();

    try{
    	toggleFullScreen();
   		document.body.requestFullscreen()
	}catch(e){}
 
}

function init(){
	

	queue = new createjs.LoadQueue(false); //pass false to use locally
	queue.addEventListener("complete",handleComplete)
	queue.loadManifest([{id:"bg",src:"images/bg.png"}])
} 
