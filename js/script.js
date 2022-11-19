const NO_OF_ROWS = 12;
const NO_OF_COLUMNS = 12;
const playArea = document.querySelector("body");
let snakePos = [
  [5, 6],
  [5, 7],
];
let applePos = [];

playArea.addEventListener("keydown", arrowPressEventHandler);

function arrowPressEventHandler(e) {
  let pressedKey = e.code;
  renderSnake(pressedKey);
}

const colorSquare = (posY, posX, color) => {
  let elements = document.getElementById("play-field").children;
  let x = elements.item(posX);
  let xy = x.children[posY];
  xy.style.backgroundColor = color;
};


const createApple = () => {
  if (applePos.length > 0) return;
  appleX = Math.floor(Math.random() * NO_OF_COLUMNS);
  appleY = Math.floor(Math.random() * NO_OF_ROWS);
  applePos = [appleY, appleX];
};

const renderApple = () => {
  createApple();
  colorSquare(applePos[1], applePos[0], "green");
};


let currentDirection = "ArrowLeft"; //Initial and current snake run direction.

const renderSnake = (runDirection) => {
  let headXpos = snakePos[0][1];
  let headYpos = snakePos[0][0];

  if (!runDirection) {
    runDirection = currentDirection;
  }

  if (runDirection === "ArrowUp") {
    headYpos === 0 ? (headYpos = 11) : (headYpos -= 1);
  } else if (runDirection === "ArrowDown") {
    headYpos === 11 ? (headYpos = 0) : (headYpos += 1);
  } else if (runDirection === "ArrowLeft") {
    headXpos === 0 ? (headXpos = 11) : (headXpos -= 1);
  } else if (runDirection === "ArrowRight") {
    headXpos === 11 ? (headXpos = 0) : (headXpos += 1);
  } else if (runDirection === "stop") {
    headXpos = snakePos[0][1];
    headYpos = snakePos[0][0];
  }
  currentDirection = runDirection;

  snakePos.unshift([headYpos, headXpos]); //Move over first square ("head").
  let lastSquare = snakePos.at(-1); //Find arrays last element. ("tail")
  snakePos.pop(); //Remove last element from array.
  colorSquare(lastSquare[1], lastSquare[0], "#DAA520"); //Color vacated square back to orange.
  snakePos.forEach((square) => {
    colorSquare(square[1], square[0], "#8888");
  });
  isAppleEaten();
};

const isAppleEaten = () => {
  let snakeHead = snakePos[0];
  if (JSON.stringify(snakeHead) === JSON.stringify(applePos)) {
    applePos = []; //Empty aplle array.
    snakePos.push(snakeHead); // Add one link to sneak.
  }
};

//Run Snake on the field.
const run = () => {
  renderApple();
  renderSnake();
};

setInterval(run, 1000 / 1);
