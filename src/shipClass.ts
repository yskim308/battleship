class Ship {
  length: number;
  hp: number;
  constructor(length: number) {
    this.length = length;
    this.hp = length;
  }

  hit() {
    if (!this.isSunk()) {
      this.hp--;
    }
  }

  isSunk() {
    if (this.hp < 1) {
      return true;
    } else {
      return false;
    }
  }
}

export { Ship };
