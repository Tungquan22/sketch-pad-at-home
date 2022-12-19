const parentGrid = document.getElementById('grid');
const childSquares = parentGrid.childNodes;
let gridSize = 16;

let mouseDown = false;
document.body.onmousedown = () => (mouseDown = true);
document.body.onmouseup = () => (mouseDown = false);

const resetButton = document.querySelector('.reset-button');
resetButton.addEventListener('click', resetColor);

const chooseSizeButton = document.querySelector('.size-button');
chooseSizeButton.addEventListener('click', () => {
    gridSize = prompt("Please enter a number:");
    createGrid(gridSize);
})

// Create the full grid
function createGrid(size) {
    parentGrid.style.gridTemplateColumns = `repeat(${size}, 1fr)`;
    parentGrid.style.gridTemplateRows = `repeat(${size}, 1fr)`;

    for (let i = 0; i < size * size; i++) {
        const square = document.createElement('div');
        square.classList.add('square');
        square.addEventListener('mouseover', changeColor);
        square.addEventListener('mousedown', changeColor);
        parentGrid.appendChild(square);
    }
}

// Change the color of an element when clicked
function changeColor(e) {
    if (e.type === 'mouseover' && !mouseDown) {
        return;
    }

    e.target.style.backgroundColor = 'black';
}

// Reset the sketchpad
function resetColor() {
    for (let i = 0; i < childSquares.length; i++) {
        let square = childSquares[i];
        square.style.backgroundColor = 'white';
    }
}

// Change the size of the grid
function changeSize(size) {
    gridSize = size;
}