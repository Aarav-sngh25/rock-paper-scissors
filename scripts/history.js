export const gameHistory =
  JSON.parse(localStorage.getItem("gameHistory")) || [];

export function updateGameHistoryElem() {
  let historyArray = "";

  gameHistory.forEach((game) => {
    historyArray += `<p>Player Move: ${game.playerMove}</p>
      <p>Computer Move: ${game.computerMove}</p>
      <p>Result: ${game.result}</p>
      <p>-------------------------------------</p>`;
  });

  const historyElem = document.querySelector(".js-game-history");

  if (historyArray) {
    historyElem.innerHTML = `<div>Score History:-</div>${historyArray} <button class="clear-history-button js-clear-history-button">Clear History</button>`;

    document
      .querySelector(".js-clear-history-button")
      .addEventListener("click", clearGameHistory);
  } else {
    historyElem.innerHTML = "";
  }
}

function clearGameHistory() {
  gameHistory.length = 0;
  localStorage.removeItem("gameHistory");
  updateGameHistoryElem();
}
