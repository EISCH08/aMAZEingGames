var ship;
var spr; //sprite over the ship
var spaceShipImg;
var flowers = [];
var drops = [];
var rows; //rows of enemies
var perRow; //enemies per row

var frames = 50; //framerate of game
var framecount;
var cooldown; //player shot, they are on cooldown (true)

var countdown; //the player cannot move until this times out
var countdownScreen;
var framecount2;

var startScreen;

var gameover; //win or lose, keeps track of gamestate
var lost;
var victoryScreen; //pops up once all enemies are destroyed

var difficulty; //1 = easy, 2 = Medium, 3 = Hard
var player;


function setup(){
  createCanvas(600,600);
  spaceShipImg = loadImage('https://image.ibb.co/fTfhDc/Spaceship.png');


  victoryScreen = createElement('h1', 'You Win! <br><br> Press 1 for Easy <br> Press 2 for Medium <br> Press 3 for Hard');
  victoryScreen.position(260, 80);
  victoryScreen.style('z-index', '-1');

  deathScreen = createElement('h1', 'You Lost! <br><br> Press 1 for Easy <br> Press 2 for Medium <br> Press 3 for Hard');
  deathScreen.position(260, 120);
  deathScreen.style('z-index', '-1');

  countdownScreen = createElement('h1', '5');
  countdownScreen.position(500, 250);
  countdownScreen.style('z-index', '-1');
  countdownScreen.style('color', 'white');

  startScreen = createElement('h1', 'Use the left and right arrow<br> keys to move <br><br> Press the space bar to shoot<br> at most 1 shot per second <br> <br> Press Enter to start!')
  startScreen.position(260, 150);
  startScreen.style('color', 'red');
  startScreen.style('background-color', 'black');

  //easy difficulty is default
  difficulty = 1;
  player = 0;

  frameRate(frames);
}

function reset(){
  lost = false;
  gameover = false;
  cooldown = false; //not on cooldown at start
  framecount = 0;
  framecount2 = 0;

  spr = createSprite(width/2, height-40, 20, 40);
  spr.addImage(spaceShipImg);

  countdown = 3;
  countdownScreen.html('3');
  countdownScreen.style('z-index', '0');

  ship = new Ship();

  //get rid of victory message
  victoryScreen.style('z-index', '-1');
  //get rid of death message
  deathScreen.style('z-index', '-1');
  //drop = new Drop(width/2, 80);

  if(difficulty == 1){
    perRow = 3;
    rows = 3;
  }
  if(difficulty == 2){
    perRow = 5;
    rows = 3;
  }
  if(difficulty == 3){
    perRow = 5;
    rows = 4;
  }

  for(var i = 0; i < perRow; i++){
    flowers[i] = new Flower(i*60 + 100, 60);
  }


  loop();
}

function draw(){
  if(lost){ //stop the game if lost
    noLoop();
  }
  background(51);


  if(cooldown){
    framecount += 1; //add one for each frame that passes
    framecount = framecount%(frames); //won't be 0 until framecount hits frames
    if(framecount == 0){ //after a second (x frames) cooldown is off
      cooldown = false;
    }
  }

  if(countdown > 0){
    framecount2 += 1;
    framecount2 = framecount2%(frames);
    if(framecount2 == 0){
      countdown -= 1;
      countdownScreen.html(countdown);
    }
  }
  else if(countdown == 0){
    countdownScreen.style('z-index', -1);
  }

  spr.velocity.x = ship.xdirection*5;
  drawSprites();
  //ship.show();
  ship.move(ship.xdirection);

  for(var i = 0; i < drops.length; i++){ //show the drops then move the drops
    drops[i].show();
    drops[i].move();
    for(var j = 0; j < flowers.length; j++){
      if(drops[i].collision(flowers[j])) //if collision then destroy both enemy and rocket
      {
        flowers[j].destroy();
        drops[i].evaporate();
      }
    }
  }

  var edge = false; //turns true if an enemy hits either edge of the screen
  for(var i = 0; i < flowers.length; i++){
    flowers[i].show();
    flowers[i].move();

    if (flowers[i].x + flowers[i].r > width || flowers[i].x-flowers[i].r < 0){
      edge = true; //an enemy hit an edge
    }
  }

  if(edge){ //if an enemy hit the edge then shift them down and switch direction
    for(var i = 0; i < flowers.length; i++){
      flowers[i].shiftDown();
    }
    if(rows > 0){
      rows -= 1; //one less row left to spawn after below code spawns new row
    }

    if(rows > 0){ //spawn another row of enemies
      for(var i = 0; i < perRow; i++){
        var newFlower = new Flower(i*60 + 20, 60)
        flowers.push(newFlower);
      }
    }
}

  for(var i = drops.length-1; i >= 0; i--){ //remove rockets from array that hit enemies
    if(drops[i].evaporated){
      drops.splice(i, 1);
    }
  }

  for(var i = flowers.length-1; i >= 0; i--){ //remove enemies from array that got hit
    if(flowers[i].destroyed){
      flowers.splice(i, 1);
    }
  }

  if(ship.x == width-10 || ship.x == 10){ //set ship speed to 0 whenat either edge
    ship.setDirection(0);
  }

  for(var i = 0; i < flowers.length && lost == false; i++){ //check if enemies made it to end
    if(flowers[i].y == 375){
      lost = true;
    }
  }

  if(lost && rows == 0){
    flowers.splice(0, flowers.length);
    //show deathscreen
    deathScreen.style('z-index', '0');

    gameover = true;
    noLoop();
  }

  if(flowers.length == 0 && !lost && rows == 0) //if no more enemies, display victory screen
  {
    //show victoryscreen
    victoryScreen.style('z-index', '0');

    gameover = true;
    noLoop();
  }
}

function keyReleased(){
  if(key != ' '){
    ship.setDirection(0);
  }
}

function keyPressed(){
  if(keyCode === ENTER && player == 0){
    player = 1;
    startScreen.remove();
    reset();
  }

  //key input when the player wins
  if((keyCode === 49 || keyCode === 50 || keyCode == 51) && !lost && gameover){
     if(keyCode === 49){
       difficulty = 1;
     }
     if(keyCode === 50){
       difficulty = 2;
     }
     if(keyCode === 51){
       difficulty = 3;
     }
     spr.remove();
     reset();
  }

  //key input when the player loses
  if((keyCode === 49 || keyCode === 50 || keyCode == 51) && (lost && gameover)){
    if(keyCode === 49){
      difficulty = 1;
    }
    if(keyCode === 50){
      difficulty = 2;
    }
    if(keyCode === 51){
      difficulty = 3;
    }
    spr.remove();
    reset();
  }

  if(key === ' ' && !cooldown && countdown == 0){
    cooldown = true;
    var drop = new Drop(ship.x, height);
    drops.push(drop);
  }
  if(keyCode === RIGHT_ARROW && countdown == 0){
    if(ship.x != width-10){ //dont let user set speed to 1 if at right edge
      ship.setDirection(1);
    }
  }
  else if(keyCode === LEFT_ARROW && countdown == 0){
    if(ship.x != 10){ //dont let user set speed to -1 if at left edge
      ship.setDirection(-1);
    }
  }
}
