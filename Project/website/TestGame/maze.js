var cols,rows;
var size1 = 40;
var grid = [];

function setup(){
   createCanvas(400,400);
   cols = floor(width/size1); //x cols exist
   rows = floor(height/size1);//x rows exist

   for (var j = 0; j < rows; j++){
      for(var i = 0; i < cols; i++){
         var newcell = new Cell(i,j); //ie send col 2 row 5
         grid.push(newcell);
      }
   }
}

function draw(){
   background(51);
   for (var i = 0; i < grid.length; i++){
      grid[i].show();
   }
}
