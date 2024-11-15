import React, { useState, useEffect, useCallback } from 'react';
import Board from './Board';
import Status from './Status';
import StartScreen from './StartScreen';
import '../styles/custom.css';
import '../styles/StartScreen.css';

const TicTacToe = () => {
  const [board, setBoard] = useState(Array(9).fill(null));
  const [isXNext, setIsXNext] = useState(true);
  const [gameOver, setGameOver] = useState(false);
  const [winner, setWinner] = useState(null);
  const [gameStarted, setGameStarted] = useState(false);

  const player = 'X';
  const aiPlayer = 'O';

  const startGame = () => {
    setGameStarted(true);
  };

  // Load saved game state
  useEffect(() => {
    const savedBoard = JSON.parse(localStorage.getItem('tic-tac-toe-board'));
    const savedIsXNext = JSON.parse(localStorage.getItem('tic-tac-toe-isXNext'));

    if (savedBoard && savedIsXNext !== null) {
      setBoard(savedBoard);
      setIsXNext(savedIsXNext);
    }
  }, []);

  // Save game state to localStorage
  useEffect(() => {
    localStorage.setItem('tic-tac-toe-board', JSON.stringify(board));
    localStorage.setItem('tic-tac-toe-isXNext', JSON.stringify(isXNext));
  }, [board, isXNext]);

  // Minimax AI algorithm for unbeatable play
  const minimax = (newBoard, isMaximizing) => {
    const winner = calculateWinner(newBoard);
    if (winner === aiPlayer) return { score: 1 };
    if (winner === player) return { score: -1 };
    if (!newBoard.includes(null)) return { score: 0 };

    let bestScore = isMaximizing ? -Infinity : Infinity;
    let bestMove;

    for (let i = 0; i < 9; i++) {
      if (newBoard[i] === null) {
        newBoard[i] = isMaximizing ? aiPlayer : player;
        const { score } = minimax(newBoard, !isMaximizing);
        newBoard[i] = null;

        if (isMaximizing) {
          if (score > bestScore) {
            bestScore = score;
            bestMove = i;
          }
        } else {
          if (score < bestScore) {
            bestScore = score;
            bestMove = i;
          }
        }
      }
    }
    return { score: bestScore, index: bestMove };
  };

  const handleAIMove = useCallback(() => {
    const { index } = minimax(board, true);
    handleSquareClick(index);
  }, [board]);

  const calculateWinner = (squares) => {
    const lines = [
      [0, 1, 2], [3, 4, 5], [6, 7, 8],
      [0, 3, 6], [1, 4, 7], [2, 5, 8],
      [0, 4, 8], [2, 4, 6]
    ];
    for (let [a, b, c] of lines) {
      if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
        return squares[a];
      }
    }
    return null;
  };

  const handleSquareClick = (index) => {
    if (board[index] || gameOver) return;

    const newBoard = [...board];
    newBoard[index] = isXNext ? player : aiPlayer;
    setBoard(newBoard);
    setIsXNext(!isXNext);

    const winner = calculateWinner(newBoard);
    if (winner || !newBoard.includes(null)) {
      setGameOver(true);
      setWinner(winner);
    }
  };

  const resetGame = () => {
    setBoard(Array(9).fill(null));
    setIsXNext(true);
    setGameOver(false);
    setWinner(null);
    localStorage.removeItem('tic-tac-toe-board');
    localStorage.removeItem('tic-tac-toe-isXNext');
  };
    const exitGame = () => {
    setGameStarted(false)
    setBoard(Array(9).fill(null));
    setIsXNext(true);
    setGameOver(false);
    setWinner(null);
    localStorage.removeItem('tic-tac-toe-board');
    localStorage.removeItem('tic-tac-toe-isXNext');
  };
  
  useEffect(() => {
    if (!isXNext && !gameOver) {
      const timer = setTimeout(handleAIMove, 500); 
      return () => clearTimeout(timer);
    }
  }, [isXNext, gameOver, handleAIMove]);

  return (
 <div>
      {!gameStarted ? (
        <StartScreen onStart={startGame} />
      ) : (
        <>
          <Board board={board} onSquareClick={handleSquareClick} />
          <Status gameOver={gameOver} winner={winner} isXNext={isXNext} onReset={resetGame} onExit={exitGame} />
        </>
      )}
    </div>
  );
};

export default TicTacToe;
