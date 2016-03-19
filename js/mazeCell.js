"use strict";

function MazeCell(x, y){
    this.x = x;
    this.y = y;
    
    this.north = true;
    this.east = true;
    this.south = true;
    this.west = true;
    
    this.visited = false;
    this.element = null;
    this.count = 0;
    
    
}