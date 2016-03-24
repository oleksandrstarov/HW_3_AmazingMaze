"use strict";

function getRandom(max){
    var value = Math.floor(Math.random() * max);
    if(value === max){
        value = getRandom(max);
    }
    return value;
}