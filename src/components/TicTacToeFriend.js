import React, { useState, useEffect } from 'react';
import Board from './Board';
import Status from './Status';
import '../styles/custom.css';
import '../styles/StartScreen.css';

const TicTacToeFriend = ({onExit}) => {
  const [board, setBoard] = useState(Array(9).fill(null));
  const [isXNext, setIsXNext] = useState(true);
  const [gameOver, setGameOver] = useState(false);
  const [winner, setWinner] = useState(null);

  const player = 'X';
  const aiPlayer = 'O';

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

  return (
 <div>
        <>
          {/* <p  style={{ color: '#fff', fontSize: '1.5rem', marginBottom: '20px' }}>
           Play With Friend
          </p> */}
          <Board board={board} onSquareClick={handleSquareClick} />
          <Status gameOver={gameOver} winner={winner} isXNext={isXNext} onReset={resetGame} onExit={onExit}/>
        </>
    </div>
  );
};

export default TicTacToeFriend;
