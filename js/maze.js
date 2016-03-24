"use strict";

function Maze(size){
    
    if(size === 'small'){
        this.dimension = 15;
        this.generationSpeed = 100;
    }
    if(size === 'medium'){
        this.dimension = 25;
        this.generationSpeed = 60;
    }
    if(size === 'large'){
        this.dimension = 45;
        this.generationSpeed = 40;
    }
    this.cellsArray = this.createCells();
    this.solution = [];

}
    
Maze.prototype.createCells = function(){
    var count = 0;

    var cellsArray = [];
    
    for(var i = 0; i < this.dimension; i++){
        cellsArray[i] = [];
        for(var j = 0; j < this.dimension; j++){
            
            var cell = new MazeCell(i, j);
            cellsArray[i][j] = cell;
        }
    }

    return cellsArray;

}
    
Maze.prototype.showMazeField = function(cellsArray){
    var container = document.querySelector('.mazeContainer');

    for(var cellX= 0; cellX<cellsArray.length; cellX++){
        for(var cellY = 0; cellY<cellsArray.length; cellY++){
            
            var element = document.createElement('div');
            element.setAttribute('class', 'cell');
            cellsArray[cellX][cellY].setElement(element);
            container.appendChild(element);
        }
    }
    cellsArray[1][1].getElement().classList.add('entryPoint');
    cellsArray[cellsArray.length - 2][cellsArray.length - 2].getElement().classList.add('entryPoint');
    
    var elementMargin = 0;
    container.style.width = (element.offsetWidth + elementMargin) * (cellsArray.length) + 'px';
    container.style.height = container.style.width;
}
 
    
Maze.prototype.initMaze = function(cellsArray){
    
    if(cellsArray.length === 0){
        return;
    }
    
    var totalMazeLength = (cellsArray.length * cellsArray.length - cellsArray.length * 2 - 1)/2;
    var path = [];
    var curretMazeLength = 0;
    var solutionArray = [];
    var solutionReady = false;
    var originalCellX = 1, originalCellY = 1;


    removeWall(originalCellX, originalCellY, cellsArray);

    path.push({
        x:originalCellX, 
        y:originalCellY
    });
    
    var timerId = setInterval(function(){
        
        generateMaze(originalCellX, originalCellY);
    }, this.generationSpeed);
    
    
    function generateMaze(cellX, cellY){
        cellsArray[originalCellX][originalCellY].element.classList.remove('focus');

        if(totalMazeLength > curretMazeLength){
            var availableDirections = getDirections(cellX, cellY, cellsArray);
            
            if(availableDirections){
                
                var step = getRandom(availableDirections.length);
                
                switch(availableDirections[step]){
                    case "N":
                        removeWall(cellX-1, cellY, cellsArray);
                        removeWall(cellX-2, cellY, cellsArray);
                        
                        cellX -= 2;
                        break;
                    
                    case "S":
                        removeWall(cellX+1, cellY, cellsArray);
                        removeWall(cellX+2, cellY, cellsArray);
                        
                        cellX += 2;
                        break;
                    
                    case "W":
                        removeWall(cellX, cellY-1, cellsArray);
                        removeWall(cellX, cellY-2, cellsArray);
                        
                        cellY -= 2;
                        break;
                    
                    case "E":
                        removeWall(cellX, cellY+1, cellsArray);
                        removeWall(cellX, cellY+2, cellsArray);
                        
                        cellY += 2;
                        break;
                }

                path.push({
                    x:cellX,
                    y:cellY
                });

                if(cellX===cellsArray.length-2 && cellY===cellsArray.length-2){
                    solutionReady = true;
                }
            }else{

                var stepBack = path.pop();
                if (stepBack.x === cellX && stepBack.y === cellY) {
                    stepBack = path[path.length - 1];
                }
                    
                cellX = stepBack.x;
                cellY = stepBack.y;
               
               
                if(solutionReady === false){
                    solutionArray.pop();
                    solutionArray.pop();
                }
                
            }
            cellsArray[cellX][cellY].getElement().classList.add('focus');
            originalCellX = cellX;
            originalCellY = cellY;
            
        }
        else{
            clearInterval(timerId);
            showElement('gameMenu');
        }
    }

    
    function getDirections(cellX, cellY, cellsArray){
        var availableDirections = "";
        
        if( cellX+2 < cellsArray.length - 1
            && cellsArray[cellX+2][cellY].wall === true){
            availableDirections += "S";
        }
        
        if(cellX-2 > 0
            && cellsArray[cellX-2][cellY].wall === true){
            availableDirections += "N";
        }
        
        if(cellY-2 > 0 
            && cellsArray[cellX][cellY-2].wall === true){
            availableDirections += "W";
        }
        
        if( cellY+2 < cellsArray.length - 1
            && cellsArray[cellX][cellY+2].wall === true){
            availableDirections += "E";
        }
        
        return availableDirections;
    }
    
    function removeWall(cellX, cellY, cellsArray){
        
        cellsArray[cellX][cellY].wall = false;

        cellsArray[cellX][cellY].getElement().classList.add('passage');
        
        if(solutionReady===false){
            solutionArray.push(cellsArray[cellX][cellY]);
        }
        
        curretMazeLength++;
    }

    this.solution = solutionArray;
}
    
Maze.prototype.showSolution = function(solutionArray){
    if(solutionArray.length === 0){
        return;
    }
    
    var i = 0;
    
    var timerId = setInterval(function(){
        makeSolutionStep(i);
    }, this.generationSpeed * 1.2);
    

    function makeSolutionStep(index){
    
        if(index < solutionArray.length){
            solutionArray[index].getElement().classList.add('path');

            i++;
        }else{
            clearInterval(timerId);

            showElement('gameMenu');
            hideElement('showPath');
        }

    }
    
}

