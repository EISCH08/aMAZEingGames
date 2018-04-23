var ship;
var flowers = [];
var drops = [];
var rows; //rows of enemies
var frames = 40; //framerate of game
var framecount;
var cooldown; //player shot, they are on cooldown (true)


function setup(){
  createCanvas(600,400);
  frameRate(frames);
  reset();
}

function reset(){
  cooldown = false; //not on cooldown at start
  framecount = 0;
  rows = 4;
  ship = new Ship();
  //drop = new Drop(width/2, 80);
  for(var i = 0; i < 8; i++){
    flowers[i] = new Flower(i*60 + 20, 60);
  }
}

function draw(){
  background(51);

  if(cooldown){
    framecount += 1;
    framecount = framecount%(frames/2);
    if(framecount == 0){ //after 1 second (x frames) cooldown is off
      cooldown = false;
    }
  }

  ship.show();
  ship.move(ship.xdirection);

  for(var i = 0; i < drops.length; i++){
    drops[i].show();
    drops[i].move();
    for(var j = 0; j < flowers.length; j++){
      if(drops[i].collision(flowers[j]))
      {
        flowers[j].destroy();
        drops[i].evaporate();
      }
    }
  }

  var edge = false;
  for(var i = 0; i < flowers.length; i++){
    flowers[i].show();
    flowers[i].move();

    if (flowers[i].x + flowers[i].r > width || flowers[i].x-flowers[i].r < 0){
      edge = true;
    }
  }

  if(edge){
    for(var i = 0; i < flowers.length; i++){
      flowers[i].shiftDown();
    }
    if(rows > 0){
      rows -= 1; //one less row left to spawn
    }

    if(rows > 0){
      for(var i = 0; i < 8; i++){
        var newFlower = new Flower(i*60 + 20, 60)
        flowers.push(newFlower);
      }
    }
}

  for(var i = drops.length-1; i >= 0; i--){
    if(drops[i].evaporated){
      drops.splice(i, 1);
    }
  }

  for(var i = flowers.length-1; i >= 0; i--){
    if(flowers[i].destroyed){
      flowers.splice(i, 1);
    }
  }
}

function keyReleased(){
  if(key != ' '){
    ship.setDirection(0);
  }
}

function keyPressed(){
  if(key === ' ' && !cooldown){
    cooldown = true;
    var drop = new Drop(ship.x, height);
    drops.push(drop);
  }
  if(keyCode === RIGHT_ARROW){
    ship.setDirection(1);
  }
  else if(keyCode === LEFT_ARROW){
    ship.setDirection(-1);
  }
}
