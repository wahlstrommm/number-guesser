//game values
let min = 1,
  max = 10,
  winningNum = getRandomNum(min, max),
  guessesLeft = 3;

//UI Elements
const game = document.querySelector('#game'),
  minNum = document.querySelector('.min-num'),
  maxNum = document.querySelector('.max-num'),
  guessBtn = document.querySelector('#guess-btn'),
  guessInput = document.querySelector('#guess-input'),
  message = document.querySelector('.message');

//assing min and max num
minNum.textContent = min;
maxNum.textContent = max;

//play again event listner
game.addEventListener('mousedown', (e) => {
  if (e.target.className === 'play-again') {
    window.location.reload();
  }
});

//listen for guess

guessBtn.addEventListener('click', () => {
  let guess = parseInt(guessInput.value);

  //validate
  if (isNaN(guess) || guess < min || guess > max) {
    setMessage(`Please enter a number between ${min} and ${max}`, 'red');
  }
  //check if won
  if (guess === winningNum) {
    //game over won
    gameOver(true, `${winningNum} is correct!, YOU WIN!`);
  } else {
    //wrong number
    guessesLeft -= 1;
    if (guessesLeft === 0) {
      //game over lost
      gameOver(false, `Game over, you lost. The correct number was ${winningNum} `);
    } else {
      //game continues - answer wrong
      guessInput.style.borderColor = 'red';
      guessInput.value = '';
      setMessage(`${guess} not correct, ${guessesLeft} guesses left `, 'red');
    }
  }
});
//set message
function setMessage(msg, color) {
  message.style.color = color;
  message.textContent = msg;
}

//game over

function gameOver(won, msg) {
  let color;
  won === true ? (color = 'green') : (color = 'red');
  guessInput.disabled = true;
  guessInput.style.borderColor = color;
  message.style.color = color;
  setMessage(msg);

  guessBtn.value = 'Play again?';
  guessBtn.className += 'play-again';
}
//get winning num
function getRandomNum(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}
