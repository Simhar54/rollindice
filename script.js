const startPannel = document.querySelector("#startPannel");
const startGame = document.querySelector("#startGame");
const formPannel = document.querySelector("#formPannel");
const buttonGamePanel = document.querySelector("#buttonGamePanel");
const endGamePannel = document.querySelector("#endGamePannel");
const validate = document.querySelector("#validate");

const inputs = document.querySelectorAll("input");

const rollBtn = document.querySelector("#rollBtn");
const holdBtn = document.querySelector("#holdBtn");
const diceFace = document.querySelector("#diceFace");

const newGamePlus = document.querySelector("#newGamePlus");
const andTheWinner = document.querySelector("#andTheWinner");

const scoreTotal = [p1Score, p2Score];
const scoreCurrent = [p1Current, p2Current];

const player1 = {
  playerInput: document.querySelector("#p1Input"),
  playerName: document.querySelector("#p1Name"),
  playerScore: document.querySelector("#p1Score"),
  playerCurrentScore: document.querySelector("#p1Current"),
  playerBox: document.querySelector("#p1Box"),
  currentScore: 0,
  scoreTotal: 0,
};

const player2 = {
  playerInput: document.querySelector("#p2Input"),
  playerName: document.querySelector("#p2Name"),
  playerScore: document.querySelector("#p2Score"),
  playerCurrentScore: document.querySelector("#p2Current"),
  playerBox: document.querySelector("#p2Box"),
  currentScore: 0,
  scoreTotal: 0,
};

const players = [player1, player2];

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
  )
    players.forEach((player) => {
      player.playerName.textContent = player.playerInput.value;
    });
  newGame();
  removeAddClass(formPannel, buttonGamePanel);
}

function newGame() {
  player1.playerScore.textContent = 0;
  player1.playerCurrentScore.textContent = 0;
  player2.playerScore.textContent = 0;
  player2.playerCurrentScore.textContent = 0;
  player1.scoreTotal = 0;
  player2.scoreTotal = 0;
  currentPlayer = player1;
}

// Game
let currentPlayer = 1;
let roll = 0;

rollBtn.addEventListener("click", function () {
  roll = randomRoll();
  console.log(roll);
  turn(roll, currentPlayer);
});

function randomRoll() {
  let score = Math.floor(Math.random() * (7 - 1)) + 1;
  changeDiceFace(score);
  return score;
}

function changeDiceFace(roll) {
  diceFace.src = "./ressource/image/Dice face/dado-" + roll + ".svg";
}

function turn(score, player) {
  if (score === 1) {
    player.currentScore = 0;
    player.playerCurrentScore.textContent = 0;
    changePlayer();
  } else {
    player.currentScore += score;
    player.playerCurrentScore.textContent = player.currentScore;
  }
}

function changePlayer() {
  currentPlayer = currentPlayer === player1 ? player2 : player1;

  roll = 0;
}

holdBtn.addEventListener("click", function () {
  holdScore(currentPlayer);
});

function holdScore(player) {
  player.scoreTotal += player.currentScore;
  console.log(player.currentScore);
  console.log(player.scoreTotal);
  if (player.scoreTotal < 100) {
    player.playerScore.textContent = player.scoreTotal;
    player.playerCurrentScore.textContent = 0;
    player.currentScore = 0;
    changePlayer();
  } else {
    player.playerScore.textContent = 100;
    endGame(player);
  }
}

function endGame(player) {
  removeAddClass(buttonGamePanel, endGamePannel);
  winnersName(player.playerName);
}

function winnersName(winner) {
  andTheWinner.textContent = " " + winner.textContent + " a gagné la partie! ";
}

// END GAME PANEL

newGamePlus.addEventListener("click", function () {
  newGame();
  removeAddClass(endGamePannel, buttonGamePanel);
});

// ANIMATION AND SOUND FUNCTION

function hide(div) {
  div.classList.remove("d-block");
  div.classList.add("d-none");
}

function show(div) {
  div.classList.remove("d-none");
  div.classList.add("d-block");
}

let removeAddClass = (vanish, appear) => {
  hide(vanish);
  show(appear);
};
