
inRange = function(num, min, max)
{
    return num >= min && num <= max;
};

randomInt = function(min, max)
{
    return Math.floor(Math.random() * (max - min + 1)) + min;
};

randomColor = function()
{
	return color(randomInt(0, 255), randomInt(0, 255), randomInt(0, 255));
};


function setup()
{
   //createCanvas(windowWidth, windowHeight);
   var canvas = createCanvas(500, 500);
   canvas.parent("sketchHolder");
   
   document.getElementById("cellCount").value = cellCount;
   document.getElementById("genPerSec").value = genPerSec;
   generateGrid();
}

function updateValues()
{
   cellCount = Number(document.getElementById("cellCount").value);
   genPerSec = Number(document.getElementById("genPerSec").value);
   grid = [];
   generateGrid();
}

function neighborCount(grid, i)
{
   var count = 0;
   
   if(inRange(grid[i].x, (width - (cellSize*1.5)), width))//right side
   {
      (grid[i - 1]) ? count += grid[i - 1].alive : count += 0; // left
      (grid[i - cellCount - 1]) ? count += grid[i - cellCount - 1].alive : count += 0; // top left
      (grid[i - cellCount])     ? count += grid[i - cellCount].alive : count += 0; // top
      (grid[i + cellCount])     ? count += grid[i + cellCount].alive : count += 0; // bottom
      (grid[i + cellCount - 1]) ? count += grid[i + cellCount - 1].alive : count += 0; // bottom left
   }
   else if(inRange(grid[i].x, 0, (cellSize*1.5)))//left side
   {
      (grid[i + 1]) ? count += grid[i + 1].alive : count += 0; // right
      (grid[i - cellCount])     ? count += grid[i - cellCount].alive : count += 0; // top
      (grid[i - cellCount + 1]) ? count += grid[i - cellCount + 1].alive : count += 0; // top right
      (grid[i + cellCount + 1]) ? count += grid[i + cellCount + 1].alive : count += 0; // bottom right
      (grid[i + cellCount])     ? count += grid[i + cellCount].alive : count += 0; // bottom
   }
   else if(inRange(grid[i].y, 0, (cellSize*1.5)))//top row
   {
      (grid[i - 1]) ? count += grid[i - 1].alive : count += 0; // left
      (grid[i + 1]) ? count += grid[i + 1].alive : count += 0; // right
      (grid[i + cellCount + 1]) ? count += grid[i + cellCount + 1].alive : count += 0; // bottom right
      (grid[i + cellCount])     ? count += grid[i + cellCount].alive : count += 0; // bottom
      (grid[i + cellCount - 1]) ? count += grid[i + cellCount - 1].alive : count += 0; // bottom left
   }
   else if(inRange(grid[i].y, height - (cellSize*1.5), height))//bottom row
   {
      (grid[i - 1]) ? count += grid[i - 1].alive : count += 0; // left
      (grid[i + 1]) ? count += grid[i + 1].alive : count += 0; // right
      (grid[i - cellCount - 1]) ? count += grid[i - cellCount - 1].alive : count += 0; // top left
      (grid[i - cellCount])     ? count += grid[i - cellCount].alive : count += 0; // top
      (grid[i - cellCount + 1]) ? count += grid[i - cellCount + 1].alive : count += 0; // top right
   }
   else
   {
      (grid[i - 1]) ? count += grid[i - 1].alive : count += 0; // left
      (grid[i + 1]) ? count += grid[i + 1].alive : count += 0; // right
      (grid[i - cellCount - 1]) ? count += grid[i - cellCount - 1].alive : count += 0; // top left
      (grid[i - cellCount])     ? count += grid[i - cellCount].alive : count += 0; // top
      (grid[i - cellCount + 1]) ? count += grid[i - cellCount + 1].alive : count += 0; // top right
      (grid[i + cellCount + 1]) ? count += grid[i + cellCount + 1].alive : count += 0; // bottom right
      (grid[i + cellCount])     ? count += grid[i + cellCount].alive : count += 0; // bottom
      (grid[i + cellCount - 1]) ? count += grid[i + cellCount - 1].alive : count += 0; // bottom left
   }
   return count;
}

function mousePressed()
{
   //background(255);
   //grid = stepGrid(grid);
   
   for (var i = 0; i < grid.length; i++)
   {
      if(inRange(mouseX, grid[i].x, grid[i].x + grid[i].size) && inRange(mouseY, grid[i].y, grid[i].y + grid[i].size))
      {
         grid[i].alive = (!grid[i].alive);
      }
   }
}


var play = false;
function playPause()
{
   play = !play;
   document.getElementById("playPause").innerHTML = (play)? "Pause":"Play";
}

function keyPressed()
{
   if(keyCode == 32 || key == ' ')
   { //pressed the spacebar
      grid = stepGrid(grid);
   }
   else if(key == 'c' || key == 'C')
   {
      for(var i = 0; i < grid.length; i++)
      {
         grid[i].alive = false;
      }
   }
   else if(key == 'p' || key == 'P')
   {
      playPause();
   }
   else if(key == 'R' || key == 'R')
   {
      updateValues();
   }
   
}

var grid = [];
var cellCount = 50;
var cellSize;

function generateGrid()
{
   grid = [];
   cellSize = width/cellCount;
   
   for (var y = 0; y < height - 1; y++)
   {
      for (var x = 0; x < width - 1; x++)
      {
         if (x % cellSize === 0 && y % cellSize === 0)
         {
            grid.push(new Cell(x, y, cellSize, random([true, false, false, false, false])));
         }
      }
   }
}

var genPerSec = 10;

function draw()
{
   background(255);
   
   if(play && frameCount % (60/genPerSec) === 0)
   {
      grid = stepGrid(grid);
   }
   
   for(var i = 0; i < grid.length; i++)
   {
      grid[i].draw();
   }
   
   noFill();
   strokeWeight(1);
   rect(0, 0, width -1, height -1);
}


function stepGrid(oldGrid)
{
   //var newGrid = oldGrid.slice();
   var newGrid = [];
   var newX;
   var newY;
   var newSize;
   var alive;
   
   for(var i = 0; i < oldGrid.length; i++)
   {
      newX = oldGrid[i].x;
      newY = oldGrid[i].y;
      newSize = oldGrid[i].size;
      
      if(oldGrid[i].alive)
      {
         if(neighborCount(oldGrid,i) < 2)
         {
            alive = false;
         }
         else if(neighborCount(oldGrid,i) === 2 || neighborCount(oldGrid,i) === 3)
         {
            alive = true;
         }
         else if(neighborCount(oldGrid,i) > 3)
         {
            alive = false;
         }
      }
      else
      {
         alive = (neighborCount(oldGrid,i) === 3);
      }
      
      newGrid.splice(i, 0, new Cell(newX, newY, newSize, alive));
   }
   
   return newGrid;
}
