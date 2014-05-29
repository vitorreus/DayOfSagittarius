window.addEventListener("load",function() {
  Q.Sprite.extend("Player",{

    // the init constructor is called on creation
    init: function(p) {
    
      // You can call the parent's constructor with this._super(..)
      this._super(p, {
        sheet: "player",  // Setting a sprite sheet sets sprite width and height
        x: 410,           // You can also set additional properties that can
        y: 90            // be overridden on object creation
      });
      
      // Add in pre-made components to get up and running quickly
      //this.add('2d, platformerControls');
      //this.add("2d, reposition");
      
      // Write event handlers to respond hook into behaviors.
      // hit.sprite is called everytime the player collides with a sprite
      this.on("hit.sprite",function(collision) {
        // Check the collision, if it's the Tower, you win!
        if(collision.obj.isA("Tower")) {
          // Stage the endGame scene above the current stage
          Q.stageScene("endGame",1, { label: "You Won!" }); 
          // Remove the player to prevent them from moving
          this.destroy();
        }
      });
      this.on("drag");
      Q.input.on("fire",this,"fire");
      Q.input.on("touchstart",this,"touch");
    },
      drag: function(touch) {
       this.p.dragging = true;
       this.p.x = touch.origX + touch.dx;
       this.p.y = touch.origY + touch.dy;
     },
     fire: function(){
      console.log("fire");
     },
     touch: function(touch){
      console.log("touch");
     }
  });  


// Sprites can be simple, the Tower sprite just sets a custom sprite sheet
Q.Sprite.extend("Tower", {
  init: function(p) {
    this._super(p, { sheet: 'tower' });
  }
});

// Create the Enemy class to add in some baddies
Q.Sprite.extend("Enemy",{
  init: function(p) {
    this._super(p, { sheet: 'enemy', vx: 100 });
    
    // Enemies use the Bounce AI to change direction 
    // whenver they run into something.
    this.add('2d, aiBounce');
    
    // Listen for a sprite collision, if it's the player,
    // end the game unless the enemy is hit on top
    this.on("bump.left,bump.right,bump.bottom",function(collision) {
      if(collision.obj.isA("Player")) { 
        Q.stageScene("endGame",1, { label: "You Died" }); 
        collision.obj.destroy();
      }
    });
    
    // If the enemy gets hit on the top, destroy it
    // and give the user a "hop"
    this.on("bump.top",function(collision) {
      if(collision.obj.isA("Player")) { 
        this.destroy();
        collision.obj.p.vy = -300;
      }
    });
  }
});


Q.Sprite.extend("BackGround",{
  init: function(p) {
      this._super(p, { sheet: 'bg', vx: 100 });
      //this.background("bg.png")
       //this.insert(new Q.BackGround({   x: 1, y: 1, z :100}));
       // this.insert(new Q.BackGround({   x: 10, y: 10, z :1}));

  }
  /* background: function(imageAsset, collisionLayer, width, x, y, z, repeat) {
      
       
      var bg_repeat = null;
 
      if(repeat){
        bg_repeat = stage_length / width;
      }else{
        bg_repeat = imageAsset.length;
      }
 
      var nextBg = x;
      for(var i = 0; i < bg_repeat; i++){
        this.insert(new Q.Sprite({ asset: imageAsset, x: nextBg, y: y, z: z }));
        nextBg = nextBg + width;
        var put = imageAsset[i];
        imageAsset.push(put);
      }
 
    }*/
})


// Create a new scene called level 1
Q.scene("level1",function(stage) {

  // Add in a tile layer, and make it the collision layer
  stage.collisionLayer(new Q.TileLayer({
                             dataAsset: 'level.json',
                             sheet:     'tiles' }));
                             
  // Create the player and add him to the stage


  for(var i = 0; i < 100; i++){
    for(var j = 0; j < 100; j++){
      stage.insert(new Q.BackGround({  x: i*64, y: j*64}));  
    }
  }

  var player = stage.insert(new Q.Player());

  var bg = stage.insert(new Q.BackGround());
  
  // Give the stage a moveable viewport and tell it
  // to follow the player.
  stage.add("viewport").follow(player);
  
  // Add in a couple of enemies
  stage.insert(new Q.Enemy({ x: 700, y: 0 }));
  stage.insert(new Q.Enemy({ x: 800, y: 0 }));


 
  
  // Finally add in the tower goal
  stage.insert(new Q.Tower({ x: 180, y: 50 }));
 


});

// To display a game over / game won popup box, 
// create a endGame scene that takes in a `label` option
// to control the displayed message.
Q.scene('endGame',function(stage) {
  var container = stage.insert(new Q.UI.Container({
    x: Q.width/2, y: Q.height/2, fill: "rgba(0,0,0,0.5)"
  }));
  
  var button = container.insert(new Q.UI.Button({ x: 0, y: 0, fill: "#CCCCCC",
                                                  label: "Play Again" }))         
  var label = container.insert(new Q.UI.Text({x:10, y: -10 - button.p.h, 
                                                   label: stage.options.label }));
  // When the button is clicked, clear all the stages
  // and restart the game.
  button.on("click",function() {
    Q.clearStages();
    Q.stageScene('level1');
  });
  
  // Expand the container to visibily fit it's contents
  container.fit(20);
});

// Q.load can be called at any time to load additional assets
// assets that are already loaded will be skipped
Q.load("sprites.png, sprites.json, level.json, tiles.png, bg.png",
  // The callback will be triggered when everything is loaded
  function() {
    // Sprites sheets can be created manually
    Q.sheet("tiles","tiles.png", { tilew: 32, tileh: 32 });
    Q.sheet("bg","bg.png", { tilew: 64, tileh: 64 });
    
    // Or from a .json asset that defines sprite locations
    Q.compileSheets("sprites.png","sprites.json");
    
    // Finally, call stageScene to run the game
    Q.stageScene("level1");
  });

});