
Player = Class.extend();


var stage;
app  = new Node(); 
fleet1 = new Fleet(stage);
//fleet1.add(new Fleet());
app.add(fleet1);


setInterval( function(a){return function (){a.draw()}}(app),1000 /*60fps*/ ); //try to do dynamic? Or will it be automatically slowed down and fixedupdate will have no problem?
setInterval( function(a){return function (){a.fixedUpdate()}}(app),1000/60 /*60fps*/ );

// window.addEventListener("load",function() {


function handleComplete(){
	var ball = new createjs.Shape();
	
	ball.addEventListener("click",handleClick);

	


	ball.graphics.beginFill("#000000").drawCircle(0,0,50);
	ball.x = 50;
	ball.y = 200;
 
 

	createjs.Tween.get(ball,{loop:true}).to({x:450}, 3000).to({x:50},3000);
	

	stage.addChild(ball);
	//stage.removeChild(ball);

	createjs.Ticker.addEventListener("tick",tick);
	//setInterval(tick,1000/10);
	

	stage.on("stagemousedown", function(evt) {
	console.log("the canvas was clicked at "+evt.stageX+","+evt.stageY);
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

function handleClick(event){
	console.log("click");
	var bmp = new createjs.Bitmap(queue.getResult("bg"));
	bmp.x = Math.random()*500;
	bmp.y = Math.random()*500;

	stage.addChild(bmp);
}