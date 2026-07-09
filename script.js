let msg = document.querySelector("#msg");
let boxes = document.querySelectorAll(".box");
let turns = document.querySelector("#whoseTurn");
let resetBtn = document.querySelector("#reset-btn");
let newGameBtn = document.querySelector("#new-btn");
let msgContainer = document.querySelector(".msg-container");
let gameContainer = document.querySelector(".bd");

const homeScreen = document.querySelector(".home-screen");
const gameScreen = document.querySelector("#game-screen");
const pvpBtn = document.querySelector("#pvp-btn");
const aiBtn = document.querySelector("#ai-btn");
let gameArea = document.querySelector("#game-screen");
let gameMode = "";

let turnO = true;
let count = 0;

let xScore = 0;
let oScore = 0;
let drawScore = 0;

let xScoreText = document.querySelector("#x-score");
let oScoreText = document.querySelector("#o-score");
let drawScoreText = document.querySelector("#draw-score");

gameScreen.classList.add("hide");

function resetGame() {
  turnO = true;
  turns.innerHTML = "Turn : O";
  enableBoxes();
  msgContainer.classList.add("hide");
  gameContainer.classList.add("bd");
  count = 0;
}

function checkWinner() {
  for (let pattern of winPatterns) {
    let pos1Val = boxes[pattern[0]].innerHTML;
    let pos2Val = boxes[pattern[1]].innerHTML;
    let pos3Val = boxes[pattern[2]].innerHTML;

    if (pos1Val !== "" && pos2Val !== "" && pos3Val !== "") {
      if (pos1Val === pos2Val && pos2Val === pos3Val) {
        turns.innerHTML = "";
        showWinner(pos1Val, pattern);
        return;
      }
    }
  }

  // Draw is checked ONLY AFTER all win patterns are checked
  if (count === 9) {
    turns.innerHTML = "";
    drawMsg();
  }
}
function drawMsg() {
  console.log("draw fxn claaes");
  msg.innerHTML = `<b>Draw! No Winner.`;
  msg.style = "color: #fffab6; font-size: 2.5rem;";
  msgContainer.classList.remove("hide");
  for (let box of boxes) {
    box.disabled = true;
  }
  gameContainer.classList.remove("bd");
  drawScore++;
  drawScoreText.innerHTML = drawScore;
}

function enableBoxes() {
  for (let box of boxes) {
    box.disabled = false;
    box.innerHTML = "";
    box.classList.remove("win");
  }
}

function computerMove() {
  console.log("comp plsying");
  let emptyBoxes = [];
  boxes.forEach((box, index) => {
    if (box.innerHTML === "") {
      emptyBoxes.push(index);
    }
  });
  if (emptyBoxes.length === 0) return;
  let randomIndex = Math.floor(Math.random() * emptyBoxes.length);
  let boxIndex = emptyBoxes[randomIndex];

  boxes[boxIndex].innerHTML = "X";
  boxes[boxIndex].style = "color:#000000; font-size: 5rem;";
  boxes[boxIndex].disabled = true;
  turnO = true;
  turns.innerHTML = "Turn : O";
  count++;
  checkWinner();
}

function showWinner(winner, pattern) {
  if (winner === "X") {
    xScore++;
    xScoreText.innerHTML = xScore;
  } else {
    oScore++;
    oScoreText.innerHTML = oScore;
  }
  msg.innerHTML = `<b>Congratulations, Winner is ${winner}</b>`;
  msg.style = "color: #fffab6;";
  msgContainer.classList.remove("hide");
  for (let index of pattern) {
    boxes[index].classList.add("win");
  }
  for (let box of boxes) {
    box.disabled = true;
  }
  gameContainer.classList.remove("bd");
}

const winPatterns = [
  [0, 1, 2],
  [0, 3, 6],
  [0, 4, 8],
  [1, 4, 7],
  [2, 5, 8],
  [2, 4, 6],
  [3, 4, 5],
  [6, 7, 8],
];

pvpBtn.addEventListener("click", () => {
  gameMode = "pvp";
  homeScreen.classList.add("hide");
  gameScreen.classList.remove("hide");

  resetGame();
});

aiBtn.addEventListener("click", () => {
  gameMode = "ai";
  console.log(gameMode);
  homeScreen.classList.add("hide");
  gameScreen.classList.remove("hide");

  resetGame();
});

boxes.forEach((box) => {
  box.addEventListener("click", () => {
    if (turnO) {
      box.innerHTML = "O";
      box.style = "color:#ff0000; font-size:5rem;";
      turns.innerHTML = "Turn : X";
      turnO = false;

      if (gameMode === "ai") {
        box.disabled = true;
        count++;
        checkWinner();

        if (count < 9 && msgContainer.classList.contains("hide")) {
          setTimeout(computerMove, 400);
        }
        return;
      }
    } else {
      box.innerHTML = "X";
      box.style = "color:#000000; font-size:5rem;";
      turns.innerHTML = "Turn : O";
      turnO = true;
    }

    box.disabled = true;
    count++;
    checkWinner();
  });
});

newGameBtn.addEventListener("click", resetGame);
resetBtn.addEventListener("click", resetGame);
