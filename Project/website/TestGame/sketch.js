var s;
var sizeScale = 25;
var speedScale = sizeScale;

var food;

function setup() {
  createCanvas(600, 600);
  s = new Snake();
  frameRate(15);
  spawnFood();

}

function spawnFood() {
  var cols = floor(width/sizeScale);
  var rows = floor(height/sizeScale);
  food = createVector(floor(random(cols)), floor(random(rows)));
  food.mult(sizeScale);
}

function draw() {
  background(51);

  if (s.eat(food)) {
    spawnFood();
  }
  s.death();
  s.update();
  s.show();


  fill(255, 0, 100);
  rect(food.x, food.y, sizeScale, sizeScale);
}





function keyPressed() {
  if (keyCode === UP_ARROW) {
    if(s.y === 0 && s.yspeed === -1){ //support for if snake is at edge and user tries to change speed to out of mapn
      s.direction(1, 0); //change speed to right
    }
    else if (s.y === 0 && s.xspeed != 0){
    s.direction(s.xspeed, 0); //change nothing about the speed if moving horizontal on border and user tries to move out of the map
    }
    else{
      s.direction(0, -1); //user is breaking no rules, key acts normal
    }
  }

  else if (keyCode === DOWN_ARROW) {
    if(s.y === height-sizeScale && s.yspeed === 1){ //support for if snake is at edge and user tries to change speed to out of map
      s.direction(-1, 0); //change speed to left
    }
    else if (s.y === height-sizeScale && s.xspeed != 0){
    s.direction(s.xspeed, 0); //change nothing about the speed if moving horizontal on border and user tries to move out of the map
    }
    else{ //user is breaking no rules, key acts normal
      s.direction(0, 1);
    }
  }

  else if (keyCode === RIGHT_ARROW) {
    if(s.x === width-20 && s.xspeed === 1){ //support for if snake is at edge and user tries to change speed to out of map
      s.direction(0, 1); //change speed to down
    }
    else if (s.x === width-20 && s.yspeed != 0){
    s.direction(0, s.yspeed); //change nothing about the speed if moving horizontal on border and user tries to move out of the map
    }
    else{
      s.direction(1, 0); //user is breaking no rules, key acts normal
    }
  }

  else if (keyCode === LEFT_ARROW) {
    if(s.x === 0 && s.xspeed === -1){ //support for if snake is at edge and user tries to change speed to out of map
      s.direction(0, -1); //change speed to up
    }
    else if (s.x === 0 && s.yspeed != 0){
    s.direction(0, s.yspeed); //change nothing about the speed if moving horizontal on border and user tries to move out of the map
    }
    else{
      s.direction(-1,0);
    }
  }
}
