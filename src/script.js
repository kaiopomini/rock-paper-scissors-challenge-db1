let score1 = 0;
let score2 = 0;
let currentPlayer = 1;
let player1Choice = "";
let player2Choice = "";
let playHistory = JSON.parse(localStorage.getItem("playHistory") || "[]");

const result = document.getElementById("result");
const score1Element = document.getElementById("score1");
const score2Element = document.getElementById("score2");
const continueButton = document.getElementById("continue");
const restartButton = document.getElementById("restart");
const historyButton = document.getElementById("history");

const player1Choices = document.querySelectorAll("#player1 .choice");
const player2Choices = document.querySelectorAll("#player2 .choice");

function playRound() {
  if (player1Choice === player2Choice) {
    showResult("Empate!");
    setPlayHistory(player1Choice, player2Choice, 0, 0);
    resetChoices();
    return;
  }

  const player1Wins =
    (player1Choice === "pedra" && player2Choice === "tesoura") ||
    (player1Choice === "tesoura" && player2Choice === "papel") ||
    (player1Choice === "papel" && player2Choice === "pedra");

  if (player1Wins) {
    score1++;
    showResult("Jogador 1 ganhou!");
    setPlayHistory(player1Choice, player2Choice, 1, 0)
  }

  if (!player1Wins) {
    score2++;
    showResult("Jogador 2 ganhou!");
    setPlayHistory(player1Choice, player2Choice, 0, 1)
  }

  updateScore();
  resetChoices();
}

function setPlayHistory(player1Choice, player2Choice, score1, score2) {
  const result = `Jogador 1: ${player1Choice} X Jogador 2: ${player2Choice} - Resultado: ${score1} X ${score2}`;

  playHistory.push(result);
  localStorage.setItem("playHistory", JSON.stringify(playHistory));
}

function getPlayHistory() {
  return JSON.parse(localStorage.getItem("playHistory") || "[]");
}

function clearPlayHistory() {
  playHistory = [];
  localStorage.setItem("playHistory", JSON.stringify(playHistory));
}

function updateScore() {
  score1Element.textContent = score1;
  score2Element.textContent = score2;
}

function showResult(message) {
  result.textContent = message;
}

function resetChoices() {
  player1Choice = "";
  player2Choice = "";
  currentPlayer = 1;
}

function disabledChoices(conditionPlayer1, conditionPlayer2) {
  player1Choices.forEach((choice) => {
    choice.disabled = conditionPlayer1
  });
  player2Choices.forEach((choice) => {
    choice.disabled = conditionPlayer2
  });
}

player1Choices.forEach((choice) => {
  disabledChoices(false, true)
  choice.addEventListener("click", () => {
    if (currentPlayer !== 1 || player1Choice) return;

    player1Choice = choice.dataset.choice;
    alert("Jogador 1 escolheu: " + player1Choice);
    currentPlayer = 2;
    disabledChoices(true, false);
  });
});

player2Choices.forEach((choice) => {
  choice.addEventListener("click", () => {
    if (currentPlayer !== 2 || player2Choice) return;

    player2Choice = choice.dataset.choice;
    alert("Jogador 2 escolheu: " + player2Choice);
    playRound();
    disabledChoices(true, true)
  });
});


continueButton.addEventListener("click", () => {
  resetChoices();
  disabledChoices(false, true)
  result.textContent = "";
});

restartButton.addEventListener("click", () => {
  score1 = 0;
  score2 = 0;
  resetChoices();
  disabledChoices(false, true)
  clearPlayHistory()
  updateScore();
  result.textContent = "";
});

historyButton.addEventListener("click", () => {
  const history = getPlayHistory()

  if (history.length > 0) {
    return alert(history.join("\n"))
  }

  return alert("Histórico vazio!");
});

updateScore();
