const gameArea = document.getElementById('game-area');
const scoreDisplay = document.getElementById('score');
const gameOverText = document.getElementById('game-over');

let score = 0;
let bug = null;
let gameInterval;

function createBug() {
  if (bug) {
  bug.remove(); // just remove the old bug
}


  bug = document.createElement('div');
  bug.classList.add('bug');

  // Random position inside the game area
  const x = Math.random() * (gameArea.clientWidth - 50);
  const y = Math.random() * (gameArea.clientHeight - 50);
  bug.style.left = `${x}px`;
  bug.style.top = `${y}px`;

  bug.addEventListener('click', () => {
    score++;
    scoreDisplay.textContent = score;
    bug.remove();
    bug = null;
  });

  gameArea.appendChild(bug);
}

function startGame() {
  gameInterval = setInterval(createBug, 1000); // New bug every second
}

function endGame() {
  clearInterval(gameInterval);
  if (bug) bug.remove();
  gameOverText.style.display = 'block';
}

startGame();
