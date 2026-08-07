let score = JSON.parse(localStorage.getItem('score')) || { wins: 0,
        losses: 0,
        ties: 0}
        
updateScoreElem();

  /*if(!score) {
    score = {
      wins: 0,
      losses: 0,
      ties: 0
    };
  }*/

function scoreReset() {
  document.querySelector('.js-reset-confirm')
    .innerHTML = `<button class="reset-yes-confirm">Yes</button>
    <button class="reset-no-confirm">No</button>`

  
  document.querySelector('.reset-yes-confirm')
    .addEventListener('click', () => {
      score.wins = 0;
      score.losses = 0;
      score.ties = 0;

      localStorage.removeItem('score');

      if(isAutoPlaying === true) {
        autoPlayStop();
      }

      document.querySelector('.js-auto-play-speed').textContent = '';

      document.querySelector('.js-moves').innerHTML = '';

      document.querySelector('.js-result').innerHTML = '';

      document.querySelector('.js-reset-confirm').innerHTML = '';
      
      updateScoreElem();
      
      }
    )

  document.querySelector('.reset-no-confirm')
    .addEventListener('click', () => {
      document.querySelector('.js-reset-confirm').innerHTML = '';
    })
}

let userSpeed;
let isAutoPlaying = false;
let intervalId;

function autoPlay() {
  
  if(isAutoPlaying === true) {
    autoPlayStop()
    return;
  }

  let inputSpeedElem = document.querySelector('.js-enter-speed');

  if(!document.querySelector('.js-speed-value')) {
    inputSpeedElem.innerHTML = `<input class="js-speed-value" placeholder="Enter Speed">`;

    return;
  }

  userSpeed = Number(document.querySelector('.js-speed-value').value);

  if(!userSpeed) {
    return alert('Play speed cannot be blank!');
  }

  if(userSpeed === 0) {
    return alert("Speed cant't be zero")
  }
  if(!isAutoPlaying){
    document.querySelector('.js-auto-play-button').innerHTML = 'Stop Playing';
    let userSpeedMili = userSpeed * 1000;
    intervalId = setInterval(() => {
      const playerMove = pickCompMove();
      playGame(playerMove);
    }, userSpeedMili);
    isAutoPlaying = true;
    document.querySelector('.js-enter-speed').innerHTML = '';
  }

  document.querySelector('.js-auto-play-speed').textContent = `Auto play speed: ${userSpeed}`
};

function autoPlayStop() {
  document.querySelector('.js-enter-speed').innerHTML = '';
  clearInterval(intervalId);
  isAutoPlaying = false;
  document.querySelector('.js-auto-play-button').innerHTML = 'Auto Play';
};

//Click support
document.querySelector('.js-rock-button')
  .addEventListener('click', () => {playGame('rock')});

document.querySelector('.js-paper-button')
  .addEventListener('click', () => {playGame('paper')});

document.querySelector('.js-scissors-button')
  .addEventListener('click', () => {playGame('scissors')});

document.querySelector('.js-auto-play-button')
  .addEventListener('click', () => {autoPlay()});

document.querySelector('.js-reset-score-button')
  .addEventListener('click', () => {scoreReset()});

//Keyboard Support
document.body
  .addEventListener('keydown', (event) => {
    const key = event.key.toLowerCase();

    if(key === 'r') {
      playGame('rock');
    }

    if(key === 'p') {
      playGame('paper');
    }

    if(key === 's') {
      playGame('scissors');
    }

    if(key === 'a') {
      autoPlay();
    }

    if(key === 'delete') {
      scoreReset();
    }
  })

function playGame(playerMove) {
  const computerMove= pickCompMove();    
  
  let result = '';

  if (playerMove === 'scissors') {
    if (computerMove === 'rock'){
    result = 'You lose.';
    } else if (computerMove === 'paper'){
    result = 'You win.';
    } else if (computerMove === 'scissors'){
    result = 'Tie.'
    }

  } else if (playerMove === 'paper') {
      if (computerMove === 'rock'){
    result = 'You win.';
    } else if (computerMove === 'paper'){
      result = 'Tie.';
    } else if (computerMove === 'scissors'){
      result = 'You lose.'
    }

  } else if (playerMove === 'rock') {
      if (computerMove === 'rock'){
    result = 'Tie.';
    } else if (computerMove === 'paper'){
      result = 'You lose.';
    } else if (computerMove === 'scissors'){
      result = 'You win.'
    }
  }
  
  if (result === 'You win.') {
    score.wins ++ ;
  } else if (result === 'You lose.') {
    score.losses ++ ;
  } else if (result === 'Tie.') {
    score.ties ++ ;
  }

  updateScoreElem();

  localStorage.setItem('score', JSON.stringify(score));

  document.querySelector('.js-result').innerHTML = result;

  document.querySelector('.js-moves').innerHTML = (`You chose <img src="images/${playerMove}-emoji.png" class="move-icon"> the Computer chose <img src="images/${computerMove}-emoji.png" class="move-icon">`)
}

function updateScoreElem() {
  document.querySelector('.js-score').innerHTML = `Wins: ${score.wins}, Losses: ${score.losses}, Ties: ${score.ties}`
};

function pickCompMove() {
  const randomNumber = Math.random();
  
  let computerMove = '';

  if (randomNumber >= 0 && randomNumber < 1/3){
      computerMove = 'rock';
  } else if (randomNumber >= 1/3 && randomNumber < 2/3)
  {
  computerMove = 'paper';    
  } else {
  computerMove = 'scissors';    
  }
  return computerMove;
}