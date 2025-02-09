import { describe, it, expect, beforeEach } from "vitest";
import { Ship } from "../src/shipClass";

describe("shipClass testing", () => {
  let carrier: Ship;

  beforeEach(() => {
    carrier = new Ship(5);
  });

  it("should initialize properly", () => {
    expect(carrier.hp).toBe(5);
    expect(carrier.length).toBe(5);
  });

  it("should be able to take damage", () => {
    carrier.hit();
    carrier.hit();
    expect(carrier.hp).toBe(3);
  });

  it("should sink after 5 hits", () => {
    for (let i = 0; i < 5; i++) {
      carrier.hit();
    }
    expect(carrier.hp).toBe(0);
    expect(carrier.isSunk).toBeTruthy();
  });
});
