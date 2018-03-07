function Snake() {
  this.x = 40;
  this.y = 40;
  this.xspeed = 1;
  this.yspeed = 0;
  this.total = 0;
  this.tail = [];

  this.eat = function(pos) {
    var d = dist(this.x, this.y, pos.x, pos.y);
    if (d < 1) {
      this.total++;
      return true;
    } else {
      return false;
    }
};

  this.direction = function(x, y) {
    this.xspeed = x;
    this.yspeed = y;
};

  this.death = function() {
    for (var i = 0; i < this.tail.length; i++) {
      var pos = this.tail[i];
      var d = dist(this.x, this.y, pos.x, pos.y);
      if (d < 1) {
        console.log('starting over');
        this.total = 0;
        this.tail = [];
      }
    }
};

   this.checkWall = function(){
      //implement automatic changing direction(speed) for when user hits wall
      if(this.x === width-scl && this.xspeed === 1)
      {
        this.direction(0,1); //force update speed first
         //force user to go up when hitting right wall
      }
      else if(this.x === 0 && this.xspeed === -1) //user hitting left wall
      {
        this.direction(0, -1);
      }
     else if(this.y === height-scl && this.yspeed === 1){ //user hitting bottom wall
        this.direction(-1, 0);
     }
     else if(this.y === 0 && this.yspeed === -1){ //user hitting top wall
        this.direction(1, 0);
     }
     else{ //no walls are being hit
        this.x = this.x + this.xspeed * scl;
        this.y = this.y + this.yspeed * scl;
     }

     this.x = constrain(this.x, 0, width - scl);
     this.y = constrain(this.y, 0, height - scl);

   };

  this.update = function() {
    this.checkWall();

    for (var i = 0; i < this.tail.length - 1; i++) {
      this.tail[i] = this.tail[i + 1];
    }
    if (this.total >= 1) {
      this.tail[this.total - 1] = createVector(this.x, this.y);
    }

};

  this.show = function() {
    fill(255);
    for (var i = 0; i < this.tail.length; i++) {
      rect(this.tail[i].x, this.tail[i].y, scl, scl);
    }
    rect(this.x, this.y, scl, scl);

   };
}
