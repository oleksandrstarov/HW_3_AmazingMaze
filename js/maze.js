"use strict";

class Maze{
    constructor(size){
        if(size === 'small'){
            this.dimension = 21;
        }
        if(size === 'medium'){
            this.dimension = 41;
        }
        if(size === 'large'){
            this.dimension = 61;
        }
        this.cellsArray = this.createCells();
        this.solution = [];

    }
    
    createCells(){
        var count = 0;
    
        var cellsArray = [];
        
        for(var i = 0; i < this.dimension; i++){
            cellsArray[i] = [];
            for(var j = 0; j < this.dimension; j++){
                
                var cell = new MazeCell(i, j);
                cellsArray[i][j] = cell;
                cell.count = count++;
            }
        }

        return cellsArray;

    }
    
    showMazeField(cellsArray){
        var container = document.querySelector('.mazeContainer');
        
        for(var cellX= 0; cellX<cellsArray.length; cellX++){
            for(var cellY = 0; cellY<cellsArray.length; cellY++){
                
                var element = document.createElement('div');
                element.setAttribute('class', 'cell');
                cellsArray[cellX][cellY].element = element;
                container.appendChild(element);
            }
        }

        cellsArray[1][1].element.classList.add('entryPoint');
        cellsArray[cellsArray.length - 2][cellsArray.length - 2].element.classList.add('entryPoint');
        
        updateContainer(container, element, cellsArray.length);
        
        function updateContainer(container, element, cellsInRow){
            var elementMargin = 0;
            container.style.width = (element.offsetWidth + elementMargin) * (cellsInRow) + 'px';
            container.style.height = container.style.width;
        }

    }
    
    
    initMaze(cellsArray){
        
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
        }, 50);
        
        
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
                        console.log("equal");
                        
                    }
                        
                    cellX = stepBack.x;
                    cellY = stepBack.y;

                    
                   
                   
                    if(solutionReady === false){
                        solutionArray.pop();
                        solutionArray.pop();
                    }
                    


                    
                }
            
                cellsArray[cellX][cellY].element.classList.add('focus');
                originalCellX = cellX;
                originalCellY = cellY;
                
            }
            else{
                clearInterval(timerId);
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

            cellsArray[cellX][cellY].element.classList.add('passage');
            
            if(solutionReady===false){
                solutionArray.push(cellsArray[cellX][cellY]);
                //cellsArray[cellX][cellY].element.classList.add('path');
            }
            
            curretMazeLength++;
        }

        this.solution = solutionArray;
    }
    
}

