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
      gridObjectDiv.classList.add(
        "h-12",
        "w-12",
        "border",
        "border-red",
        "hover:bg-red-100",
      );
      gridObjectDiv.dataset.row = `${i}`;
      gridObjectDiv.dataset.col = `${j}`;
      let status: GridStatus = player.board.board[i][j].status;
      const imageDiv = document.createElement("img");
      imageDiv.style.pointerEvents = "none";
      let isPlayer: boolean =
        player.status === PlayerStatus.player ? true : false;
      if (status == GridStatus.ship && isPlayer) {
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

export function updateTurn(playerTurn: boolean): void {
  const informationDiv = document.querySelector("#information");
  const spinner = document.querySelector("#spinner");
  if (playerTurn) {
    informationDiv.classList.remove("hidden");
    spinner.classList.add("hidden");
  } else {
    informationDiv.classList.add("hidden");
    spinner.classList.remove("hidden");
  }
}
