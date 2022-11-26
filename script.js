const startPannel = document.querySelector("#startPannel");
const startGame = document.querySelector("#startGame");
const formPannel = document.querySelector("#formPannel");
const buttonGamePanel = document.querySelector("#buttonGamePanel");
const endGamePannel = document.querySelector("#endGamePannel");
const validate = document.querySelector("#validate");

const inputs = document.querySelectorAll("input");

const p1Input = document.querySelector("#p1Input");
const p2Input = document.querySelector("#p2Input");
const p1Name = document.querySelector("#p1Name");
const p2Name = document.querySelector("#p2Name");

const rollBtn = document.querySelector("#rollBtn");
const holdBtn = document.querySelector("#holdBtn");
const diceFace = document.querySelector("#diceFace");

const p1Score = document.querySelector("#p1Score");
const p1Current = document.querySelector("#p1Current");
const p1Box = document.querySelector("#p1box");
const p2Score = document.querySelector("#p2Score");
const p2Current = document.querySelector("#p2Current");
const p2Box = document.querySelector("#p2Box");

const newGamePlus = document.querySelector("#newGamePlus");
const andTheWinner = document.querySelector("#andTheWinner");

let removeAddClass = (vanish, appear) => {
  vanish.classList.remove("d-block");
  vanish.classList.add("d-none");
  appear.classList.remove("d-none");
  appear.classList.add("d-block");
};
// Start Game
startGame.addEventListener("click", function () {
  removeAddClass(startPannel, formPannel);
});

// Check and change players name

formPannel.addEventListener("submit", handleSubmit);

function handleSubmit(e) {
  e.preventDefault();
  checkName();
}

function checkName() {
  inputs.forEach((input) => {
    if (input.value === "" || input.value == null || input.value.length > 10) {
      input.classList.remove("is-valid");
      input.classList.add("is-invalid");
      input.nextElementSibling.style.display = "block";
    } else {
      input.nextElementSibling.style.display = "none";
      input.classList.remove("is-invalid");
      input.classList.add("is-valid");
    }
  });
  if (
    p1Input.classList.contains("is-valid") &&
    p2Input.classList.contains("is-valid")
  ) {
    removeAddClass(formPannel, buttonGamePanel);
    changeName(p1Input, p1Name);
    changeName(p2Input, p2Name);
    newGame();
  }
}

function changeName(input, name) {
  name.textContent = input.value;
}

function newGame() {
  p1Score.textContent = 0;
  p1Current.textContent = 0;
  p2Score.textContent = 0;
  p2Current.textContent = 0;
  scorePlayer1 = 0;
  scorePlayer2 = 0;
  currentPlayer = "player1";
}

// Game

let roll = 0;
let scorePlayer1 = 0;
let scorePlayer2 = 0;
let currentScoreP1 = 0;
let currentScoreP2 = 0;
let currentPlayer = "player1";

rollBtn.addEventListener("click", function () {
  roll = randomRoll();

  console.log(roll);
  turn(roll);
});

function randomRoll() {
  let score = Math.floor(Math.random() * (7 - 1)) + 1;
  changeDiceFace(score);
  return score;
}

function changeDiceFace(roll) {
  diceFace.src = "./ressource/image/Dice face/dado-" + roll + ".svg";
}

function turn(score) {
  if (currentPlayer === "player1") {
    if (score === 1) {
      currentScoreP1 = 0;
      p1Current.textContent = 0;
      changePlayer();
    } else {
      currentScoreP1 += score;
      p1Current.textContent = currentScoreP1;
    }
  } else {
    if (score === 1) {
      currentScoreP2 = 0;
      p2Current.textContent = 0;
      changePlayer();
    } else {
      currentScoreP2 += score;
      p2Current.textContent = currentScoreP2;
    }
  }
}

function changePlayer() {
  currentPlayer === "player1"
    ? (currentPlayer = "player2")
    : (currentPlayer = "player1");

  roll = 0;
}

holdBtn.addEventListener("click", function () {
  holdScore();
});

function holdScore() {
  if (currentPlayer === "player1") {
    scorePlayer1 += currentScoreP1;
    if (scorePlayer1 < 100) {
      p1Score.textContent = scorePlayer1;
      p1Current.textContent = 0;
      currentScoreP1 = 0;
      changePlayer();
    } else {
      p1Score.textContent = 100;
      endGame();
    }
  } else {
    scorePlayer2 += currentScoreP2;
    if (scorePlayer2 < 100) {
      p2Score.textContent = scorePlayer2;
      changePlayer();
      p2Current.textContent = 0;
      currentScoreP2 = 0;
    } else {
      p2Score.textContent = 100;
      endGame();
    }
  }
}

function endGame() {
  removeAddClass(buttonGamePanel, endGamePannel);
  if (scorePlayer1 < 100) {
    winnersName(p1Name);
  } else {
    winnersName(p2Name);
  }
}

function winnersName(winner) {
  andTheWinner.textContent = " " + winner.textContent + " a gagné la partie";
}

// END GAME PANEL

newGamePlus.addEventListener("click", function () {
  newGame();
  removeAddClass(endGamePannel, buttonGamePanel);
});
