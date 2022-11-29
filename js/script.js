const NO_OF_ROWS = 12;
const NO_OF_COLUMNS = 12;
let snakePos = [];
let applePos = [];
let snakeSpeed = 1;
let applesCount = 0;
let snakeDirection = "ArrowLeft"; //Initial and updated snake direction.

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
  for (let i = 0; i < snakePos.length; i++) {
    if (JSON.stringify(snakePos[i]) === JSON.stringify([appleY, appleX])) {
      createApple();
      return;
    }
  }
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

const renderSnake = () => {
  createSnake();
  let headsNextPos = setSnakeDirection(snakeDirection);
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
  snakeDirection = pressedKey;
}

let prevDirection = snakeDirection;
function setSnakeDirection(newDirection) {
  let headXpos = snakePos[0][1];
  let headYpos = snakePos[0][0];

  if (newDirection === "ArrowUp") {
    headYpos === 0 ? (headYpos = 11) : (headYpos -= 1);
  } else if (newDirection === "ArrowDown") {
    headYpos === 11 ? (headYpos = 0) : (headYpos += 1);
  } else if (newDirection === "ArrowLeft") {
    headXpos === 0 ? (headXpos = 11) : (headXpos -= 1);
  } else if (newDirection === "ArrowRight" && prevDirection !== "ArrowLeft") {
    headXpos === 11 ? (headXpos = 0) : (headXpos += 1);
  } else if (newDirection === "stop") {
    headXpos = snakePos[0][1];
    headYpos = snakePos[0][0];
  } else {
    setSnakeDirection(prevDirection);
  }

  let headsNextPos = [headYpos, headXpos];
  prevDirection = newDirection;

  return headsNextPos;
}

const checkIfEaten = () => {
  let snakeHead = snakePos[0];
  if (JSON.stringify(snakeHead) === JSON.stringify(applePos)) {
    applePos = []; //Empty apple array.
    snakePos.push(snakeHead); // Add one link to front.
    applesCount++;
    stopGameLoop(gameLoopID); // Stop current loop.
    snakeSpeed += 0.1; //Increase snake speed.
    gameLoopID = startGameLoop(snakeSpeed); //Start new loop with increased speed.
  }
  document.getElementById("score").textContent = `Score: ${applesCount}`;
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
