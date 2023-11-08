// general variables
let gameBox = document.querySelector('.game-box');
let divs = [];
let element;

//// GRID ////
let gridNum = document.querySelector('#grid-num');
let gridSize = document.querySelector('#grid');
let size = document.querySelector('#grid').value;
// create 16x16 grid of square divs inside game box - readjust grid 
gridNum.textContent = `${size} x ${size}`;
createGrid(size);

// function to create grid
function createGrid(grids) {
    for (let i = 1; i <= grids * grids; i++) {
        element = document.createElement('div');
        element.style.cssText = 'border: 1px solid black; padding: 15px;';
        element.setAttribute('class', 'grid');
        gameBox.appendChild(element);
    
        divs.push(element);
    }
}

//// FUNCTIONALITY ////
let sketchOn = false;
let colorOn = false;
let colorPicker = document.querySelector('#color-picker');
let rainbowMode = document.querySelector('#rainbow-mode');
let eraser = document.querySelector('#eraser');
let clear = document.querySelector('#clear');
// start etch-a-sketch by clicking on grid
gameBox.addEventListener('click', () => {
    sketchOn = !sketchOn;
    forEachSketch(sketchOn, 'black', 'white');
});
// color picker
colorPicker.addEventListener('input', () => {
    let colorPicked = colorPicker.value;
    gameBox.addEventListener('click', () => {
        colorOn = !colorOn;
        forEachSketch(colorOn, colorPicked, 'white');
    });
});
// rainbow mode

// eraser

// clear
clear.addEventListener('click', () => {
    divs.forEach(div => {
        div.style.backgroundColor = 'white';
    });
});

// function to keep from repetition
function forEachSketch(bool, colorOn, colorOff) {
    if (bool) {
        gameBox.style.cursor = 'pointer';
        divs.forEach(div => {
            div.addEventListener('mouseover', () => {
                div.style.backgroundColor = colorOn;
            });
        });
    }
    // figure out how to fix this, the white background goes over the black background;
    if (!bool) {
        gameBox.style.cursor = 'auto'; 
        divs.forEach(div => {
            div.addEventListener('mouseover', () => {
                div.style.backgroundColor = colorOff;
            });
        });
    }
}