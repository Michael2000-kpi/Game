class GameBoard {
  constructor(size) {
    this.size = size;
    this.board = this.Game_Field(size);
    this.hasWon = false;
    this.startTime = Date.now();
    this.renderGame();
  }
  Game_Field(size) {
    const board = [];
    for (let i = 0; i < size; i++) {
      const row = [];
      for (let j = 0; j < size; j++) {
        row.push(this.randomTile());
      }
      board.push(row);
    }
    return board;
  }
  randomTile() {
    const elements = ["A", "B", "C", "D", "E"];
    return elements[Math.floor(Math.random() * elements.length)];
  }
  renderGame() {
    const boardElement = document.getElementById("game-board");
    boardElement.innerHTML = "";

    this.board.forEach((row, rowIndex) => {
      row.forEach((cell, colIndex) => {
        const cellElement = document.createElement("div");
        cellElement.className = "cell";
        cellElement.textContent = cell;

        if (!this.hasWon) {
          cellElement.onclick = () => this.EraseC(rowIndex, colIndex);
        }
        boardElement.appendChild(cellElement);
      });
    });
  }
  EraseC(row, col) {
    const target = this.board[row][col];
    const visited = new Set();
    this.smartDFS(row, col, target, visited);

    if (this.checkWin()) {
      this.hasWon = true;
      const elapsedSeconds = Math.floor((Date.now() - this.startTime) / 1000);
      alert(`You Win! Game lasted ${elapsedSeconds} seconds.`);
    }

    this.renderGame();
  }
  smartDFS(row, col, target, visited) {
    if (row < 0 || col < 0 || row >= this.size || col >= this.size) return;
    if (visited.has(`${row},${col}`)) return;
    if (this.board[row][col] !== target) return;
    visited.add(`${row},${col}`);
    this.board[row][col] = null;

    const directions = [
      [-1, 0],
      [1, 0],
      [0, -1],
      [0, 1],
    ];

    for (let [dx, dy] of directions) {
      this.smartDFS(row + dx, col + dy, target, visited);
    }
  }

  checkWin() {
    return this.board.every((row) => row.every((cell) => cell === null));
  }
}

const gameBoard = new GameBoard(10);
