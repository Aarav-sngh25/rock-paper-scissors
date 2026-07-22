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
         score.wins = 0;
        score.losses = 0;
        score.ties = 0;
        localStorage.removeItem('score');
        updateScoreElem();
       
      }

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

      function updateScoreElem () {
        document.querySelector('.js-score').innerHTML = `Wins: ${score.wins}, Losses: ${score.losses}, Ties: ${score.ties}`};

      function pickCompMove() {
        const randomNumber = Math.random();
        
        let computerMove = '';

        if (randomNumber >= 0 && randomNumber < 1/3){
            computerMove = 'rock';
        } else if (randomNumber >= 1/3 && randomNumber < 2/3)
        {
        computerMove = 'paper';    
        } else{
        computerMove = 'scissors';    
        }
        return computerMove;
        }