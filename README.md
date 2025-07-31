# tic-tac-toe

# 🕹️ Tic Tac Toe (Modular JavaScript)

A browser-based Tic Tac Toe game built using **modular JavaScript**, with a focus on factory functions, the module pattern (IIFE), and separation of concerns. This project avoids global scope pollution and organizes the game using clean, reusable patterns.

---

## 🕹️ Features

- 2-player local game with customizable names and marks (e.g., X / O).
- Turn-based play with UI updates after each move.
- Automatic winner and draw detection with visual feedback.
- Disabled board interaction after game over.
- “Reset Game” button to start over with same players.

---

## 🚀 How to Play

1. Clone this repository.
2. Open `index.html` in your browser.
3. Enter player names — Player 1 uses X, and Player 2 uses O.
4. Click **Start Game**.
5. Click on any board square to place your mark.
6. Game ends automatically on a win or draw.
7. Click **Reset Game** to start over.

---

## ✅ Assignment Goals

- Set up your project with **HTML**, **CSS**, and **JavaScript** files.
- Initialize a **GitHub repository** for version control.
- Use a **modular architecture**:
  - Store the gameboard as an array inside a `Gameboard` object.
  - Store players as objects.
  - Control game flow via a `GameController` object.
- Minimize global code:
  - Wrap singleton logic like Gameboard and Screen in **IIFEs**.
  - Use **factory functions** for players and game instances.

---
