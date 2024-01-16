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

// function to size grid - FIGURE OUT THE POSITIONING OF IT (CENTERED ON PAGE)
grid.addEventListener('input', e => {
    gameBox.innerHTML = '';
    size = e.target.value;
    gridNum.textContent = `${size} x ${size}`;
    createGrid(size);
});

// function to create grid
function createGrid(grids) {
    for (let i = 1; i <= grids * grids; i++) {
        element = document.createElement('div');
        element.style.cssText = 'border: 1px solid black; padding: 15px;';
        element.setAttribute('class', `grid grid${i}`);
        gameBox.appendChild(element);
        gridTempCol();

        divs.push(element);
    }
}

// function for grid template columns
function gridTempCol() {
    let auto = [];
    for (let i = 1; i <= size; i++) {
        auto.push('auto');
    }
    auto = auto.toString().replace(/,/g, " ");
    gameBox.style.gridTemplateColumns = auto;
}

//// FUNCTIONALITY ////
let sketchOn = false;
let colorOn = false;
let rainbowOn = false;
let eraserOn = false;

let pickedColor = false;
let pickedEraser = false;
let pickedRainbow = false;

let colorPicker = document.querySelector('#color-picker');
let colorPicked;
let rainbowMode = document.querySelector('#rainbow-mode');
let eraser = document.querySelector('#eraser');
let clear = document.querySelector('#clear');
let restart = document.querySelector('#restart');

let selected; // use when styling
let deselected; // use when styling

// start etch-a-sketch by clicking on grid
gameBox.addEventListener('click', () => {
    sketchOn = !sketchOn;
    forEachSketch(sketchOn, 'black', undefined);
});

// color picker
colorPicker.addEventListener('click', () => {
    pickedColor = true;
    pickedEraser = false;
    pickedRainbow = false;
});

// rainbow mode
let rainbowColors = ['red', 'orange', 'yellow', 'green', 'blue', 'indigo', 'violet'];
rainbowMode.addEventListener('click', () => {
    pickedRainbow = true;
    pickedEraser = false;
    pickedColor = false;
});

// eraser
eraser.addEventListener('click', () => {
    pickedEraser = true;
    pickedColor = false;
    pickedRainbow = false;
});

// clear
clear.addEventListener('click', () => {
    divs.forEach(div => {
        div.style.backgroundColor = 'white';
    });
});

// restart
restart.addEventListener('click', () => {
    location.reload();
});

// game box
gameBox.addEventListener('click', () => {
    if (pickedColor === true) {
        colorPicked = colorPicker.value;
        colorOn = !colorOn;
        forEachSketch(colorOn, colorPicked, undefined);
    }

    if (pickedEraser === true) {
        eraserOn = !eraserOn;
        forEachSketch(eraserOn, 'white', undefined);
    }

    if (pickedRainbow === true) {
        rainbowOn = !rainbowOn;
        let x = 0;
        forEachSketch(rainbowOn, rainbowColors, x);
    }
});

// function to keep from repetition
function forEachSketch(bool, color, x) {
    if (bool) {
        divs.forEach(div => {
            gameBox.style.cursor = 'pointer';
            div.onmouseover = e => {
                let target = e.target;
                target.style.background = color;
                // if rainbow mode is clicked
                if (bool === rainbowOn) {
                    div.style.backgroundColor = color[x];
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
    // grid sizer - needs to be in center of page and sizing needs to occur (have one square split into these different grids. If 1x1, it takes up the entire square and so on)
    // style it
    // add directions button with directions on how to use
