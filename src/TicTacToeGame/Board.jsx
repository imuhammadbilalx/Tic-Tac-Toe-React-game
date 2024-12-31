import React, { useState } from "react";
import Square from "./Square";

const Board = () => {
  const initialState = Array(9).fill(null); // Initial state
  const [state, setState] = useState(initialState);
  const [isXTurn, setIsXTurn] = useState(true);

  const checkWinner = () => {
    const winnerLogic = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];
    for (let logic of winnerLogic) {
      const [a, b, c] = logic;
      if (state[a] !== null && state[a] === state[b] && state[a] === state[c]) {
        return true;
      }
    }
    return false;
  };

  const isWinner = checkWinner();

  const handleClick = (index) => {
    if (state[index] || isWinner) return; // Prevent illegal moves
    const copyState = [...state];
    copyState[index] = isXTurn ? "x" : "0";
    setState(copyState);
    setIsXTurn(!isXTurn);
  };

  // Reset the game state
  const resetGame = () => {
    setState(initialState); // Reset board state
    setIsXTurn(true);       // Reset turn to X
  };

  return (
    <div className="board-container">
      {isWinner ? (
        <div>
          <p>Someone Won!</p>
          <button onClick={resetGame}>Restart Game</button>
        </div>
      ) : (
        <div>
          <div className="board-row">
            <Square onClick={() => handleClick(0)} value={state[0]} />
            <Square onClick={() => handleClick(1)} value={state[1]} />
            <Square onClick={() => handleClick(2)} value={state[2]} />
          </div>
          <div className="board-row">
            <Square onClick={() => handleClick(3)} value={state[3]} />
            <Square onClick={() => handleClick(4)} value={state[4]} />
            <Square onClick={() => handleClick(5)} value={state[5]} />
          </div>
          <div className="board-row">
            <Square onClick={() => handleClick(6)} value={state[6]} />
            <Square onClick={() => handleClick(7)} value={state[7]} />
            <Square onClick={() => handleClick(8)} value={state[8]} />
          </div>
          <button onClick={resetGame} className="reset-button">Restart Game</button>
        </div>
      )}
    </div>
  );
};

export default Board;
