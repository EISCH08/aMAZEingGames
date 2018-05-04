describe("Permissions of player", function(){
  beforeEach(function(){
      setup();
  });
  afterEach(function(){
      reset();
  });

  it("Player should not be able to play while maze is generating", function(){
      expect(user.players).toBe(0);
  });
});

describe("Containment", function(){
  beforeEach(function(){
      setup();
  });
  afterEach(function(){
      reset();
  });

  it("Player should not be able to leave top of map", function(){
      current.x = 0;
      current.y = 0;
      keyPressed(UP_ARROW);
      expect(current.y).toBe(0);
  });
  it("Player should not be able to leave right side of map", function(){
    current.x = floor(width/size1) - 1;
    current.y = 0;
    keyPressed(RIGHT_ARROW);
    expect(current.x).toBe(floor(width/size1)-1);
  });
  it("Player should not be able to leave bottom of map", function(){
    current.x = 0;
    current.y = floor(height/size1) - 1;
    keyPressed(DOWN_ARROW);
    expect(current.y).toBe(floor(height/size1)-1);
  });
  it("Player should not be able to leave left side of map", function(){
    current.x = 0;
    current.y = 0;
    keyPressed(LEFT_ARROW);
    expect(current.x).toBe(0);
  });
});
