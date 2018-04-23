var ship;
var flowers = [];
var drops = [];


function setup(){
  createCanvas(600,400);
  ship = new Ship();
  //drop = new Drop(width/2, 80);
  for(var i = 0; i < 6; i++){
    flowers[i] = new Flower(i*80+80, 60);
  }


}

function draw(){
  background(51);
  ship.show();
  ship.move(ship.xdirection);

  for(var i = 0; i < drops.length; i++){
    drops[i].show();
    drops[i].move();
    for(var j = 0; j < flowers.length; j++){
      if(drops[i].collision(flowers[j]))
      {
        flowers[j].grow();
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
}

  for(var i = drops.length-1; i >= 0; i--){
    if(drops[i].evaporated){
      drops.splice(i, 1);
    }
  }
}

function keyReleased(){
  if(key != ' '){
    ship.setDirection(0);
  }

}

function keyPressed(){
  if(key === ' '){
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
