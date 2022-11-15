const NO_OF_ROWS = 12;
const NO_OF_COLUMNS = 12;
let snakeBody = [
  [3, 11],
  [3, 10],
  [3, 9],
];
let playFieldMatrix = [];

class CellObj {
  constructor(posX, posY, isBody, isApple) {
    this.posX = posX;
    this.posY = posY;
    this.isBody = isBody;
    this.isApple = isApple;
  }
}

//Populate matrix with initial cell objects
for (let row = 0; row < NO_OF_ROWS; row++) {
  let matrixRow = [];
  for (let column = 0; column < NO_OF_COLUMNS; column++) {
    matrixRow.push(new CellObj(column, row, false, false, false));
  }
  playFieldMatrix.push(matrixRow);
}

const draw = function () {
  let elements = document.getElementById("play-field").children;
  let row = elements.item(county);
  let xy = row.children[countx];
  xy.style.backgroundColor = `rgb(${r}, ${g} , ${b})`;
  countx++;
};

//Render Snake on the field
const renderSnake = () => {
  let elements = document.getElementById("play-field").children;

  snakeBody.forEach((cell) => {
    let row = elements.item(cell[0]);
    let xy = row.children[cell[1]];
    xy.style.backgroundColor = "#8888";
  });
};

//Add snake body coords to field marix.
const snakeToFieldMatrix = () => {};

setInterval(renderSnake, 1000);
