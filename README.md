# Battleship Game

This project implements a classic Battleship game in TypeScript.

the live preview can be found [[here]](https://yskim308.github.io/battleship/)

## Project Structure

The project is structured into several TypeScript files, each responsible for specific aspects of the game:

### `main.ts`

This is the main entry point of the application. It initializes the game, manages the game loop, and handles user interactions.

*   **`getRandomCoordinates()`:** Generates random coordinates (row and column) for placing ships.
*   **`placeRandomShip(length, board)`:** Places a ship of a given length randomly on the game board.
*   **`fillBoard(board)`:** Places all ships of predefined lengths (2, 3, 3, 4, 5) randomly on the given game board.
*   **`waitClick()`:** Returns a Promise that resolves with the coordinates of the cell clicked on the computer's board. Used for player attacks.
*   **`playGame(player, computer, signal)`:** The main game loop. Handles player and computer turns, checks for game over, and updates the UI.  Uses an `AbortController` to allow game resets.
*   **`createGame()`:** Initializes the player and computer objects, fills their boards, updates the grid display, and starts the game.  Also sets up the restart button event listener.
*   **`resetGame()`:** Resets the game state, including aborting the current game loop, creating new players and boards, and restarting the game.

### `playerClass.ts`

Defines the `Player` class and the `PlayerStatus` enum.

*   **`PlayerStatus`:** Enum defining whether the player is a human or the computer.
*   **`Player`:** Class representing a player. Contains the player's status (`player` or `computer`) and their game board (`Gameboard` object).

### `gameboard.ts`

Defines the `Gameboard` class, which manages the game board state, and the `GridStatus` enum.

*   **`GridStatus`:** Enum representing the status of a grid cell (empty, ship, hit, miss).
*   **`GridObject`:** Interface defining the structure of an object within the gameboard grid, including a pointer to a `Ship` object and its `GridStatus`.
*   **`Gameboard`:** Class representing the game board. Contains a 2D array of `GridObject`s.
    *   **`hasOverlap(x, y, vertical, length)`:** Checks if placing a ship at the given coordinates and orientation would overlap with an existing ship.
    *   **`placeShip(x, y, vertical, shipLength)`:** Places a ship of the given length on the board at the specified coordinates and orientation. Returns `true` if successful, `false` otherwise (e.g., out of bounds, overlap).
    *   **`receiveAttack(x, y)`:** Handles an attack on the board at the given coordinates. Updates the grid cell status and the ship's hit points. Returns `true` if the attack was valid, `false` otherwise.
    *   **`gameOver()`:** Checks if all ships have been sunk.

### `domManipulator.ts`

Handles all DOM manipulation, updating the game board display and other UI elements.

*   **`updateGrid(player)`:** Updates the HTML grid to reflect the current state of the given player's game board.
*   **`updateCell(player, row, col)`:** Updates the display of a specific cell on the game board.
*   **`updateTurn(playerTurn)`:** Updates the UI to indicate whose turn it is.

### `shipClass.ts`

Defines the `Ship` class.

*   **`Ship`:** Class representing a ship. Contains the ship's length and hit points.
    *   **`hit()`:** Decreases the ship's hit points.
    *   **`isSunk()`:** Checks if the ship has been sunk (hit points are zero).
