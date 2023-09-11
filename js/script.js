const NO_OF_ROWS = 12;
const NO_OF_COLUMNS = 12;
let snakePos = [];
let applePos = [];
let snakeSpeed = 1;
let applesCount = 0;
let snakeDirection = "ArrowLeft"; //Snake direction, initial is left.
let prevSnakeDirection = "ArrowLeft"; //Keep track of previous direction, to prevent snake turning to opposite direction.

const playArea = document.querySelector("body");
const playField = document.querySelector("#play-field");

function createFieldSquares() {
  for (let i = 0; i < NO_OF_ROWS; i++) {
    const row = document.createElement("div");
    row.classList.add("row", "d-flex", "justify-content-center");

    for (let j = 0; j < NO_OF_COLUMNS; j++) {
      const col = document.createElement("div");
      col.classList.add("col", "square");
      row.appendChild(col);
    }

    playField.appendChild(row);
  }
}

function arrowPressEventHandler(e) {
  snakeDirection = e.code;
  //Stop snake turning 180 degrees.
  if (snakeDirection === "ArrowUp" && prevSnakeDirection === "ArrowDown") {
    snakeDirection = "ArrowDown";
  } else if (snakeDirection === "ArrowDown" && prevSnakeDirection === "ArrowUp") {
    snakeDirection = "ArrowUp";
  } else if (snakeDirection === "ArrowLeft" && prevSnakeDirection === "ArrowRight") {
    snakeDirection = "ArrowRight";
  } else if (snakeDirection === "ArrowRight" && prevSnakeDirection === "ArrowLeft") {
    snakeDirection = "ArrowLeft";
  }
}

const setSquareColor = (posY, posX, color) => {
  let elements = document.getElementById("play-field").children;
  let x = elements.item(posX);
  let xy = x.children[posY];
  xy.style.backgroundColor = color;
};

const createApple = () => {
  if (applePos.length > 0) return;
  appleX = Math.floor(Math.random() * NO_OF_COLUMNS);
  appleY = Math.floor(Math.random() * NO_OF_ROWS);
  //If new apple shares squares with snake, rerun createApple()
  for (let i = 0; i < snakePos.length; i++) {
    if (JSON.stringify(snakePos[i]) === JSON.stringify([appleY, appleX])) {
      createApple();
    }
  }
  applePos = [appleY, appleX];
};

const renderApple = () => {
  createApple();
  setSquareColor(applePos[1], applePos[0], "green");
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
  let headsNextPos = moveHead(snakeDirection);
  snakePos.unshift(headsNextPos); //Move over first square ("head").
  let lastSquare = snakePos.at(-1); //Find arrays last element. ("tail")
  snakePos.pop(); //Remove last element from array.
  setSquareColor(lastSquare[1], lastSquare[0], "#DAA520"); //Color vacated square back to orange.
  snakePos.forEach((square) => {
    setSquareColor(square[1], square[0], "#8888");
  });
  checkApple();
};

function moveHead(snakeDirection) {
  let headXpos = snakePos[0][1];
  let headYpos = snakePos[0][0];
  if (snakeDirection === "ArrowUp") {
    headYpos === 0 ? (headYpos = 11) : (headYpos -= 1);
  } else if (snakeDirection === "ArrowDown") {
    headYpos === 11 ? (headYpos = 0) : (headYpos += 1);
  } else if (snakeDirection === "ArrowLeft") {
    headXpos === 0 ? (headXpos = 11) : (headXpos -= 1);
  } else if (snakeDirection === "ArrowRight") {
    headXpos === 11 ? (headXpos = 0) : (headXpos += 1);
  }
  let headsNextPos = [headYpos, headXpos];
  collisionCheck(headsNextPos);
  prevSnakeDirection = snakeDirection;

  return headsNextPos;
}

const checkApple = () => {
  let snakeHead = snakePos[0];
  if (JSON.stringify(snakeHead) === JSON.stringify(applePos)) {
    applePos = []; //Empty apple array.
    snakePos.push(snakeHead); // Add one link to snake.
    applesCount++;
    stopGameLoop(gameLoopID); // Stop current loop.
    snakeSpeed += 0.1; //Increase snake speed.
    gameLoopID = startGameLoop(snakeSpeed); //Start new loop with increased speed.
  }
  document.getElementById("score").textContent = `Score: ${applesCount}`;
};

function collisionCheck(headsNextPos) {
  for (let i = 1; i < snakePos.length; i++) {
    if (JSON.stringify(snakePos[i]) === JSON.stringify(headsNextPos)) {
      stopGameLoop(gameLoopID);
    }
  }
}

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

createFieldSquares();
playArea.addEventListener("keydown", arrowPressEventHandler);

//Starts game.
let gameLoopID = startGameLoop(snakeSpeed);
