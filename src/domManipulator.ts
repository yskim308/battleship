import { Player, PlayerStatus } from "./playerClass";
import { GridStatus } from "./gameboard";
import hit from "./img/nuke.png";
import miss from "./img/crosshairs-question.png";
import ship from "./img/ferry.png";

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
      gridObjectDiv.classList.add("h-12", "w-12", "border", "border-red");
      gridObjectDiv.dataset.row = `${i}`;
      gridObjectDiv.dataset.col = `${j}`;
      let status: GridStatus = player.board.board[i][j].status;
      const imageDiv = document.createElement("img");
      if (status == GridStatus.ship) {
        imageDiv.src = ship;
      } else if (status == GridStatus.hit) {
        imageDiv.src = hit;
      } else if (status == GridStatus.miss) {
        imageDiv.src = miss;
      }
      gridObjectDiv.appendChild(imageDiv);
      board.appendChild(gridObjectDiv);
    }
  }
}
