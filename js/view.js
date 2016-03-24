'use strict';

function hideElement(elementId){
    var element = document.getElementById(elementId);
    if(element){
        element.classList.add('hidden');
    }
    
}

function showElement(elementId){
    var element = document.getElementById(elementId);
    if(element){
         element.classList.remove('hidden');
    }
   
}

function resetContainer(){
    var element = document.querySelector('.mazeContainer');
    while (element.hasChildNodes()) {
        element.removeChild(element.lastChild);
    }
}