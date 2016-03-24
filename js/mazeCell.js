"use strict";

function MazeCell(x,y){

    this.x = x;
    this.y = y;
    this.element = null;
    this.wall = true;

}

MazeCell.prototype.setElement = function(element){
    this.element = element;
}

MazeCell.prototype.getElement = function(){
    return this.element;
}