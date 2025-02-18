import { Player, PlayerStatus } from "./playerClass";
import { GridStatus } from "./gameboard";

export function updateGrid(player: Player): void {
  // assume the grid will always be of size 10
  const size = 10;
  let board: Element;
  if (player.status == PlayerStatus.player) {
    board = document.querySelector("#playerBoard");
  } else {
    board = document.querySelector("#computerBoard");
  }

  while (board.firstChild) {
    board.removeChild(board.firstChild);
  }

  for (let i = 0; i < 10; i++) {
    for (let j = 0; j < 10; j++) {
      const gridObjectDiv = document.createElement("div");
      gridObjectDiv.dataset.row = `${i}`;
      gridObjectDiv.dataset.col = `${j}`;
      gridObjectDiv.innerText = player.board.board[i][j].status;
      board.appendChild(gridObjectDiv);
    }
  }
}
