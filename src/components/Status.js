// src/components/Status.js
import React from 'react';
import '../styles/custom.css';

const Status = ({ gameOver, winner, isXNext, onReset ,onExit }) => {
  const getStatusMessage = () => {
    if (gameOver) {
      if (winner === 'X') return 'Congratulations, You Win! 😄';
      if (winner === 'O') return 'Oh no, You Lost! 😢';
      return 'It\'s a Tie! 😐';
    }
    return `Next Player: ${isXNext ? 'X' : 'O'}`;
  };

  return (
    <div className="status-container">
      <div className="status-message">
        {getStatusMessage()}
      </div>
     <div style={{ display: 'flex', gap: '10px' }}>
      <button className="resetButton" onClick={onReset}>Restart Game</button>
      <button className="resetButton" onClick={onExit} style={{ marginLeft: 'auto' }}>Exit Game</button>
    </div>      
    {/* Emoji popup when game over */}
      {gameOver && (
        <div className="emoji-popup">
          {winner === 'X' ? '😄' : winner === 'O' ? '😢' : '😐'}
        </div>
      )}
    </div>
  );
};

export default Status;
