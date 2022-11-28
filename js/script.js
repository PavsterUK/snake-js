const NO_OF_ROWS = 12;
const NO_OF_COLUMNS = 12;
let snakePos = [];
let applePos = [];
let snakeSpeed = 1;
let eatenApples = 0;

const playArea = document.querySelector("body");
playArea.addEventListener("keydown", arrowPressEventHandler);

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

const createSnake = () => {
  if (snakePos.length > 0) return;
  snakeHeadX = Math.floor(Math.random() * NO_OF_COLUMNS);
  snakeHeadY = Math.floor(Math.random() * NO_OF_ROWS);
  snakePos = [
    [snakeHeadY, snakeHeadX],
    [snakeHeadY, snakeHeadX + 1],
  ];
};

let currentDirection = "ArrowLeft"; //Initial and current snake direction.

const renderSnake = () => {
  createSnake();
  let headsNextPos = setSnakeDirection(currentDirection);
  snakePos.unshift(headsNextPos); //Move over first square ("head").
  let lastSquare = snakePos.at(-1); //Find arrays last element. ("tail")
  snakePos.pop(); //Remove last element from array.
  colorSquare(lastSquare[1], lastSquare[0], "#DAA520"); //Color vacated square back to orange.
  snakePos.forEach((square) => {
    colorSquare(square[1], square[0], "#8888");
  });
  checkIfEaten();
};

function arrowPressEventHandler(e) {
  let pressedKey = e.code;
  currentDirection = pressedKey;
}

function setSnakeDirection(runDirection) {
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
  } else if (
    runDirection === "ArrowRight" &&
    currentDirection !== "ArrowLeft"
  ) {
    headXpos === 11 ? (headXpos = 0) : (headXpos += 1);
  } else if (runDirection === "stop") {
    headXpos = snakePos[0][1];
    headYpos = snakePos[0][0];
  }
  currentDirection = runDirection;

  let headsNextPos = [headYpos, headXpos];

  return headsNextPos;
}

const checkIfEaten = () => {
  let snakeHead = snakePos[0];
  if (JSON.stringify(snakeHead) === JSON.stringify(applePos)) {
    applePos = []; //Empty apple array.
    snakePos.push(snakeHead); // Add one link to sneak.
    eatenApples++;
    stopGameLoop(gameLoopID); // Stop current loop.
    snakeSpeed += 0.1; //Increase snake speed.
    gameLoopID = startGameLoop(snakeSpeed); //Start new loop with increased speed.
  }
  document.getElementById("score").textContent = `Score: ${eatenApples}`;
};

//Render snake and apple.
const run = () => {
  renderApple();
  renderSnake();
};

function startGameLoop(speed) {
  return setInterval(run, 1000 / speed);
}

function stopGameLoop(gameLoopID) {
  window.clearInterval(gameLoopID);
}

let gameLoopID = startGameLoop(snakeSpeed);
