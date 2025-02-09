import { Ship } from "./shipClass";

export enum GridStatus {
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
  constructor(x: number) {}
  placeShip(
    x: number,
    y: number,
    vertical: boolean,
    shipLength: number,
  ): boolean {
    return true;
  }
  receiveAttack(x: number, y: number): GridStatus {
    return null;
  }
  gameOver(): void {}
}
