"use strict";


var maze = new Maze('small');
var array = maze.cellsArray;
maze.showMazeField(array);
maze.initMaze(array);

//console.log(array);
//array = maze.createCells();
//maze.findSolution(array);
//console.log(array);


//var container = document.querySelector('.mazeContainer');

//generatePlayField(array, container);
function generatePlayField(array, container){
   
    
    for(var cellX= 0; cellX<array.length; cellX++){
       
        for(var cellY = 0; cellY<array.length; cellY++){
            
            var element = document.createElement('div');
            element.setAttribute('class', 'cell');
            array[cellX][cellY].element = element;
            
            drawWalls(array[cellX][cellY], element);
            
            
            if(maze.solution.indexOf(array[cellX][cellY]) >= 0){
                drawPath(array[cellX][cellY], element);
            }
            container.appendChild(element);
        }
    }
    
    
    
    drawEntryPoint(array[1][1]);
    drawEntryPoint(array[array.length - 2][array.length - 2]);
    
    updateContainer(container, element, maze.dimension);
}

function updateContainer(container, element, cellsInRow){
    var elementMargin = 0;
    container.style.width = (element.offsetWidth + elementMargin) * (cellsInRow) + 'px';
    container.style.height = container.style.width;
}

function drawWalls(cell, element){
    if(!cell.wall){
        element.classList.add('passage');
    }
    
}

function drawEntryPoint(cell){
    cell.element.classList.add('entryPoint');
}

function drawPath(cell, element){
    cell.element.classList.add('path');
    //element.classList.add('path');
    
   
}