var s;
var sizeScale = 50;
var speedScale = sizeScale;

var apple; //food image to load
var food;
var scoreCounter; //visual counter on screen
var score; //keeps track of the score
var player; //0 if player is dead 1 if alive
var startScreen;
var deathScreen;
var bg; //background image to load
var ready; //bug fix to stop shift from causing game to not start with press enter screen showing

var exportBox; //textbox to transfer to SQL
var exportButton;

function setup() {
  createCanvas(800, 800);
  player = 0;
  ready = true;

  bg = loadImage('https://image.ibb.co/hDDeeH/topsoil_grande.jpg');
  apple = loadImage('https://image.ibb.co/eeMhzH/Shiny_Red_Apple_48x48.png');
  //fetching input element from html and setting up style
  exportBox = select('#output')
  //exportBox.style('position', 'absolute');
  //exportBox.style('top', '300px');
  //exportBox.style('left', '300px');
  exportBox.style('z-index', '-1'); //hiding input box
  exportBox.position(550, 400);
  //fetching submit button from html
  exportButton = select('#submit');
  //exportButton.style('position', 'absolute');
  //exportButton.style('top', '140%');
  //exportButton.style('left', '80%');
  exportButton.style('z-index', '-1'); //hiding button
  exportButton.position(550, 400);

  scoreCounter = createElement('h1', 'Snake Length: ' + 1);
  scoreCounter.style('font-size', '40pt');
  //scoreCounter.position(100, '90%');
  scoreCounter.style('position', 'absolute');
  scoreCounter.style('top', '150px');
  scoreCounter.style('left', '1400px');

  reset();
}

function reset(){
  score = 1;

  startScreen = createElement('h1', 'Use the arrow keys to<br> control your snake!<br><br>Press the SHIFT key to start!'); //
  startScreen.position(625, 150);
  startScreen.style('font-size', '40pt');
  startScreen.style('background-color', 'black');
  startScreen.style('color', '#2874A6');

  bg = loadImage('https://image.ibb.co/hDDeeH/topsoil_grande.jpg');
  apple = loadImage('https://image.ibb.co/eeMhzH/Shiny_Red_Apple_48x48.png');
  s = new Snake();
  frameRate(15);
  spawnFood();
  loop();
}

function spawnFood() {
  var cols = floor(width/sizeScale);
  var rows = floor(height/sizeScale);
  food = createVector(floor(random(cols)), floor(random(rows)));
  food.mult(sizeScale);
  spr = createSprite(food.x + 10, food.y, 40, 40); //spawn the sprite
  spr.addImage(apple);
}

function draw() {
  background(bg);

  if (s.eat(food)) {
    spr.remove()
    score++;
    spawnFood();
  }

  scoreCounter.html('Snake Length: ' + score);

  if(s.death()){
    player = 0;
    deathScreen = createElement('h1', 'You Lose! Your score is ' + score +'!<br> Submit your score below or<br>Press Enter to play again.');
    deathScreen.style('background-color', 'black');
    deathScreen.style('color', '#2874A6');
    deathScreen.position(625, 150);
    deathScreen.style('font-size', '40pt');
    exportBox.value(score);
    exportButton.style('z-index', '0'); //hiding button
    spr.remove();
    noLoop();
  };

  s.update();
  s.show();

  drawSprites();
  //fill(255, 0, 100);
  //rect(food.x, food.y, sizeScale, sizeScale);
}


function keyPressed() {

  if(keyCode === ENTER){
    deathScreen.remove();
    ready = true;
    reset();
  }

  if(keyCode === SHIFT && player === 0 && ready){
    startScreen.remove();
    ready = false;
    player = 1;
  }

  if (keyCode === UP_ARROW && player === 1) {
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

  else if (keyCode === DOWN_ARROW && player ===1 ) {
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

  else if (keyCode === RIGHT_ARROW && player===1) {
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

  else if (keyCode === LEFT_ARROW && player===1) {
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
