import * as React from 'react';
import { useState, useEffect } from 'react';
import { useGameState } from './GameState';
import { Board } from './Board';
import { Row, Column } from './Layout';
import "./TicTacToe.css";
import { GameWon } from './GameWon';

function TicTacToe() {
    let {
        gameState,
        current,
        xIsNext,
        jumpTo,
        winner,
        handleClick,
      } = useGameState();

    const [showResult, setShowResult] = useState(false);

    useEffect(() => {
      checkWinner();
    }, [winner])

  function reset() {
      window.location.reload();
  }

  const checkWinner = () => {
    if (winner) {
      setShowResult(true);
    }
  }
  const closeHandler = () => {
      setShowResult(false);
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
            {showResult && winner && <GameWon close={closeHandler} winner={winner}/>}
    </div>
  );
}
export default TicTacToe;