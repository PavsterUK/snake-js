const NO_OF_ROWS = 12;
const NO_OF_COLUMNS = 12;
let snakeBody = [];

class CellObj {
  posX; //Cell Horizontal Pos.
  posY; //Cell Vertical Pos.
  isActive; // True if cell is displayed.
  isHead; //True if cell represents snakes head.
  isTail; //True if cell represents snake tail.
  constructor(posX, posY, isActive, isHead, isTail) {
    this.posX = posX;
    this.posY = posY;
    this.isActive = isActive;
    this.isHead = isHead;
    this.isTail = isTail;
  }
}

//Populate matrix with initial cell objects
let playFieldMatrix = [];
for (let row = 0; row < NO_OF_ROWS; row++) {
  let matrixRow = [];
  for (let column = 0; column < NO_OF_COLUMNS; column++) {
    matrixRow.push(new CellObj(column, row, false, false, false));
  }
  playFieldMatrix.push(matrixRow);
}

const MoveSnakeTest = (x, y) => {
  let elements = document.getElementById("play-field").children;
  let row = elements.item(y);
  let xy = row.children[x];
  xy.style.backgroundColor = "red";
};

//Test Game Loop
function loop() {
  for (let y = 0; y < 12; y++) {
    for (let x = 0; x < 12; x++) {
      setTimeout(MoveSnakeTest(x, y), 3000);
    }
  }
}

loop();
