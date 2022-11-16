const NO_OF_ROWS = 12;
const NO_OF_COLUMNS = 12;
let snakePos = [
  [5, 8],
  [5, 9],
  [5, 10],
  [5, 11]
];
let prevSnakePos = [];
let playFieldMatrix = [];

class CellObj {
  constructor(isBody, isApple) {
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

const changeSquareColor = (posY, posX, color) => {
  let elements = document.getElementById("play-field").children;
  let x = elements.item(posX);
  let xy = x.children[posY];
  xy.style.backgroundColor = color;
};

//Render Snake on the field
const renderSnake = () => {
  snakePos.forEach((cell) => {
    changeSquareColor(cell[1], cell[0], "#8888");
  });
  moveSnakeLeft();
  updateSnakePos();
};

//Update body coords on field marix.
const updateSnakePos = () => {
  //Compare arrays to find what cells will remain in new snake position.
  for (let i = 0; i < snakePos.length; i++) {
    for (let k = 0; k < prevSnakePos.length; k++) {
      if (JSON.stringify(snakePos[i]) === JSON.stringify(prevSnakePos[k])) {
        prevSnakePos.splice(k, 1);
      }
    }
    let y = snakePos[i][0];
    let x = snakePos[i][1];
    playFieldMatrix[y][x].isBody = true;
  }
  //Remove unused cell from previous snake position.
  prevSnakePos.forEach((cell) => {
    let y = cell[0];
    let x = cell[1];
    playFieldMatrix[y][x].isBody = false;
  });
};

const moveSnakeLeft = () => {
  snakePos.unshift([snakePos[0][0], snakePos[0][1] - 1]); //Move first item (head) one cell to the left.
  let lastSnakeCell = snakePos.at(-1);
  changeSquareColor(lastSnakeCell[1], lastSnakeCell[0], "#DAA520"); //Pain vacated square back to orange.
  snakePos.pop(); //Removel last element from array.
};

setInterval(renderSnake, 1000);
