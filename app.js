// general variables
let gameBox = document.querySelector('.game-box');
let divs = [];
let element;

//// GRID ////
let slider = document.querySelector('#grid');
let size = document.querySelector('#grid').value;
slider.addEventListener('input', (e) => {
    size = e.target.value;
    updateGrid();
});

// create the grid
function createGrid() {
    for (let i = 0; i < 256; i++) {
        let div = document.createElement("div");
        div.classList.add("square");
        divs.push(div);
        gameBox.appendChild(div);
    }
}

function updateGrid() {
    gameBox.innerHTML = '';
    divs = [];
    gameBox.style.setProperty(
        "grid-template-columns",
        `repeat(${size}, 2fr)`
    );
    gameBox.style.setProperty(
        "grid-template-rows",
        `repeat(${size}, 2fr)`
    );
    for (let i = 0; i < size * size; i++) {
        const div = document.createElement("div");
        div.classList.add("square");
        divs.push(div);
        div.style.backgroundColor = backgroundPicker.value;
        gameBox.appendChild(div);
    }
}

createGrid();

//// FUNCTIONALITY ////
let sketchOn = false;
let colorOn = false;
let rainbowOn = false;
let eraserOn = false;

let pickedColor = false;
let pickedEraser = false;
let pickedRainbow = false;

let backgroundPicker = document.querySelector('#background-picker');
let colorPicker = document.querySelector('#color-picker');
let colorPicked;
let rainbowMode = document.querySelector('#rainbow-mode');
let eraser = document.querySelector('#eraser');
let clear = document.querySelector('#clear');
let restart = document.querySelector('#restart');
let backgroundColorPicked = false;

let selected; // use when styling

// default color
gameBox.addEventListener('click', () => {
    sketchOn = !sketchOn;
    forEachSketch(sketchOn, 'black', undefined);
});

// color picker
colorPicker.addEventListener('click', () => {
    pickedColor = true;
    pickedEraser = false;
    pickedRainbow = false;

    colorPicker.classList.add('selected');
    backgroundPicker.classList.remove('selected');
    rainbowMode.classList.remove('selected');
    eraser.classList.remove('selected');

    rainbowMode.style.backgroundColor = 'white';
    rainbowMode.style.color = 'black';
    eraser.style.backgroundColor = 'white';
    eraser.style.color = 'black';
});

// rainbow mode
let rainbowColors = ['red', 'orange', 'yellow', 'green', 'blue', 'indigo', 'violet'];
rainbowMode.addEventListener('click', () => {
    pickedRainbow = true;
    pickedEraser = false;
    pickedColor = false;

    rainbowMode.classList.add('selected');
    colorPicker.classList.remove('selected');
    backgroundPicker.classList.remove('selected');
    eraser.classList.remove('selected');

    buttonSelected(rainbowMode, eraser);
});

// eraser
eraser.addEventListener('click', () => {
    pickedEraser = true;
    pickedColor = false;
    pickedRainbow = false;

    eraser.classList.add('selected');
    colorPicker.classList.remove('selected');
    backgroundPicker.classList.remove('selected');
    rainbowMode.classList.remove('selected');

    buttonSelected(eraser, rainbowMode);
});

// clear
clear.addEventListener('click', () => {
    divs.forEach(div => {
        div.style.backgroundColor = backgroundPicker.value;
        div.className = '';
        div.classList.add('square');
    });
});

// restart
restart.addEventListener('click', () => {
    location.reload();
});

// change grid background color 
backgroundPicker.addEventListener('click', () => {
    backgroundPicker.classList.add('selected');
    colorPicker.classList.remove('selected');
    eraser.classList.remove('selected');
    rainbowMode.classList.remove('selected');
});

backgroundPicker.addEventListener('input', () => {
    const newBackgroundColor = backgroundPicker.value;
    backgroundColorPicked = true;
    divs.forEach(div => {
        if (div.classList.value === 'square' && div.classList.value !== 'colored') {
            div.style.backgroundColor = newBackgroundColor;
        }
    });
});

// selected buttons
function buttonSelected(selected, unselected) {
    selected.style.backgroundColor = 'black';
    selected.style.color = 'white';
    unselected.style.backgroundColor = 'white';
    unselected.style.color = 'black';
}

// game box
gameBox.addEventListener('click', () => {
    if (pickedColor === true) {
        colorPicked = colorPicker.value;
        colorOn = !colorOn;
        forEachSketch(colorOn, colorPicked, undefined);
    }

    if (pickedEraser === true) {
        eraserOn = !eraserOn;
        const eraserBackground = backgroundPicker.value;
        if (!backgroundColorPicked) {
            forEachSketch(eraserOn, '', undefined);
        } else {
            forEachSketch(eraserOn, eraserBackground, undefined);
        }
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
                // if eraser bool is true
                if (bool === pickedEraser) {
                    div.classList.remove('colored');
                } else {
                    div.classList.add('colored');
                }
                // if rainbow mode is clicked
                if (bool === rainbowOn) {
                    div.style.backgroundColor = color[x];
                    x++;
                    div.classList.add('colored');
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