const colorBox = document.querySelector('[data-testid="colorBox"]');
const colorOptions = document.querySelectorAll('[data-testid="colorOption"]');
const gameStatus = document.querySelector('[data-testid="gameStatus"]');
const scoreElement = document.querySelector('[data-testid="score"]');
const newGameButton = document.querySelector('[data-testid="newGameButton"]');

let score = 0;
let targetColor;

function getRandomColor() {
  const r = Math.floor(Math.random() * 256);
  const g = Math.floor(Math.random() * 256);
  const b = Math.floor(Math.random() * 256);
  return `rgb(${r}, ${g}, ${b})`;
}

function startNewGame() {
  score = 0;
  scoreElement.textContent = score;
  startNewRound();
}

function startNewRound() {
  targetColor = getRandomColor();
  colorBox.style.backgroundColor = targetColor;

  const colors = [targetColor];
  while (colors.length < 6) {
    const newColor = getRandomColor();
    if (!colors.includes(newColor)) {
      colors.push(newColor);
    }
  }

  colors.sort(() => Math.random() - 0.5);

  colorOptions.forEach((option, index) => {
    option.style.backgroundColor = colors[index];
    option.classList.remove("fade-out");
  });

  gameStatus.textContent = "";
  gameStatus.classList.remove("celebrate");
}

function handleGuess(guessedColor) {
  if (guessedColor === targetColor) {
    score++;
    scoreElement.textContent = score;
    gameStatus.textContent = "Correct!";
    gameStatus.classList.add("celebrate");
    setTimeout(startNewRound, 1500);
  } else {
    gameStatus.textContent = "Wrong! Try again.";
    const wrongOption = Array.from(colorOptions).find(
      (option) => option.style.backgroundColor === guessedColor
    );
    wrongOption.classList.add("fade-out");
  }
}

colorOptions.forEach((option) => {
  option.addEventListener("click", () => {
    handleGuess(option.style.backgroundColor);
  });
});

newGameButton.addEventListener("click", startNewGame);

startNewGame();
