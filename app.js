// general variables
let gameBox = document.querySelector('.game-box');
let divs = [];
let element;

//// GRID ////
let gridNum = document.querySelector('#grid-num');
let gridSize = document.querySelector('#grid');
let size = document.querySelector('#grid').value;
let grid = document.querySelector('#grid');

// create 16x16 grid of square divs inside game box 
gridNum.textContent = `${size} x ${size}`;
createGrid(size);

// function to size grid - IT CREATES THE GRID WITH THE SIZE BUT NOT EVENLY HORIZONTALLY AND VERTICALLY, JUST VERTICALLY... ISSUE MUST BE IN THE CSS
grid.addEventListener('input', e => {
    size = e.target.value;
    gridNum.textContent = `${size} x ${size}`;
    createGrid(size);
});

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
let rainbowOn = false;
let eraserOn = false;
let colorPicker = document.querySelector('#color-picker');
let rainbowMode = document.querySelector('#rainbow-mode');
let eraser = document.querySelector('#eraser');
let clear = document.querySelector('#clear');

// start etch-a-sketch by clicking on grid
gameBox.addEventListener('click', () => {
    sketchOn = !sketchOn;
    forEachSketch(sketchOn, 'black', undefined);
});

// color picker - ERROR DUPLICATE BOOLEANS AND INPUTS OCCUR WHEN CLICKING ON COLOR PICKER INPUT
colorPicker.addEventListener('click', () => {
    gameBox.addEventListener('click', () => {
        let colorPicked = colorPicker.value;
        colorOn = !colorOn;
        forEachSketch(colorOn, colorPicked, undefined);
    });
});

// rainbow mode
let rainbowColors = ['red', 'orange', 'yellow', 'green', 'blue', 'indigo', 'violet'];
rainbowMode.addEventListener('click', () => {
    gameBox.addEventListener('click', () => {
        rainbowOn = !rainbowOn;
        let x = 0;
        forEachSketch(rainbowOn, rainbowColors, x);
    });
});

// eraser
eraser.addEventListener('click', () => {
    gameBox.addEventListener('click', () => {
        eraserOn = !eraserOn;
        forEachSketch(eraserOn, 'white', undefined);
    });
});

// clear
clear.addEventListener('click', () => {
    divs.forEach(div => {
        div.style.backgroundColor = 'white';
    });
});

// function to keep from repetition
function forEachSketch(bool, colorOn, x) {
        if (bool) {
            divs.forEach(div => {
                gameBox.style.cursor = 'pointer';
                div.onmouseover = e => {
                    let target = e.target;
                    target.style.background = colorOn;
                    // if rainbow mode is clicked
                    if (bool === rainbowOn) {
                        div.style.backgroundColor = colorOn[x];
                        x++;
                        if (x === 7) {
                            x = 0;
                        }
                    }
                }
            })
        }

        if (!bool) {
            divs.forEach(div => {
                gameBox.style.cursor = 'auto';
                div.onmouseover = e => {
                    let target = e.target;
                    let targetColor = target.style.backgroundColor;
                    target.style.background = targetColor;
                }
            })
        }
}

// TO-DO LIST 
    // color picker bug
    // grid sizer
    // style it
    // add directions button with directions on how to use