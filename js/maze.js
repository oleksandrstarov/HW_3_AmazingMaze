"use strict";

function Maze(dimension){
    this.dimension = dimension;
    
    this.cellsArray = [];
    var count = 0;
    
    
    this.createCells = function(){
        var cellsArray = [];
        for(var i = 0; i<this.dimension+2; i++){
            cellsArray.push([]);
        }
        
        
        for(var i = 0; i < this.dimension+2; i++){
            for(var j = 0; j < this.dimension+2; j++){
                var cell = new MazeCell(i, j);
                cellsArray[i].push(cell);
               cell.count = count++;
                
               //set all border cells as visited
                if(i === 0 
                || i === this.dimension + 1
                || j === 0
                || j === this.dimension + 1){
                    cell.visited = true;
                }
            }
        }
        console.log(cellsArray);
        return this.initMaze(cellsArray);
    }
    
    
    this.initMaze = function(cellsArray){
        if(cellsArray.length === 0){
            return;
        }
        
        function generateMaze(x, y){
        
            cellsArray[x][y].visited = true;
            
            while(!cellsArray[x][y+1].visited || !cellsArray[x+1][y].visited
            || !cellsArray[x][y-1].visited || !cellsArray[x-1][y].visited){
                
                while(true){
                    var random = getRandom(4);
                    if(random === 0 && !cellsArray[x][y+1].visited){
                        cellsArray[x][y].north = false;
                        cellsArray[x][y+1].south = false;
                        generateMaze(x, y+1);
                        break;
                    }
                    
                    if(random === 1 && !cellsArray[x+1][y].visited){
                        cellsArray[x][y].east = false;
                        cellsArray[x+1][y].west = false;
                        generateMaze(x+1, y);
                        break;
                    }
                    
                     
                    if(random === 2 && !cellsArray[x][y-1].visited){
                        cellsArray[x][y].south = false;
                        cellsArray[x][y-1].north = false;
                        generateMaze(x, y-1);
                        break;
                    }
                    
                    if(random === 3 && !cellsArray[x-1][y].visited){
                        cellsArray[x][y].west = false;
                        cellsArray[x-1][y].east = false;
                        generateMaze(x-1, y);
                        break;
                    }
                }
            }
            

        }
        
        generateMaze(1,1);
        return cellsArray
    }
    
    
    
}

