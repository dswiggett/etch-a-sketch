let gameBox = document.querySelector('.game-box');
let divs = [];
let element;

// button variables
let colorPicker = document.querySelector('#color-picker');
let colorMode = document.querySelector('#color-mode');
let rainbowMode = document.querySelector('#rainbow-mode');
let eraser = document.querySelector('#eraser');
let eraserOn = false;
let clear = document.querySelector('#clear');
let gridNum = document.querySelector('#grid-num');
let gridSize = document.querySelector('#grid');
let size = document.querySelector('#grid').value;

// create 16x16 grid of square divs inside game box - readjust grid 
gridNum.textContent = `${size} x ${size}`;
createGrid(size);

// when hovering over element change background color
etchSketchColors('black');

// color picker
colorPicker.addEventListener('input', () => {
    let colorPicked = colorPicker.value;
    etchSketchColors(colorPicked);
});

// color mode
colorMode.addEventListener('click', () => {
    etchSketchColors('black');
});

// rainbow mode
let num = -1;
rainbowMode.addEventListener('click', () => {
    let rainbowColors = ['red', 'orange', 'yellow', 'green', 'blue', 'indigo', 'violet'];
    divs.forEach(div => {
        div.addEventListener('mouseenter', () => {
            num++;
            if (num === 6) {
                num = 0;
            }
            div.style.backgroundColor = rainbowColors[num];
            div.style.cursor = 'move';
        });
    });
});

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
gridSize.addEventListener('input', () => {
    size = document.querySelector('#grid').value;
    gridNum.textContent = `${size} x ${size}`;
    gameBox.innerHTML = "";
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

// function to hold forEach
// figure out how to stop the sketching with another click
function etchSketchColors(color) {
    divs.forEach(div => {
        gameBox.addEventListener('click', () => {
            div.style.cursor = 'pointer';
            div.addEventListener('mouseenter', () => {
                div.style.backgroundColor = color;
            });
        });
    });
}