function Ship(){
  this.x = width/2;
  this.xdirection = 0;

  this.show = function(){
    fill(255);
    rectMode(CENTER);
    rect(this.x, height-20, 20, 60);
  }

  this.move = function(direction){
    this.x += direction*5;
  }

  this.setDirection = function(direction){
    this.xdirection = direction
  }
}
