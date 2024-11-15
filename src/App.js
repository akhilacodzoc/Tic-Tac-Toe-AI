// src/App.js
import React from 'react';
import TicTacToe from './components/TicTacToe';
import './styles/custom.css';

const App = () => {
  return (
    <div className="App">
      <h1 style={{ color: '#fff', fontSize: '2.5rem', marginBottom: '20px' }}>
        {/* Tic-Tac-Toe */}
      </h1>
      <TicTacToe />
    </div>
  );
};

export default App;
