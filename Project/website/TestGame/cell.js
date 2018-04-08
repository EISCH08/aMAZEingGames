function Cell(i, j){ //i is the column, j is the row
   this.x = i;
   this.y = j;
   this.walls = [true, true, true, true]; //array of walls(true is has wall) top right bottom left

   this.show = function() {
      var x = this.x*size1; //ie col 2 will net an x position of 2 times the size of each square (putting it in the second square on the grid)
      var y = this.y*size1; //same here
      stroke(200);

      if(this.walls[0]){
         line(x,y, x+size1, y);//top
      }
      if(this.walls[1]){
         line(x+size1,y,x+size1, y+size1);//right
      }
      if(this.walls[2]){
         line(x+size1,y+size1, x, y+size1);//bottom
      }
      if(this.walls[3]){
         line(x,y+size1, x, y);//left
      }

      //noFill();
      //rect(x,y,size1,size1);
   };
}
