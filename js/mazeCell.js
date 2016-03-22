"use strict";

function MazeCell(x, y){
    this.x = x;
    this.y = y;

    this.visited = false;
    this.element = null;
    
    this.wall = true;
    
    
}