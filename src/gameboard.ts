import { Ship } from "./shipClass";

enum GridStatus {
  ship,
  hit,
  miss,
}

interface GridObject {
  shipPointer: Ship | null;
  status: GridStatus;
}

export class Gameboard {
  board: GridObject[][];
  constructor() {}
  placeShip(
    x: number,
    y: number,
    vertical: boolean,
    shipLength: number,
  ): void {}
  receiveAttack(x: number, y: number): GridStatus {
    return null;
  }
  gameOver(): void {}
}
