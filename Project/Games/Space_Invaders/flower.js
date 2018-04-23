function Flower(x,y){
  this.x = x;
  this.y = y;
  this.r = 30;

  this.xdirection = 1;

  this.show = function(){
    fill(255, 0, 200);

    ellipse(this.x, this.y, this.r*2, this.r*2);
  }

  this.move = function(){
    this.x = this.x + this.xdirection;
  }

  this.shiftDown = function(){
    this.xdirection *= -1;
    this.y += this.r;
  }

  this.grow = function(){
    this.r = this.r + 2;
  }
}
