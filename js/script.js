const buttons = document.querySelectorAll(".choice");
const resultText = document.getElementById("result-text");
const playerScoreSpan = document.getElementById("player-score");
const computerScoreSpan = document.getElementById("computer-score");
const playerImage = document.getElementById("player-image");
const computerImage = document.getElementById("computer-image");

let playerScore = 0;
let computerScore = 0;

buttons.forEach(button => {
  button.addEventListener("click", () => {
    const playerChoice = button.dataset.choice;
    const computerChoice = getComputerChoice();

    // Actualiza imágenes
    playerImage.src = `img/${playerChoice}.png`;
    computerImage.src = `img/${computerChoice}.png`;

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
    resultText.textContent = `🤝 Empate! Ambos eligieron ${player}`;
    resultText.style.color = "#FFD700";
  } else if (result === "jugador") {
    resultText.textContent = `🎉 Ganaste! ${capitalize(player)} vence a ${computer}`;
    resultText.style.color = "#00FF7F";
  } else {
    resultText.textContent = `💀 Perdiste! ${capitalize(computer)} vence a ${player}`;
    resultText.style.color = "#FF6347";
  }

  playerScoreSpan.textContent = playerScore;
  computerScoreSpan.textContent = computerScore;

  // Animación
  computerImage.style.transform = "scale(1.2)";
  setTimeout(() => computerImage.style.transform = "scale(1)", 200);
}

function capitalize(word) {
  return word.charAt(0).toUpperCase() + word.slice(1);
}
