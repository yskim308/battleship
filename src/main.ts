import "./styles.css";
import { Player, PlayerStatus } from "./playerClass";
import { Ship } from "./shipClass";
import { Gameboard } from "./gameboard";
import { updateGrid, updateTurn } from "./domManipulator";

function getRandomCoordinates(): { row: number; col: number } {
  const randomRow: number = Math.floor(Math.random() * 10);
  const randomCol: number = Math.floor(Math.random() * 10);
  return { row: randomRow, col: randomCol };
}

function placeRandomShip(length: number, board: Gameboard) {
  let placed: boolean = false;
  while (!placed) {
    const cord: { row: number; col: number } = getRandomCoordinates();
    const randomOrientation: boolean = Math.random() < 0.5;
    placed = board.placeShip(cord.row, cord.col, randomOrientation, length);
  }
}

function fillBoard(board: Gameboard) {
  // should be lenghts of 2, 3, 3, 4, 5
  placeRandomShip(2, board);
  placeRandomShip(3, board);
  placeRandomShip(3, board);
  placeRandomShip(4, board);
  placeRandomShip(5, board);
}

function waitClick(): Promise<{ row: number; col: number }> {
  return new Promise((resolve) => {
    const board = document.querySelector("#computerBoard");
    const handleClick = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      // Check if we clicked on a grid cell
      if (target.dataset.row && target.dataset.col) {
        // Remove the event listener to prevent multiple triggers
        board.removeEventListener("click", handleClick);
        // Resolve with the row and column data
        resolve({
          row: parseInt(target.dataset.row),
          col: parseInt(target.dataset.col),
        });
      }
    };
    // Add click listener to the board (using event delegation)
    board.addEventListener("click", handleClick);
  });
}

async function playGame(player: Player, computer: Player) {
  //main play function should return when game over
  let playerTurn: boolean = true;
  let gameOver: boolean = false;

  while (!gameOver) {
    if (playerTurn) {
      updateTurn(playerTurn);
      let validAttack = false;
      while (!validAttack) {
        let coordinates: { row: number; col: number } = await waitClick();
        validAttack = computer.board.receiveAttack(
          coordinates.row,
          coordinates.col,
        );
      }
      playerTurn = false;
      updateGrid(computer);
      gameOver = computer.board.gameOver();
    } else {
      updateTurn(playerTurn);
      let validAttack = false;
      while (!validAttack) {
        let coordinates: { row: number; col: number } = getRandomCoordinates();
        validAttack = player.board.receiveAttack(
          coordinates.row,
          coordinates.col,
        );
      }
      await new Promise((resolve) => setTimeout(resolve, 1000));
      playerTurn = true;
      updateGrid(player);
      gameOver = computer.board.gameOver();
    }
  }
}

let player, computer;
function createGame() {
  player = new Player(PlayerStatus.player);
  fillBoard(player.board);
  computer = new Player(PlayerStatus.computer);
  fillBoard(computer.board);
  updateGrid(player);
  updateGrid(computer);
  playGame(player, computer);

  // event listener for restarting the game
  const restartButton = document.querySelector("#restart");
  restartButton.addEventListener("click", resetGame);
}

function resetGame() {
  player = new Player(PlayerStatus.player);
  fillBoard(player.board);
  computer = new Player(PlayerStatus.computer);
  fillBoard(computer.board);
  updateGrid(player);
  updateGrid(computer);
  playGame(player, computer);
}

createGame();
