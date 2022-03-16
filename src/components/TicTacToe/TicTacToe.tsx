import * as React from 'react';
import { useState } from 'react';
import { useGameState } from './GameState';
import { Board } from './Board';
import { Row, Column } from './Layout';
import "./TicTacToe.css"

function TicTacToe() {
    let {
        gameState,
        current,
        xIsNext,
        jumpTo,
        winner,
        handleClick,
      } = useGameState();

    const [showResult, setShowResult] = useState(winner);

  function reset() {
      window.location.reload();
  }

  const closeHandler = () => {
      setShowResult(null)
      winner = null
  };

  return (
      <div className='TTT-container'>
      <h1 className='title'>Tic Tac Toe!</h1>
        <div className='msg-container'><h3>
            {
          winner
            ? `${winner} wins!`
            : `Current Player: ${xIsNext ? 'X' : 'O'}`
        }</h3></div>
        <Row gap={20}>
      <Column gap={20}>
        <Board board={current} onClick={handleClick} />
      </Column>
    </Row>
    <div className="button-container">
            <button onClick={reset} id="reset">Reset</button>
            </div>
    </div>
  );
}
export default TicTacToe;