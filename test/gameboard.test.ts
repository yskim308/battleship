import { describe, expect, it, beforeEach } from "vitest";
import { Gameboard, GridStatus } from "../src/gameboard";

describe("gameboard testing", () => {
  let gameboard: Gameboard;

  beforeEach(() => {
    gameboard = new Gameboard(10);
  });

  describe("testing placeShip()", () => {
    it("should place in regular coordinates", () => {
      let placed: boolean = gameboard.placeShip(3, 4, true, 3);
      expect(placed).toBeTruthy();
      expect(gameboard.board[3][4].status).toBe(GridStatus.ship);
      expect(gameboard.board[4][4].status).toBe(GridStatus.ship);
      expect(gameboard.board[5][4].status).toBe(GridStatus.ship);
    });
    it("should place in vertical edges", () => {
      let placed: boolean = gameboard.placeShip(7, 6, true, 3);
      expect(placed).toBeTruthy();
      expect(gameboard.board[7][6].status).toBe(GridStatus.ship);
      expect(gameboard.board[8][6].status).toBe(GridStatus.ship);
      expect(gameboard.board[9][6].status).toBe(GridStatus.ship);
    });

    it("should fail in vertical out of bounds", () => {
      let placed: boolean = gameboard.placeShip(8, 3, true, 3);
      expect(placed).toBeFalsy();
      expect(gameboard.board[8][3].status).toBe(GridStatus.empty);
      expect(gameboard.board[9][3].status).toBe(GridStatus.empty);
    });
    it("should fail in exact vertical bounds", () => {
      let placed: boolean = gameboard.placeShip(8, 5, true, 3);
      expect(placed).toBeFalsy();
      expect(gameboard.board[7][5].status).toBe(GridStatus.empty);
      expect(gameboard.board[8][5].status).toBe(GridStatus.empty);
      expect(gameboard.board[9][5].status).toBe(GridStatus.empty);
    });

    it("should fail in horizontal out of bounds", () => {
      let placed: boolean = gameboard.placeShip(3, 8, false, 3);
      expect(placed).toBeFalsy();
      expect(gameboard.board[3][8].status).toBe(GridStatus.empty);
      expect(gameboard.board[3][9].status).toBe(GridStatus.empty);
    });

    it("should place in horizontal edges", () => {
      let placed: boolean = gameboard.placeShip(4, 7, false, 3);
      expect(placed).toBeTruthy();
      expect(gameboard.board[4][7].status).toBe(GridStatus.ship);
      expect(gameboard.board[4][8].status).toBe(GridStatus.ship);
      expect(gameboard.board[4][9].status).toBe(GridStatus.ship);
    });

    it("should fail if trying to place a ship where a ship already exists", () => {
      let firstPlaced: boolean = gameboard.placeShip(4, 4, true, 3);
      let secondPlaced: boolean = gameboard.placeShip(5, 3, false, 3);
      expect(firstPlaced).toBeTruthy();
      expect(secondPlaced).toBeFalsy();
    });
  });

  describe("testing receiving attacks", () => {
    it("should recieve hits normally", () => {
      let placed: boolean = gameboard.placeShip(2, 2, true, 3);
      let status: boolean = gameboard.receiveAttack(3, 2);
      expect(status).toBeTruthy;
      expect(gameboard.board[3][2].shipPointer.hp).toBe(2);
    });

    it("should miss if ship is not hit", () => {
      let status: boolean = gameboard.receiveAttack(8, 4);
      expect(status).toBeTruthy;
      expect(gameboard.board[8][4].status).toBe(GridStatus.miss);
    });

    it("should return null if coordinate are out of bounds", () => {
      let status: boolean = gameboard.receiveAttack(10, 10);
      expect(status).toBeFalsy;
    });

    it("should show that a ship is sunk when sunk with attacks", () => {
      let placed: boolean = gameboard.placeShip(2, 2, true, 3);
      let hit1 = gameboard.receiveAttack(2, 2);
      let hit2 = gameboard.receiveAttack(3, 2);
      let hit3 = gameboard.receiveAttack(4, 2);
      expect(gameboard.board[2][2].shipPointer.isSunk()).toBeTruthy();
      expect(gameboard.gameOver()).toBeTruthy();
    });
  });
});
