import React, { useState, useEffect } from 'react';
import Card from './Card/Card';
import { createBoard } from './setup';
import { shuffleArray } from './utils';
import { CardType } from './setup';
import { Flex } from './Memory.styles';
import { GameWon } from './GameWon/GameWon';


const Memory: React.FC = () => {
  // console.log(createBoard());
  const [cards, setCards] = useState<CardType[]>(shuffleArray(createBoard(3)));
  const [gameWon, setGameWon] = useState(false);
  const [matchedPairs, setMatchedPairs] = useState(0);
  const [clickedCard, setClickedCard] = useState<undefined | CardType>(undefined);
  const [turns, setTurns] = useState(0);
  const [cardsNumber, setCardsNumber] = useState(6);

  
  useEffect(() => {
    if (matchedPairs === cards.length / 2) {
      setTimeout(() => {
        setGameWon(true);
      }, 1400);
    }
  //eslint-disable-next-line
  }, [matchedPairs])


  const handleCardClick = (currentClickedCard: CardType) => {
    setTurns(turns => turns + 1);
    // Flip the card
    setCards(cards => cards.map(card => card.id === currentClickedCard.id ? {...card, flipped: true, clickable: false } : card ));

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
    setCards(cards => cards.map(card => card ? {...card, flipped: false, clickable: true} : card));
    setTurns(0);
    setMatchedPairs(0);
    newGame(cardsNumber);
  }

  const newGame = (cards: number) => {
    setCardsNumber(cards);
    setCards(shuffleArray(createBoard(cards)));
  }

  return (
      <div>
        <h1>
          REACT21 Memory Game
        </h1>
        <button onClick={() => newGame(3)}>EASY</button>
        <button onClick={() => newGame(9)}>MEDIUM</button>
        <button onClick={() => newGame(12)}>HARD</button>
          <Flex>
            {cards.map(card => (
              <Card key={card.id} card={card} callback={handleCardClick}></Card>
            ))}
          </Flex>
          {gameWon && <GameWon turnsUsed={turns} closePopup={closePopupHandler}/>}
      </div>
  );
}

export default Memory;
