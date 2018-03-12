var cols,rows;
var size1 = 40;
var grid = [];

var current;

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

   current.visited = true;
   for (var i = 0; i < grid.length; i++){
      grid[i].show();
   }


   var nextCell = current.checkNeighbors();
   if(nextCell){
      nextCell.visited = true;
      current = nextCell;
   }

}
