import React, {useState} from 'react'
import { FaHandRock } from 'react-icons/fa';
import { FaHandPaper } from 'react-icons/fa';
import { FaHandScissors } from 'react-icons/fa'

export default function RockPaperScissors() {

enum moves {
    Rock,
    Paper,
    Scissors
}    

const [userScore, setUserScore] = useState(0)
const [computerScore, setComputerScore] = useState(0)
const [counter, setCounter] = useState(0)
const [ties, setTies] = useState(0)

let userMove1:string;
let computerMove1:string;

userMove1 = "";
computerMove1 = "";

function startGame(): void {
    setUserScore(0);
    setComputerScore(0);
    setCounter(0)
    setTies(0)

    outputMessage("The game has begun!")
    hideStartButton();
}

function hideStartButton(): void {
    let startButton: HTMLButtonElement = document.querySelector(".start-button")!
    let gameButtons: HTMLDivElement = document.querySelector(".game-buttons")!
    let scoreArea: HTMLDivElement = document.querySelector(".scores")!
    startButton.style.display = "none";
    gameButtons.style.display = "block";
    scoreArea.style.display = "flex";

}

function outputMessage(message: string): void {
    let output: HTMLDivElement = document.querySelector(".output")!
    output.innerHTML = `<p>${message}</p>`
}

interface guess {
    move:number
    player: string
}

function getComputerMove(): guess {
    let move = Math.floor(Math.random() * 3)
    return {
        move: move,
        player: "Computer"
    }
}

function handleUserChoice(choice: number): void {
    let userGuess: guess = {
        move: choice,
        player: "User",
    }

    let computerGuess: guess = getComputerMove()
    
    let winner: guess = calculateWinner(userGuess, computerGuess)
    if (winner.player === "User") setUserScore(userScore + 1);
    if (winner.player === "Computer") setComputerScore(computerScore + 1);
    if (winner.player === "Neither") setTies(ties + 1)
    outputMessage(`${winner.player} wins with ${moves[winner.move]}`)
    setCounter(counter + 1)
    console.log(userScore, computerScore)
    userMove1 = moves[userGuess.move]
    // playerMoveArea.innerHTML = `<p>User Played: <span className="move1">${moves[userGuess.move]}</span></p>`
    computerMove1 = moves[computerGuess.move]
    // computerMoveArea.innerHTML = `<p>Computer Played: <span className="move2">${moves[computerGuess.move]}</span></p>`
    updateMove();
}

function updateMove() {
    const playerMoveArea: HTMLDivElement = document.querySelector(".player-move")!
    const computerMoveArea: HTMLDivElement = document.querySelector(".computer-move")!

    playerMoveArea.innerHTML = `<p>User Played: <span className="move1">${userMove1}</span></p>`
    computerMoveArea.innerHTML = `<p>Computer Played: <span className="move2">${computerMove1}</span></p>`
}

function updateUserMoveSpan(userMove1:string) {
    switch (userMove1) {
        case "Rock":
        return <FaHandRock/>
        case "Paper":
          return <FaHandPaper/>
        case "Scissors":
        return <FaHandScissors/>
        default:
            return <></>
      }
}

function updateComputerMoveSpan(computerMove1:string) {
    switch (computerMove1) {
        case "Rock":
        return <FaHandRock/>
        case "Paper":
          return <FaHandPaper/>
        case "Scissors":
        return <FaHandScissors/>
        default:
            return <></>
      }
}

function calculateWinner(guessOne: guess, guessTwo: guess): guess {
    if (guessOne.move === guessTwo.move) return {player: "Neither", move: guessOne.move}

    switch (guessOne.move) {
        case moves.Rock:
          if (guessTwo.move === moves.Paper) return guessTwo
          break
        case moves.Paper:
          if (guessTwo.move === moves.Scissors) return guessTwo
          break
        case moves.Scissors:
          if (guessTwo.move === moves.Rock) return guessTwo
          break
        default:
          return guessOne
      }
      return guessOne;
}


  return (
      <>
    <div className="game-area">
        <section className="instructions">
            <h2>Rock, Paper, Scissors!</h2>
            <p>1. Press start to begin the game</p>
            <p>2. You can chose a move to play below using the buttons.</p>
            <p>3. The computer will then play a random move in hopes to beat you!</p>
            <p>4. You have 1 in 3 chances of winning! What score can you get?</p>
            </section>
    <div className="scores">
        <p className="scores-info">Game Number: {counter}</p>
        <p className="scores-info">User Score: {userScore}</p>
        <p className="scores-info">Computer Score: {computerScore}</p>
        <p className="scores-info">Ties: {ties}</p>
    </div>
        <button className="start-button" onClick={startGame}>Start</button>
        <div className="game-buttons">
            <button onClick={() => handleUserChoice(0)}>Rock <FaHandRock/></button>
            <button onClick={() => handleUserChoice(1)}>Paper <FaHandPaper/></button>
            <button onClick={() => handleUserChoice(2)}>Scissors <FaHandScissors/></button>
        </div>
        <section className="player-move"></section>
        <span className="move1-icon">{updateUserMoveSpan(userMove1)}</span>
        <section className="computer-move"></section>
        <span className="move2-icon">{updateComputerMoveSpan(computerMove1)}</span>
        <section className="output"></section>
        <button className="home-btn"><a href="/">Home</a></button>
    </div>
    </>
  )
}
