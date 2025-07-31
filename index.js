const Gameboard = () => {
  let board = Array(9).fill(null);

  const getBoard = () => [...board];

  const setCell = (index, mark) => {
    if (board[index] === null) {
      board[index] = mark;
      return true;
    }
    return false;
  };

  const resetBoard = () => {
    board = Array(9).fill(null);
  };

  return {
    getBoard,
    setCell,
    resetBoard,
  };
};

const GameController = (
  playerOneName = "Player 1",
  playerTwoName = "Player 2"
) => {
  const board = Gameboard();
  const players = [
    { name: playerOneName, mark: "X" },
    { name: playerTwoName, mark: "O" },
  ];

  let activePlayer = players[0];
  let gameOver = false;

  const winningCombos = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];

  const switchPlayers = () => {
    activePlayer = activePlayer === players[0] ? players[1] : players[0];
  };

  const getActivePlayer = () => activePlayer;
  const isGameOver = () => gameOver;

  const checkWinner = () => {
    const cell = board.getBoard();
    return winningCombos.find(
      ([a, b, c]) => cell[a] && cell[a] === cell[b] && cell[a] === cell[c]
    );
  };

  const isDraw = () => !board.getBoard().includes(null);

  const playRound = (index) => {
    if (gameOver) return;

    const success = board.setCell(index, activePlayer.mark);
    if (!success) return;

    const winner = checkWinner();

    if (winner) {
      gameOver = true;
      ScreenController.displayMessage(`${activePlayer.name} wins!`);
      ScreenController.showResetButton();
      return;
    }

    if (isDraw()) {
      gameOver = true;
      ScreenController.displayMessage(`It's a draw!`);
      ScreenController.showResetButton();
      return;
    }

    switchPlayers();
    ScreenController.updateScreen();
  };

  const resetGame = () => {
    board.resetBoard();
    activePlayer = players[0];
    gameOver = false;
    ScreenController.updateScreen();
    ScreenController.displayMessage(`${activePlayer.name}'s turn...`);
  };

  return {
    playRound,
    getActivePlayer,
    isGameOver,
    resetGame,
    getBoard: board.getBoard,
  };
};

const ScreenController = (() => {
  let game;

  const startBtn = document.getElementById("startGameBtn");
  const resetBtn = document.getElementById("resetGameBtn");
  const playerTurnDiv = document.getElementById("player-info");
  const boardDiv = document.getElementById("game");

  const updateScreen = () => {
    boardDiv.innerHTML = "";
    const board = game.getBoard();
    const activePlayer = game.getActivePlayer();

    board.forEach((cell, index) => {
      const cellBtn = document.createElement("button");
      cellBtn.classList.add("cell");
      cellBtn.dataset.cell = index;
      cellBtn.textContent = cell || "";
      cellBtn.disabled = cell !== null || game.isGameOver();
      boardDiv.appendChild(cellBtn);
    });

    if (!game.isGameOver()) {
      displayMessage(`${activePlayer.name}'s turn...`);
    }
  };

  const handleClickStartBtn = () => {
    const playerOneName =
      document.getElementById("playerOneName").value || "Player 1";
    const playerTwoName =
      document.getElementById("playerTwoName").value || "Player 2";

    game = GameController(playerOneName, playerTwoName);
    updateScreen();
    hideResetButton();
  };

  const handleClickBoard = (e) => {
    const selectedCell = parseInt(e.target.dataset.cell);
    if (isNaN(selectedCell)) return;

    game.playRound(selectedCell);
    updateScreen();
  };

  const handleClickReset = () => {
    game.resetGame();
    hideResetButton();
  };

  const displayMessage = (msg) => {
    playerTurnDiv.textContent = msg;
  };

  const showResetButton = () => {
    resetBtn.style.display = "inline-block";
  };

  const hideResetButton = () => {
    resetBtn.style.display = "none";
  };

  // Event Listeners
  startBtn.addEventListener("click", handleClickStartBtn);
  boardDiv.addEventListener("click", handleClickBoard);
  resetBtn.addEventListener("click", handleClickReset);

  return {
    updateScreen,
    displayMessage,
    showResetButton,
    hideResetButton,
  };
})();
