var cols,rows;
var size1 = 40;
var grid = [];

var current;

var stack = [];

function setup(){
   createCanvas(400,400);
   cols = floor(width/size1); //x cols exist
   rows = floor(height/size1);//x rows exist
   frameRate(5);

   for (var j = 0; j < rows; j++){
      for(var i = 0; i < cols; i++){
         var newcell = new Cell(i,j); //ie send col 2 row 5
         grid.push(newcell);
      }
   }

   current = grid[0];
}

function draw(){
   background(51);

   current.visited = true; //current cell has been visited
   current.highlight(); //visually show which cell is current
   for (var i = 0; i < grid.length; i++){
      grid[i].show();
   }

   var nextCell = current.checkNeighbors();

   if(nextCell){ //if there is a neighbor to go to at all
      removeWalls(current, nextCell); //get rid of lines to make maze path before
                                      //show is called
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










//.
