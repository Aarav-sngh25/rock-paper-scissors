import { gameHistory, updateGameHistoryElem } from "./history.js";
import { score, updateScoreElem } from "./score.js";

export function playGame(playerMove) {
  const computerMove = pickCompMove();

  const gameResult = {
    win: "You win.",
    loss: "You lose.",
    tied: "Tie.",
  };

  const computerMoveCheck = {
    rock: computerMove === "rock",
    paper: computerMove === "paper",
    scissors: computerMove === "scissors",
  };

  let result = "";

  if (playerMove === "scissors") {
    if (computerMoveCheck.rock) {
      result = gameResult.loss;
    } else if (computerMoveCheck.paper) {
      result = gameResult.win;
    } else if (computerMoveCheck.scissors) {
      result = gameResult.tied;
    }
  } else if (playerMove === "paper") {
    if (computerMoveCheck.rock) {
      result = gameResult.win;
    } else if (computerMoveCheck.paper) {
      result = gameResult.tied;
    } else if (computerMoveCheck.scissors) {
      result = gameResult.loss;
    }
  } else if (playerMove === "rock") {
    if (computerMoveCheck.rock) {
      result = gameResult.tied;
    } else if (computerMoveCheck.paper) {
      result = gameResult.loss;
    } else if (computerMoveCheck.scissors) {
      result = gameResult.win;
    }
  }

  if (result === gameResult.win) {
    score.wins++;
  } else if (result === gameResult.loss) {
    score.losses++;
  } else if (result === gameResult.tied) {
    score.ties++;
  }

  localStorage.setItem("score", JSON.stringify(score));

  gameHistory.push({
    playerMove,
    computerMove,
    result,
  });

  localStorage.setItem("gameHistory", JSON.stringify(gameHistory));

  updateScoreElem();
  updateGameHistoryElem();

  document.querySelector(".js-result").innerHTML = result;

  document.querySelector(".js-moves").innerHTML =
    `You chose <img src="images/${playerMove}-emoji.png" class="move-icon"> the Computer chose <img src="images/${computerMove}-emoji.png" class="move-icon">`;
}

export function pickCompMove() {
  const randomNumber = Math.random();

  let computerMove = "";

  if (randomNumber >= 0 && randomNumber < 1 / 3) {
    computerMove = "rock";
  } else if (randomNumber >= 1 / 3 && randomNumber < 2 / 3) {
    computerMove = "paper";
  } else {
    computerMove = "scissors";
  }
  return computerMove;
}
