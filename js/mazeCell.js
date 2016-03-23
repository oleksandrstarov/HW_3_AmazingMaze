"use strict";

class MazeCell{
    constructor(x,y){
        this.x = x;
        this.y = y;
        this.element = null;
        this.wall = true;
    }
    
    setElement(element){
        this.element = element
    }
    
    getElement(){
        return this.element;
    }

}