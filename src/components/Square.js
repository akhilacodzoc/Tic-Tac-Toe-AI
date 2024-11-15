// src/components/Square.js
import React from 'react';
import '../styles/custom.css';

const Square = ({ value, onClick }) => {
  return (
    <button className={`square ${value}`} onClick={onClick}>
      {value}
    </button>
  );
};

export default Square;
