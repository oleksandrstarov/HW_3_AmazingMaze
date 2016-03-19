"use strict";


var maze = new Maze(10);

var array = maze.cellsArray;

console.log(array);
array = maze.createCells();
console.log(array);


var container = document.querySelector('.mazeContainer');

generatePlayField(array, container);
function generatePlayField(array, container){
   
    
    for(var cellY = 0; cellY<array.length; cellY++){
       
        for(var cellX = 0; cellX<array.length; cellX++){
            
            var element = document.createElement('div');
            element.setAttribute('class', 'cell');
            array[cellY][cellX].element = element;
            setBorders(array[cellY][cellX], element);
            element.innerHTML = cellY + '' + cellX;
            container.appendChild(element);

        }
    }
    updateContainer(container, element, maze.dimension);
}

function updateContainer(container, element, cellsInRow){
    var elementMargin = 0;
    container.style.width = (element.offsetWidth + elementMargin) * (cellsInRow+2) + 'px';
    container.style.height = container.style.width;
}

function setBorders(cell, element){
    if(cell.north){
        element.classList.add('borderNorth');
    }
    
    if(cell.east){
        element.classList.add('borderEast');
    }
    
    if(cell.south){
        element.classList.add('borderSouth');
    }
    
    if(cell.west){
        element.classList.add('borderWest');
    }
}