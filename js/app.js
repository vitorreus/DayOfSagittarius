
Player = Class.extend();


var stage;
function handleComplete(){
	app  = new Node(); 

	app.addChild(new Fleet());

	
	fleet1 = new Fleet(); 
	//fleet1.add(new Fleet());
	var player = new HumanPlayer();
	player.addFleet(fleet1);
	//app.addChild(new Node());
	app.addChild(fleet1);
	app.addChild(player);
	
	app.Start();
	setTimeout(function(){
		fleet1.transform.x = 300;
		fleet1.transform.y = 300;
	},1);

	setInterval( function(a){return function (){a.draw()}}(app),1000 /*60fps*/ ); //try to do dynamic? Or will it be automatically slowed down and fixedupdate will have no problem?
	setInterval( function(a){return function (){a.FixedUpdate()}}(app),1000/60 /*60fps*/ );

	createjs.Ticker.addEventListener("tick",tick);
	//setInterval(tick,1000/60);
	

	stage.on("stagemousedown", function(evt) {
		app.Event({name:"stagemousedown",evt:evt});
	})
 
}

function init(){
	stage = new createjs.Stage("myCanvas");

	queue = new createjs.LoadQueue(false); //pass false to use locally
	queue.addEventListener("complete",handleComplete)
	queue.loadManifest([{id:"bg",src:"images/bg.png"}])

	

} 

function tick(event){
	stage.update();

}

