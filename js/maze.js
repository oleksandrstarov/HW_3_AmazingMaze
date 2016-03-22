"use strict";

function Maze(dimension){
    this.dimension = dimension;
    
    this.cellsArray = [];
    this.solution = [];
}

Maze.prototype = {
    createCells: function(){
        var count = 0;
    
        var cellsArray = [];
        
        for(var i = 0; i < this.dimension; i++){
            cellsArray[i] = [];
            for(var j = 0; j < this.dimension; j++){
                
                var cell = new MazeCell(j, i);
                cellsArray[i][j] = cell;
                cell.count = count++;
                
            }
        }
        //console.log(cellsArray);
        return this.initMaze(cellsArray);
    },
    
    initMaze: function(cellsArray){
        var path = [];
        var solution = [];
        
        if(cellsArray.length === 0){
            return;
        }
        
        var x = 1, y = 1;
        var lastSetX = -1, lastSetY = -1;
        cellsArray[x][y].wall = false;
        
        path.push(y + y * cellsArray.length);
        var solutionUncomplete = true;
        
        function generateMaze(x, y){
            
            //console.log(x + " " + y); 
            if(path.length){
                var availableDirections = getDirections(x, y, cellsArray);
                
                if(availableDirections){
                    var step = getRandom(availableDirections.length);
                    
                    switch(availableDirections[step]){
                        case "N":
                            removeWall(x-2, y, cellsArray);
                            removeWall(x-1, y, cellsArray);
                            x -= 2;
                            break;
                        
                        case "S":
                            removeWall(x+2, y, cellsArray);
                            removeWall(x+1, y, cellsArray);
                            x += 2;
                            break;
                        
                        case "W":
                            removeWall(x, y-2, cellsArray);
                            removeWall(x, y-1, cellsArray);
                            y -= 2;
                            break;
                        
                        case "E":
                            removeWall(x, y+2, cellsArray);
                            removeWall(x, y+1, cellsArray);
                            y += 2;
                            break;
                    }
                    
                    path.push(y + x * cellsArray.length);
                    //solution.push(cellsArray[x][y]);
                    lastSetX = x;
                    lastSetY = y;
                    if(x === cellsArray.length-2 && y === cellsArray.length-2){
                        //console.info(solutionUncomplete);
                        solutionUncomplete = false;
                        //console.info(solutionUncomplete);
                    }
                    //console.log(solution);
                    
                }else{
                    var stepBack = path.pop();
                    
                    
                    x = Math.floor(stepBack / cellsArray.length);
                    y = stepBack % cellsArray.length;
                   
                    //console.log(solutionUncomplete);
                    if(solutionUncomplete){
                        if(solution.indexOf(cellsArray[x][y]) >= 0 ){
                            //console.log(solution.pop());
                            //console.log(solution.pop());
                            solution.pop();
                            solution.pop();
                            
    
    
    
                        }
                    }
                    
                }
            generateMaze(x, y);
                
            }
        }
        
        generateMaze(x, y);
        this.solution = solution;
        return cellsArray
        
        function getDirections(x, y, cellsArray){
            var availableDirections = "";
            
            if(x+2 > 0 
                && x+2 < cellsArray.length - 1
                && cellsArray[x+2][y].wall === true){
                availableDirections += "S";
            }
            
            if(x-2 > 0 
                && x-2 < cellsArray.length - 1 
                && cellsArray[x-2][y].wall === true){
                availableDirections += "N";
            }
            
            if(y-2 > 0 
                && y-2 < cellsArray.length - 1 
                && cellsArray[x][y-2].wall === true){
                availableDirections += "W";
            }
            
            if(y+2 > 0 
                && y+2 < cellsArray.length - 1
                && cellsArray[x][y+2].wall === true){
                availableDirections += "E";
            }
            
            return availableDirections;
        }
        
        function removeWall(x, y, cellsArray){
            cellsArray[x][y].wall = false;
            if(solutionUncomplete){
                solution.push(cellsArray[x][y]);
            }
        }
        
    }
    

    
    
};
