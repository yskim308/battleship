import { Gameboard } from "./gameboard";

export enum PlayerStatus {
  player = "PLAYER",
  computer = "COMPUTER",
}
export class Player {
  status: PlayerStatus;
  board: Gameboard;
  constructor(status: PlayerStatus) {
    this.status = status;
    this.board = new Gameboard(10);
  }
}
