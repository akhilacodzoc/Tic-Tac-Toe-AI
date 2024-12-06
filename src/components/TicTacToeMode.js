// src/components/TicTacToeF.js
import React, { useState } from 'react';
import TicTacToeWithAI from './TicTacToe';
import TicTacToeWithFriends from './TicTacToeFriend';
import StartScreen from './StartScreen';
import '../styles/custom.css';

const TicTacToeMode = () => {
  const [gameMode, setGameMode] = useState(false);

  const startWithAI = () => setGameMode('ai');
  const startWithFriends = () => setGameMode('friends');
  const exitGame = () => setGameMode(false);

  return (
    <div className="game-container">
      {!gameMode ? (
        <StartScreen onStart={startWithAI} onStartF={startWithFriends} />
      ) : gameMode === 'ai' ? (
        <TicTacToeWithAI onExit={exitGame} />
      ) : (
        <TicTacToeWithFriends onExit={exitGame} />
      )}
    </div>
  );
};

export default TicTacToeMode;
