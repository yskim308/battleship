import "./styles.css";
import { Player, PlayerStatus } from "./playerClass";
import { Ship } from "./shipClass";
import { Gameboard } from "./gameboard";
import { updateGrid } from "./domManipulator";

function placeRandomShip(length: number, board: Gameboard) {
  let placed: boolean = false;
  while (!placed) {
    const randomRow: number = Math.floor(Math.random() * 10);
    const randomCol: number = Math.floor(Math.random() * 10);
    const randomOrientation: boolean = Math.random() < 0.5;
    placed = board.placeShip(randomRow, randomCol, randomOrientation, length);
  }
}

function waitClick() {
  // return promise for waiting for a click
}

async function playGame() {
  //main play function should return when game over
}
