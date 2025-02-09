import { describe, expect, it, beforeEach } from "vitest";
import { Gameboard, GridStatus } from "../src/gameboard";

describe("gameboard testing", () => {
  let gameboard: Gameboard;

  beforeEach(() => {
    gameboard = new Gameboard(10);
  });

  describe("testing placeShip()", () => {
    it("should place in regular coordinates", () => {
      let placed: boolean = gameboard.placeShip(3, 4, true, 2);
      expect(placed).toBeTruthy();
      expect(gameboard.board[3][4].status).toBe(GridStatus.ship);
      expect(gameboard.board[4][4].status).toBe(GridStatus.ship);
      expect(gameboard.board[5][4].status).toBe(GridStatus.ship);
    });
    it("should fail in vertical out of bounds", () => {
      let placed: boolean = gameboard.placeShip(8, 3, true, 3);
      expect(placed).toBeFalsy();
      expect(gameboard.board[8][3].status).toBe(null);
      expect(gameboard.board[9][3].status).toBe(null);
    });

    it("should fail in horizontal out of bounds", () => {
      let placed: boolean = gameboard.placeShip(3, 8, false, 3);
      expect(placed).toBeFalsy();
      expect(gameboard.board[3][8]).toBe(null);
      expect(gameboard.board[3][9]).toBe(null);
    });
  });

  describe("testing receiving attacks", () => {
    it("should recieve hits normally", () => {
      let placed: boolean = gameboard.placeShip(2, 2, true, 3);
      let status: GridStatus = gameboard.receiveAttack(2, 3);
      expect(status).toBe(GridStatus.hit);
      expect(gameboard.board[2][3].shipPointer.hp).toBe(2);
    });

    it("should miss if ship is not hit", () => {
      let status: GridStatus = gameboard.receiveAttack(8, 4);
      expect(status).toBe(GridStatus.miss);
      expect(gameboard.board[8][4].status).toBe(GridStatus.miss);
    });
  });
});
