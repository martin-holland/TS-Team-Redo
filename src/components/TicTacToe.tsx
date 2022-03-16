import * as React from "react";
import styled from "styled-components";
import { BoardState, useGameState, Value } from "./TicTacToeState";
import Navbar from './Navbar'

type LayoutProps = {
    gap: number,
}

const Row = styled.div<LayoutProps>`
    display: flex;
    flex-direction: row;
    gap: ${(props) => props.gap}px;
`;

const Col = styled.div<LayoutProps>`
    display: flex;
    flex-direction: column;
    gap: ${(props) => props.gap}px;
`;

function TicTacToe() {
    const {
        gameState,
        current,
        xIsNext,
        winner,
        handleClick,
        jumpTo,
    } = useGameState();


    return (
        <Row gap={5}>
            <Col gap={5}>
                <div> {
                    winner
                    ? `Winner ${winner}`
                    : `Next Player ${xIsNext ? 'X' : '='}`
                }</div>
                <Board board = {current} onClick = {handleClick} />
            </Col>
            <Log history={gameState.history} jumpTo={jumpTo}/>
        </Row>
    );
}

type BoardProps = {
    board: BoardState,
    onClick: (square: number) => void;
};
function Board({ board, onClick }: BoardProps) {
    const createProps = (square: number): SquareProps => {
      return {
        value: board[square],
        onClick: () => onClick(square),
      };
    };
    return (
        <Col gap={1}>
            <Row gap={1}>
                <Square {...createProps(0)} />
                <Square {...createProps(1)} />
                <Square {...createProps(2)} />
            </Row>
            <Row gap={1}>
                <Square {...createProps(3)} />
                <Square {...createProps(4)} />
                <Square {...createProps(5)} />
            </Row>
            <Row gap={1}>
                <Square {...createProps(6)} />
                <Square {...createProps(7)} />
                <Square {...createProps(8)} />
            </Row>
        </Col>
    );
}

const StyledSquare = styled.button`
    width: 75px;
    height: 75px;
    background: #fff;
    border: 1px solid #999;
    padding: 0;
    font-size: 36px;
    font-weight: bold;
`;

type SquareProps = {
    value: Value;
    onClick: () => void;
  };

function Square(props: SquareProps) {
    return (
        <StyledSquare onClick = {props.onClick}>
            {props.value}
        </StyledSquare>
    );
}

type LogProps = {
    history: BoardState[],
    jumpTo: (step: number) => void,
}

function Log(props: LogProps) {
    return (
        <ol>
            {props.history.map((_, index) => {
                return (
                    <li key={index}>
                        <button onClick={() => props.jumpTo(index)}>
                            Go to move {index === 0 ? 'start' : `move #${index}`}
                        </button>
                    </li>
                );
            })}
        </ol>
    );
}

export default TicTacToe;
