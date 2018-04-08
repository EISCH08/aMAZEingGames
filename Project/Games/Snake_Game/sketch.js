var s;
var sizeScale = 25;
var speedScale = sizeScale;

var food;
var scoreCounter; //visual counter on screen
var score; //keeps track of the score

var startScreen;
var deathScreen;

function setup() {
  createCanvas(600, 600);

  score = 1;
  scoreCounter = createElement('h1', 'Snake Length: ' + 1);
  scoreCounter.position(600, 0);

  startScreen = createElement('h1', 'Press UP arrow key to start!');
  startScreen.position(100, 200);

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
     score++;
    scoreCounter.html('Snake Length: ' + score);
    spawnFood();
  }
  s.death();
  s.update();
  s.show();


  fill(255, 0, 100);
  rect(food.x, food.y, sizeScale, sizeScale);
}


function keyPressed() {
   if(startScreen){
      if(keyCode === UP_ARROW){
         startScreen.remove();
         loop();
      }
   }
   if(deathScreen){
      if(keyCode === ENTER){
         deathScreen.remove();
         startScreen = createElement('h1', 'Press UP arrow key to start!');
         startScreen.position(100, 200);
         score = 1;
      }
   }
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
