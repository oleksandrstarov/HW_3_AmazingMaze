//console.log('test');
//var assert = require("chai").assert;

describe('Randimizer util', function(){
    it('Check that generated number in given range from 0 >= x < max', function(){

        assert.isBelow(getRandom(6), 6);
        assert.isBelow(getRandom(2), 2);
        assert.isBelow(getRandom(1), 1);
        assert.isAtLeast(getRandom(6), 0);
        assert.isAtLeast(getRandom(1), 0);
        assert.isAtLeast(getRandom(12), 0);

    });
    
    
});

describe('Maze cell', function(){
    var mazeCell;
    
    before(function(){
        mazeCell = new MazeCell(1,2);
    });
    
    
    it('Check that Maze cell has default values', function(){

        assert.equal(mazeCell.x, 1);
        assert.equal(mazeCell.y, 2);
        assert.isNull(mazeCell.element);
        assert.isOk(mazeCell.wall);
        assert.isOk(mazeCell.__proto__.hasOwnProperty('getElement'));
        assert.isOk(mazeCell.__proto__.hasOwnProperty('setElement'));
    });
    
});

describe('View manipulations', function() {
    var element = document.createElement('div');
    element.id = 'id';
    document.body.appendChild(element);
    
    
    
    
    it('this correctly show and hide elements', function(){
        hideElement('id');
        assert.isTrue(document.querySelector('.hidden').toString().length > 0);
        showElement('id');
        assert.isNull(document.querySelector('.hidden'));
         
    });
    
    
    var element = document.createElement('div');
    element.classList.add('mazeContainer');
    document.body.appendChild(element);
    
    var cell = document.createElement('div');
    element.appendChild(cell);
   
    it('this correctly resets mazeContainer', function(){
        resetContainer();
        assert.equal(element.hasChildNodes(), false);
         
    });
   
    
});

describe('Maze', function(){
    var maze;
    var element = document.querySelector('.mazeContainer');
    
    before(function(){
        maze = new Maze('small');
        
    });
    
    
    it('Check that Maze has default values', function(){

        assert.equal(maze.dimension, 15);
        assert.equal(maze.generationSpeed, 100);
        assert.isArray(maze.solution);

    });
    
    it('Check that Maze creates cellsArray on object creration', function(){
        assert.isArray(maze.cellsArray);
        assert.equal(typeof maze.cellsArray[0][0], 'object');
    });
    
    it('Check that Maze shows Maze Field and assigns elements to cells', function(){

        maze.showMazeField(maze.cellsArray);
        assert.isNotNull(maze.cellsArray[0][0].getElement());
        
        assert.isTrue(element.hasChildNodes());
        assert.isTrue(parseInt(element.style.width) > 0);

    });
    
    it('Check that initMaze provides solution', function(){
        maze.initMaze(maze.cellsArray);
        
        assert.isTrue(maze.solution.length > 0);


    });
    
});

