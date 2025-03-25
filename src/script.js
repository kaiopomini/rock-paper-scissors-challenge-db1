let score1 = 0;
let score2 = 0;

const choices = document.querySelectorAll(".choice");
const result = document.getElementById("result");
const score1Element = document.getElementById("score1");
const score2Element = document.getElementById("score2");
const continueButton = document.getElementById("continue");
const restartButton = document.getElementById("restart");

function playRound(player1Choice, player2Choice) {}

function updateScore() {
  score1Element.textContent = score1;
  score2Element.textContent = score2;
}

function showResult(message) {
  result.textContent = message;
}

choices.forEach((choice) => {
  choice.addEventListener("click", () => {});
});

continueButton.addEventListener("click", () => {});

restartButton.addEventListener("click", () => {});

updateScore();
