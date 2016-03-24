"use strict";

var maze;

function startGeneration(size){
    
    hideElement('mainMenu');
    
    maze = new Maze(size);
    var array = maze.cellsArray;
    maze.showMazeField(array);
    maze.initMaze(array);
}

function showPath(){
    maze.showSolution(maze.solution);
   
    hideElement('gameMenu');
}

function reset(){
    maze = null;
    resetContainer();
    hideElement('gameMenu');
    showElement('showPath');
    showElement('mainMenu');
}
