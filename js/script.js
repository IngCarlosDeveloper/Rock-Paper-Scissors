/**
 * Maneja la lógica del juego Piedra, Papel o Tijeras.
 * Este script gestiona las elecciones del jugador y de la computadora,
 * actualiza las imágenes, muestra los resultados y lleva el conteo de los puntajes.
 */

const buttons = document.querySelectorAll(".choice");
const resultText = document.getElementById("result-text");
const playerScoreSpan = document.getElementById("player-score");
const computerScoreSpan = document.getElementById("computer-score");
const playerImage = document.getElementById("player-image");
const computerImage = document.getElementById("computer-image");

let playerScore = 0;
let computerScore = 0;

// Evento principal: escucha los clics de los botones de elección
buttons.forEach(button => {
  button.addEventListener("click", () => {
    const playerChoice = button.dataset.choice;
    const computerChoice = getComputerChoice();

    // Actualiza imágenes de elección
    playerImage.src = `img/${playerChoice}.png`;
    computerImage.src = `img/${computerChoice}.png`;

    const result = determineWinner(playerChoice, computerChoice);
    updateUI(result, playerChoice, computerChoice);
  });
});

/**
 * Devuelve una elección aleatoria para la computadora.
 *
 * @returns {string} - Una de las opciones posibles: "piedra", "papel" o "tijeras".
 *
 * Ejemplo:
 * >>> getComputerChoice()
 * "papel"
 */
function getComputerChoice() {
  const choices = ["piedra", "papel", "tijeras"];
  const randomIndex = Math.floor(Math.random() * 3);
  return choices[randomIndex];
}

/**
 * Determina el ganador de la ronda basándose en las elecciones del jugador y la computadora.
 *
 * @param {string} player - Elección del jugador ("piedra", "papel" o "tijeras").
 * @param {string} computer - Elección de la computadora ("piedra", "papel" o "tijeras").
 * @returns {string} - "jugador" si gana el jugador, "computadora" si gana la computadora o "empate" si hay igualdad.
 *
 * Efectos secundarios:
 * - Incrementa el puntaje del jugador o de la computadora según el resultado.
 *
 * Ejemplo:
 * >>> determineWinner("piedra", "tijeras")
 * "jugador"
 */
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

/**
 * Actualiza la interfaz gráfica con los resultados de la ronda.
 *
 * @param {string} result - Resultado de la partida: "jugador", "computadora" o "empate".
 * @param {string} player - Elección del jugador.
 * @param {string} computer - Elección de la computadora.
 *
 * Efectos secundarios:
 * - Modifica el texto del resultado.
 * - Cambia el color del texto según el resultado.
 * - Actualiza los puntajes mostrados.
 * - Aplica una animación a la imagen de la computadora.
 *
 * Ejemplo:
 * >>> updateUI("jugador", "papel", "piedra")
 * // Muestra "🎉 Ganaste! Papel vence a piedra" y actualiza los puntajes.
 */
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

  // Animación al mostrar la elección de la computadora
  computerImage.style.transform = "scale(1.2)";
  setTimeout(() => computerImage.style.transform = "scale(1)", 200);
}

/**
 * Convierte la primera letra de una palabra en mayúscula.
 *
 * @param {string} word - Palabra a capitalizar.
 * @returns {string} - Palabra con la primera letra en mayúscula.
 *
 * Ejemplo:
 * >>> capitalize("piedra")
 * "Piedra"
 */
function capitalize(word) {
  return word.charAt(0).toUpperCase() + word.slice(1);
}
