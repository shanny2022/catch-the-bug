const startBtn = document.getElementById('start-btn');
const restartBtn = document.getElementById('restart-btn');
const gameArea = document.getElementById('game-area');
const scoreDisplay = document.getElementById('score');
const timeDisplay = document.getElementById('time');
const gameOverText = document.getElementById('game-over');

let score = 0;
let timeLeft = 30;
let bug = null;
let gameInterval;
let timerInterval;

// Load sound files
const catchSound = new Audio('catch.mp3');
const gameOverSound = new Audio('gameover.mp3');

// Start button
startBtn.addEventListener('click', () => {
  startBtn.style.display = 'none';
  gameArea.style.display = 'block';
  document.querySelectorAll('p').forEach(p => p.style.display = 'block');
  startGame();
});

// Restart button
document.addEventListener('click', (event) => {
  if (event.target.id === 'restart-btn') {
    gameOverSound.play(); // Play only after user interaction
    startGame();
  }
});

function createBug() {
  if (bug) bug.remove();

  bug = document.createElement('div');
  bug.classList.add('bug');

  const x = Math.random() * (gameArea.clientWidth - 50);
  const y = Math.random() * (gameArea.clientHeight - 50);
  bug.style.left = `${x}px`;
  bug.style.top = `${y}px`;

  bug.addEventListener('click', () => {
    score++;
    scoreDisplay.textContent = score;
    catchSound.play();
    bug.remove();
    bug = null;

    if (score % 10 === 0) {
      clearInterval(gameInterval);
      let newSpeed = Math.max(300, 1000 - (score * 20));
      gameInterval = setInterval(createBug, newSpeed);
    }
  });

  gameArea.appendChild(bug);
}

function startGame() {
  timeLeft = 30;
  score = 0;
  scoreDisplay.textContent = score;
  timeDisplay.textContent = timeLeft;
  gameOverText.style.display = 'none';
  gameArea.style.display = 'block';

  clearInterval(gameInterval);
  clearInterval(timerInterval);

  gameInterval = setInterval(createBug, 1000);

  timerInterval = setInterval(() => {
    timeLeft--;
    timeDisplay.textContent = timeLeft;
    if (timeLeft <= 0) {
      endGame();
    }
  }, 1000);
}

function endGame() {
  clearInterval(gameInterval);
  clearInterval(timerInterval);
  if (bug) bug.remove();
  gameOverText.style.display = 'block';
  gameArea.style.display = 'none';
}


