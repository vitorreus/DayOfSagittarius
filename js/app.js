
Player = Class.extend();



app  = new Node(); 
fleet1 = new Fleet();
//fleet1.add(new Fleet());
app.add(fleet1);


setInterval( function(a){return function (){a.draw()}}(app),1000 /*60fps*/ ); //try to do dynamic? Or will it be automatically slowed down and fixedupdate will have no problem?
setInterval( function(a){return function (){a.fixedUpdate()}}(app),1000/60 /*60fps*/ );