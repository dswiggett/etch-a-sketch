let gameBox = document.querySelector('.game-box');
let divs = [];
let div;

// create 16x16 grid of square divs inside game box
for (let i = 1; i <= 256; i++) {
    let element = document.createElement('div');
    element.style.cssText = 'border: 1px solid black; padding: 15px;';
    element.setAttribute('class', 'grid');
    gameBox.appendChild(element);
}

// use flexbox  to make the square divs appear as a grid
// DOING THIS CURRENTLY IN STYLESHEET

// using a hover effect, permanently change the colors of the squares