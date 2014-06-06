
//TODO: put this var insede collider or other physics-related class
var debugPhysics = false;
function handleComplete(){
	var stage;
	stage = new createjs.Stage("myCanvas");
	var enemy = new IAPlayer("#0FF");
	enemy.selectFleet(enemy.construct(Fleet) );
	enemy.construct(Fleet) ;
 
	var player = new HumanPlayer("#00F");
	var fleet1 = player.construct(Fleet);
	//fleet1.ships = 100;
	player.selectFleet(fleet1); 


	var app  = new Scene();

	var map = new Space();
	map.addChild(enemy);
	map.addChild(player);

	app.addChild(map);
	
	app.Start(stage);

	fleet1.transform.x = 300;
	fleet1.transform.y = 300;

	//TODO: Normalize fixedUpdate in case of FPS Drop
	var FixedUpdateRate = 1000/60
	setInterval( function(a){return function (){a.draw()}}(app),1000 /*60fps*/ ); //try to do dynamic? Or will it be automatically slowed down and fixedupdate will have no problem?
	setInterval( function(a){return function (){
		//Decomment for quick n dirty fast forward:
		//for (var i = 0 ; i < 20; i++)
			a.FixedUpdate()
	}}(app),FixedUpdateRate /*60fps*/ );

	function tick(event){
		app.Update();
		stage.update();
	}

	createjs.Ticker.setFPS(60); 
	createjs.Ticker.addEventListener("tick",tick);
	//setInterval(tick,1000/60);
	

	stage.on("stagemousedown", function(evt) {
		app.Event({name:"stagemousedown",evt:evt});
	})

	//Fullscreen
	var canvas = document.getElementById('myCanvas');
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
