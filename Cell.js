function Cell(x, y, size, alive)
{
   this.x = x;
   this.y = y;
   this.size = size;
   this.color = color((y/2), (x/2), 0);
   
   this.alive = alive;
   
   this.draw = function()
   {
      if(this.alive)
      {
         strokeWeight(1);
         fill(this.color);
         rect(x, y, this.size, this.size);
      }
   }
}