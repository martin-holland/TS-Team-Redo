import card1 from './assets/elena.jpeg';
import card2 from './assets/abel.png';
import card3 from './assets/noora.png';
import card4 from './assets/margit.jpeg';
import card5 from './assets/martin.png';
import card6 from './assets/maria.png';
import card7 from './assets/remu.jpeg';
import card8 from './assets/santosh.jpeg';
import card9 from './assets/saara.jpeg';
import card10 from './assets/ossi.jpeg';
import card11 from './assets/kati.jpeg';
import card12 from './assets/amrita.jpeg';
import cardBack from './assets/react.png';
import { shuffleArray } from './utils';


export type CardType = {
    id: string;
    flipped: boolean;
    backImage: string;
    frontImage: string;
    clickable: boolean;
    matchingCardId: string;
}

const cards: string[] = [card1, card2, card3, card4, card5, card6, card7, card8, card9, card10, card11, card12];

export const createBoard = (pairs: number): CardType[] => 
    {   const shuffledSliced = shuffleArray(cards).slice(0, pairs);
        const doubledCards = [...shuffledSliced , ...shuffledSliced].map((card, i) => ({
        id: `card${i}`,
        flipped: false,
        backImage: cardBack,
        frontImage: card,
        clickable: true,
        matchingCardId: i < shuffledSliced.length ? `card${i + shuffledSliced.length}` : `card${i - shuffledSliced.length}`
    }));
    return doubledCards;
};