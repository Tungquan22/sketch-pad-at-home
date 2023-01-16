const parentGrid = document.getElementById("grid");
const childSquares = parentGrid.childNodes;
let gridSize = 16; // default grid size
let drawColor = "#000000"; // default drawing color
let isPen = true; // default tool (pen or eraser)

let mouseDown = false;
document.body.onmousedown = () => (mouseDown = true);
document.body.onmouseup = () => (mouseDown = false);

// Adjust the size of the grid based on a slider
const slider = document.getElementById("grid-size-slider");
const sizeDisplay = document.getElementById("size-display");
sizeDisplay.innerHTML = `${slider.value}x${slider.value}`;

slider.oninput = () => {
  sizeDisplay.innerHTML = `${slider.value}x${slider.value}`;
  gridSize = slider.value;
};

slider.onchange = () => {
  createGrid(gridSize);
};

createGrid(gridSize);

// Change between pen or eraser
const penButton = document.querySelector(".pen-button");
const eraserButton = document.querySelector(".eraser-button");

penButton.addEventListener("click", () => {
  isPen = true;
});

eraserButton.addEventListener("click", () => {
  isPen = false;
});

// Adjust the color of the pen based on a color-picker
const colorPicker = document.getElementById("draw-color");
colorPicker.oninput = () => {
  colorPicker.style.backgroundColor = colorPicker.value;
  drawColor = colorPicker.value;
};

const resetButton = document.querySelector(".reset-button");
resetButton.addEventListener("click", resetColor);

// Create the full grid
function createGrid(size) {
  parentGrid.style.gridTemplateColumns = `repeat(${size}, 1fr)`;
  parentGrid.style.gridTemplateRows = `repeat(${size}, 1fr)`;

  for (let i = 0; i < size * size; i++) {
    const square = document.createElement("div");
    square.classList.add("square");
    square.addEventListener("mouseover", changeColor);
    square.addEventListener("mousedown", changeColor);
    parentGrid.appendChild(square);
  }

  resetColor();
}

// Change the color of an element when clicked
function changeColor(e) {
  if (e.type === "mouseover" && !mouseDown) {
    return;
  }

  if (isPen) {
    e.target.style.backgroundColor = drawColor;
  } else {
    e.target.style.backgroundColor = "white";
  }
}

// Reset the sketchpad
function resetColor() {
  for (let i = 0; i < childSquares.length; i++) {
    const square = childSquares[i];
    square.style.backgroundColor = "white";
  }
}

// Change the size of the grid
function changeSize(size) {
  gridSize = size;
}
