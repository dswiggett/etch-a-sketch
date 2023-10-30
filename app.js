let gameBox = document.querySelector('.game-box');
let divs = [];
let element;

// button variables
let colorPicker = document.querySelector('#color-picker');
let colorMode = document.querySelector('#color-mode');
let rainbowColor = document.querySelector('#rainbow-color');
let eraser = document.querySelector('#eraser');
let eraserOn = false;
let clear = document.querySelector('#clear');

// create 16x16 grid of square divs inside game box
for (let i = 1; i <= 256; i++) {
    element = document.createElement('div');
    element.style.cssText = 'border: 1px solid black; padding: 15px;';
    element.setAttribute('class', 'grid');
    gameBox.appendChild(element);

    divs.push(element);
}

// when hovering over element change background color - figure out how to do it with a click then drag, instead of a hover
etchSketchColors('black');

// color picker

// color mode

// rainbow mode

// erase sketch
eraser.addEventListener('click', () => {
    eraserOn = !eraserOn;
    if (eraserOn === true) {
        etchSketchColors('white');
    } else {
        etchSketchColors('black');
    }
})

// clear sketch
clear.addEventListener('click', () => {
    divs.forEach(div => {
        div.style.backgroundColor = 'white';
    });
})

// grid size

// function to hold forEach
function etchSketchColors(color) {
    divs.forEach(div => {
        div.addEventListener('mouseenter', () => {
            div.style.backgroundColor = color;
        });
    });
}