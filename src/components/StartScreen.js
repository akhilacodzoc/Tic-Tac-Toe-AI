import React from 'react';
import '../styles/StartScreen.css';

const StartScreen = ({ onStart,onStartF }) => {
  return (
    <div className="start-screen"
     style={{
        backgroundImage: 'url(/xoxobg.svg)', // Path to the image in public folder
        backgroundSize: '700px',  // Ensures the image covers the entire container
        backgroundPosition: 'left', // Centers the background image
        backgroundRepeat: 'no-repeat', // Prevents the background from repeating
      }}
    >
      <div className="overlay"></div>
      <div className="content">
        <h1 className="game-title">Tic-Tac-Toe</h1>
        <p className="subtitle">The classic game of X and O</p>
        <p className="game-description">
          Ready to challenge 'AI' opponent? Let's play!
        </p>
        <div className="rules">
          <h2>How to Play?</h2>
          <ul>
            <li>Player X and Player O take turns placing marks.</li>
            <li>The first player to get three in a row wins!</li>
            <li>If the board fills up without a winner, it's a draw.</li>
          </ul>
        <button className="start-btn" onClick={onStart}>Play with AI</button>
        </div>
        <button className="start-btn" onClick={onStartF}>Play With Friends</button>
      </div>
    </div>
  );
};

export default StartScreen;
