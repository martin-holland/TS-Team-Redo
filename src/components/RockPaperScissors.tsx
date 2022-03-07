import React, {useState} from 'react'

export default function RockPaperScissors() {

enum moves {
    Rock,
    Paper,
    Scissors
}    

const [userScore, setUserScore] = useState(0)
const [computerScore, setComputerScore] = useState(0)
const [counter, setCounter] = useState(0)

function startGame(): void {
    setUserScore(0);
    setComputerScore(0);
    setCounter(0)

    outputMessage("The game has begun!")
    hideStartButton();
}

function hideStartButton(): void {
    let startButton: HTMLButtonElement = document.querySelector(".start-button")!
    let gameButtons: HTMLDivElement = document.querySelector(".game-buttons")!
    let scoreArea: HTMLDivElement = document.querySelector(".scores")!
    startButton.style.display = "none";
    gameButtons.style.display = "block";
    scoreArea.style.display = "block";

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
        player: "User"
    }

    const playerMoveArea: HTMLDivElement = document.querySelector(".player-move")!
    const computerMoveArea: HTMLDivElement = document.querySelector(".computer-move")!

    let computerGuess: guess = getComputerMove()
    
    let winner: guess = calculateWinner(userGuess, computerGuess)
    if (winner.player === "User") setUserScore(userScore + 1);
    if (winner.player === "Computer") setComputerScore(computerScore + 1);
    outputMessage(`${winner.player} wins with ${moves[winner.move]}`)
    setCounter(counter + 1)
    console.log(userScore, computerScore)
    playerMoveArea.innerHTML = `<p>User Played: ${moves[userGuess.move]}</p>`
    computerMoveArea.innerHTML = `<p>Computer Played: ${moves[computerGuess.move]}</p>`
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
    <div className="scores">
        <p>Game Number: {counter}</p>
        <label htmlFor="scoresarea">Scores
        <p>User Score: {userScore}</p>
        <p>Computer Score: {computerScore}</p>
        </label>

    </div>
    <div className="game-area">
        <button className="start-button" onClick={startGame}>Start</button>
        <div className="game-buttons">
            <button onClick={() => handleUserChoice(0)}>Rock</button>
            <button onClick={() => handleUserChoice(1)}>Paper</button>
            <button onClick={() => handleUserChoice(2)}>Scissors</button>
        </div>
        <section className="player-move"></section>
        <section className="computer-move"></section>
        <section className="output"></section>
    </div>
    </>
  )
}
