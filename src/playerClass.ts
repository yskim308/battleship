import { Gameboard } from "./gameboard";

enum PlayerStatus {
  player = "PLAYER",
  computer = "COMPUTER",
}
class Player {
  status: PlayerStatus;
  board: Gameboard;
  constructor(status: PlayerStatus) {
    this.status = status;
    this.board = new Gameboard(10);
  }
}
