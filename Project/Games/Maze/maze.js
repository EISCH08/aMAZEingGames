var cols,rows;
var size1 = 40;
var grid = [];
var user; //0 is generating the maze, once done player = 1
//keeps player locked out from controls until maze is done generating
var current;
var stack = [];
var exit = 0; //will changed to 1 once an exit is made

function setup(){
   createCanvas(600,600);
   cols = floor(width/size1); //x cols exist
   rows = floor(height/size1);//x rows exist
   frameRate(40);
   user = new Player();

   for (var j = 0; j < rows; j++){
      for(var i = 0; i < cols; i++){
         var newcell = new Cell(i,j); //ie send col 2 row 5
         newcell.exitChance();
         grid.push(newcell);
      }
   }

   current = grid[0];
}

function draw(){
   background(51);
   if(user.players == 1){ ////switch from maze generation code to player code
      frameRate(10);
      user.show();
   }

   else{ //use this code if maze is generating
      current.visited = true; //current cell has been visited
      current.highlight(); //visually show which cell is current
      for (var i = 0; i < grid.length; i++){
         grid[i].show();
      }

      var nextCell = current.checkNeighbors(); //find next neighbor to visit

      //once the maze is complete, stop looping and let the player play
      //no new cells to pop, located at top left, new neighbor doesnt exist
      if(stack.length == 0 && current.x == 0 && current.y == 0 && !nextCell){
         user.players = 1;
      }

      if(nextCell){ //if there is a neighbor to go to
         removeWalls(current, nextCell); //get rid of lines to make maze path before show is called
         nextCell.visited = true;
         stack.push(current); //add current cell for future backtracking

         current = nextCell;
      }
      else if(stack.length > 0){ //no available neighbors, start popping off the stack to go back
         var previousCell = stack.pop();
         current = previousCell;
      }
   }
      function removeWalls(a, b){
      var x = a.x - b.x; //difference in x location of the current and next cell
      if(x == 1){
         a.walls[3] = false; //left wall removed from current
         b.walls[1] = false; //right wall removed from next
      }
      else if(x == -1)
      {
         a.walls[1] = false;
         b.walls[3] = false;
      }

      var y = a.y - b.y; //difference in y location of the current and next cell
      if(y == 1){
         a.walls[0] = false; //top wall removed from current
         b.walls[2] = false; //bottom wall removed from next
      }
      else if(y == -1)
      {
         a.walls[2] = false;
         b.walls[0] = false;
      }
   }
}

function keyPressed() {
   console.log(current);
  if (keyCode === UP_ARROW && user.players == 1) {
     if(current.walls[0]){
        current = current;
     }
      else{
         current = grid[index(current.x, current.y-1)];
      }
  }
  if (keyCode === DOWN_ARROW && user.players == 1) {
     if(current.walls[2]){
        current = current;
     }
      else {
         current = grid[index(current.x, current.y+1)];
      }
  }
  if (keyCode === RIGHT_ARROW && user.players == 1) {
     if(current.walls[1]){
        current = current;
     }
      else{
         current = grid[index(current.x+1, current.y)];
      }
  }
  if (keyCode === LEFT_ARROW && user.players == 1) {
     if(current.walls[3]){
        current = current;
     }
      else{
         current = grid[index(current.x-1, current.y)];
      }
  }
  if(current.exit){
     console.log('you win');
     current = grid[0];
 }
}
