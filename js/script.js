const buttons = document.querySelectorAll(".choice");
const resultText = document.getElementById("result-text");
const playerScoreSpan = document.getElementById("player-score");
const computerScoreSpan = document.getElementById("computer-score");

let playerScore = 0;
let computerScore = 0;

buttons.forEach(button => {
  button.addEventListener("click", () => {
    const playerChoice = button.dataset.choice;
    const computerChoice = getComputerChoice();
    const result = determineWinner(playerChoice, computerChoice);
    updateUI(result, playerChoice, computerChoice);
  });
});

function getComputerChoice() {
  const choices = ["piedra", "papel", "tijeras"];
  const randomIndex = Math.floor(Math.random() * 3);
  return choices[randomIndex];
}

function determineWinner(player, computer) {
  if (player === computer) return "empate";

  if (
    (player === "piedra" && computer === "tijeras") ||
    (player === "papel" && computer === "piedra") ||
    (player === "tijeras" && computer === "papel")
  ) {
    playerScore++;
    return "jugador";
  } else {
    computerScore++;
    return "computadora";
  }
}

function updateUI(result, player, computer) {
  if (result === "empate") {
    resultText.textContent = `Empate! Ambos eligieron ${player}`;
  } else if (result === "jugador") {
    resultText.textContent = `Ganaste! ${capitalize(player)} vence a ${computer}`;
  } else {
    resultText.textContent = `Perdiste! ${capitalize(computer)} vence a ${player}`;
  }

  playerScoreSpan.textContent = playerScore;
  computerScoreSpan.textContent = computerScore;
}

function capitalize(word) {
  return word.charAt(0).toUpperCase() + word.slice(1);
}
