const NO_OF_ROWS = 12;
const NO_OF_COLUMNS = 12;
let snakePos = [
  [5, 6],
  [5, 7],
  [5, 8],
];
let prevSnakePos = [];
let playFieldMatrix = [];

class CellObj {
  constructor(isSnake, isApple) {
    this.isSnake = isSnake;
    this.isApple = isApple;
  }
}

const playArea = document.querySelector("body");

playArea.addEventListener("keydown", arrowPressEventHandler);

function arrowPressEventHandler(e) {
  runDirection(e.code);
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
  runDirection();
};

//Update snake body coords on the field marix.
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
    playFieldMatrix[y][x].isSnake = true;
  }
  //Remove unused cell from previous snake position.
  prevSnakePos.forEach((cell) => {
    let y = cell[0];
    let x = cell[1];
    playFieldMatrix[y][x].isSnake = false;
  });
};

//
let prevDirection = "ArrowLeft";
const runDirection = (runDirection) => {
  let headXpos = snakePos[0][1];
  let headYpos = snakePos[0][0];

  if (!runDirection) {
    runDirection = prevDirection;
  }

  if (runDirection === "ArrowUp") headYpos -= 1;
  if (runDirection === "ArrowDown") headYpos += 1;
  if (runDirection === "ArrowLeft") headXpos -= 1;
  if (runDirection === "ArrowRight") headXpos += 1;

  snakePos.unshift([headYpos, headXpos]); //Move first item (head) one cell to the left.
  let lastSnakeCell = snakePos.at(-1);
  snakePos.pop(); //Remove last element from array.
  updateSnakePos();
  changeSquareColor(lastSnakeCell[1], lastSnakeCell[0], "#DAA520"); //Paint vacated square back to orange.
  snakePos.forEach((cell) => {
    changeSquareColor(cell[1], cell[0], "#8888");
  });
  prevDirection = runDirection;
};

setInterval(renderSnake, 1000);
