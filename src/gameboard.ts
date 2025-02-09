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
  private numberOfShips: number;
  private gridSize: number;
  constructor(size: number) {
    // initialize 2d array for size
    this.board = [];
    this.gridSize = size;
    for (let i = 0; i < size; i++) {
      this.board[i] = [];
      for (let j = 0; j < size; j++) {
        this.board[i][j] = null;
      }
    }
  }
  private hasOverlap(
    x: number,
    y: number,
    vertical: boolean,
    length: number,
  ): boolean {
    for (let i = 0; i < length; i++) {
      if (vertical) {
        if (this.board[x + i][y].status != null) return true;
      } else {
        if (this.board[x][y + i].status != null) return true;
      }
    }
    return false;
  }
  placeShip(
    x: number,
    y: number,
    vertical: boolean,
    shipLength: number,
  ): boolean {
    let shipToPlace = new Ship(shipLength);
    let outOfBounds = vertical
      ? x + shipLength > this.gridSize
      : y + shipLength > this.gridSize;

    if (outOfBounds) return false;
    if (this.hasOverlap(x, y, vertical, shipLength)) return false;
    for (let i = 0; i < shipLength; i++) {
      let xCord = vertical ? x + i : x;
      let yCord = !vertical ? y + i : y;
      this.board[xCord][yCord] = {
        shipPointer: shipToPlace,
        status: GridStatus.ship,
      };
    }
    this.numberOfShips++;
    return true;
  }

  receiveAttack(x: number, y: number): GridStatus {
    if (x > this.gridSize || y > this.gridSize || x < 0 || y < 0) return null;
    if (this.board[x][y].status == GridStatus.hit) return null;

    if (this.board[x][y].status == GridStatus.ship) {
      this.board[x][y].status = GridStatus.hit;
      this.board[x][y].shipPointer.hit();
      if (this.board[x][y].shipPointer.isSunk()) this.numberOfShips--;
    } else if (this.board[x][y].shipPointer == null) {
      this.board[x][y].status == GridStatus.miss;
    }
  }
  gameOver(): boolean {
    // assuming that receieve attack will only be called AFTER ships are placed
    if (this.numberOfShips == 0) return true;
    return false;
  }
}
