describe('Wall interaction', function() {
  var snake;

  beforeEach(function(){
    snake = new Snake();
    setup();

  });
  afterEach(function(){
    snake = null;
  });

  it('Should move upwards when hitting left wall', function(){
    snake.x = 0;
    snake.xspeed = -1;
    snake.checkWall();
    expect(snake.yspeed).toBe(-1);
    expect(snake.xspeed).toBe(0);
  });

  it('Should move downwards when hitting right wall', function(){
    snake.x = width-sizeScale;
    snake.xspeed = 1;
    snake.checkWall();
    expect(snake.yspeed).toBe(1);
    expect(snake.xspeed).toBe(0);
  });

  it('Should move to the right when hitting top wall', function(){
    snake.y = 0;
    snake.yspeed = -1;
    snake.checkWall();
    expect(snake.yspeed).toBe(0);
    expect(snake.xspeed).toBe(1);
  });

  it('Should move to the left when hitting bottom wall', function(){
    snake.y = height-sizeScale;
    snake.yspeed = 1;
    snake.checkWall();
    expect(snake.yspeed).toBe(0);
    expect(snake.xspeed).toBe(-1);
  });
});

describe('Food', function(){

  beforeEach(function(){
    setup();
  });
  afterEach(function(){
      s = null;
  });

  it('Food should not be null', function(){
    expect(food).not.toEqual(null);
  });
});
