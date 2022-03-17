import React, { useState, useEffect } from 'react';
import Card from './Card/Card';
import { createBoard } from './setup';
import { shuffleArray } from './utils';
import { CardType } from './setup';
import { Flex } from './Memory.styles';
import { GameWon } from './GameWon/GameWon';
import HighScores from './GameWon/HighScores';
import confetti from 'canvas-confetti';


const defaultCardAmount = 3;

const Memory: React.FC = () => {
  const [cards, setCards] = useState<CardType[]>(shuffleArray(createBoard(defaultCardAmount)));
  const [gameWon, setGameWon] = useState<boolean>(false);
  const [showScores, setShowScores] = useState<boolean>(false);
  const [matchedPairs, setMatchedPairs] = useState<number>(0);
  const [clickedCard, setClickedCard] = useState<undefined | CardType>(undefined);
  const [turns, setTurns] = useState<number>(0);
  const [cardsNumber, setCardsNumber] = useState<number>(defaultCardAmount);
  const [level, setLevel] = useState<string>('easy');

  
  useEffect(() => {
    if (matchedPairs === cards.length / 2) {
      setTimeout(() => {
        setGameWon(true);
      }, 1400);
    };

    
  }, [matchedPairs, cards, cardsNumber, level])


  const handleCardClick = (currentClickedCard: CardType) => {
    setTurns(turns => turns + 1);
    // Flip the card
    setCards(cards => cards.map(card => card.id === currentClickedCard.id ? {...card, flipped: true, clickable: false } : card ));

    // throw confetti if it's magic
    if (currentClickedCard.magic) {
      confetti();
    }

    // if one card is flipped, set it into hook and wait
    if (!clickedCard) {
      setClickedCard({...currentClickedCard});
      return;  // do we need this >> yes, it breaks here
    };

    // if second card matches, add 1 to matchedPairs
    if (clickedCard.matchingCardId === currentClickedCard.id) {
      setMatchedPairs(matchedPairs => matchedPairs +1);

      // make the two cards not clickable anymore
      setCards(cards => 
        cards.map(card => card.id === clickedCard.id || card.id === currentClickedCard.id ? {...card, clickable: false} : card));
      setClickedCard(undefined);  // to start a new turn
      return; // do we need this >> yes it breaks here
    };

    // if second card does not match, wait 2 seconds and flip both cards back and make them clickable again
    setTimeout(() => {
      setCards(cards => cards.map(card => card.id === clickedCard.id || card.id === currentClickedCard.id 
        ? {...card, flipped: false, clickable: true} 
        : card));
    }, 1400);
    setClickedCard(undefined);  // to start a new turn
  };

  const closePopupHandler = () => {
    setGameWon(false);
    setShowScores(true);
  }

  const closeScoresHandler = () => {
    setTurns(0);
    setMatchedPairs(0);
    setShowScores(false);
    setCards(shuffleArray(createBoard(cardsNumber)));
  }

  const setNewLevel = (cards: number) => {
      // temp const to get it right away or re-render wont happen. Update of the cardsstate does not happen inside this function
      const cardsNow = cards;
      setCardsNumber(cards);
      if (cards === 3) {
        setLevel('easy');
      } else if (cards === 6) {
        setLevel('medium');
      } else if (cards === 12) {
        setLevel('hard');
      }
      setCards(shuffleArray(createBoard(cardsNow)));
  }

  return (
      <div>
        <h1>
          REACT21 Memory Game
        </h1>
        <button onClick={() => setNewLevel(3)}>EASY</button>
        <button onClick={() => setNewLevel(6)}>MEDIUM</button>
        <button onClick={() => setNewLevel(12)}>HARD</button>
          <Flex>
            {cards.map(card => (
              <Card key={card.id} card={card} callback={handleCardClick}></Card>
            ))}
          </Flex>
          {gameWon && <GameWon turnsUsed={turns} closePopup={closePopupHandler} level={level}/>}
          {showScores && <HighScores closeScores={closeScoresHandler} level={level} clicks={turns}/>}
      </div>
  );
}

export default Memory;
