import { useEffect, useState } from 'react';
import { db } from "../firebase.js";
import { collection, getDocs, Timestamp } from "firebase/firestore";
import { Results, Overlay, Popup, Span, BlueP } from "./HighScores.styles";

type Props = {
    closeScores(): void;
    level: string;
    clicks: number;
}

type Player = {
    clicks: number;
    nickname: string;
    date: Timestamp;
    level: string;
}

const HighScores: React.FC<Props> = ({closeScores, level, clicks}) => {
    const [highScores, setHighScores] = useState<Player[]>([]);

    const Message = () => {
        return <h1>Highest scores for level <Span>{level}</Span></h1>;
    }

    useEffect(() => {
        getScoresFromDB();
    }, [])

    const getScoresFromDB = async () => {
        const data = await getDocs(collection(db, "memory"));
        setHighScores(data.docs.map((playerScore) => (playerScore.data().level === level ? { ...playerScore.data()} : undefined)) as Player[]);
    };

    const bestPlayers = highScores.sort((a, b) => a.clicks - b.clicks).slice(0, 10).map((player, i) => (

        <Results key={i}>
            <p>{i + 1}</p>
            <p>{player.nickname}</p>
            <p>{player.clicks}</p>
            <p>{player.date.toDate().toLocaleDateString()}</p>
        </Results>
    ))


        
      return (
        <Overlay onClick={closeScores}> 
            <Popup>
                <Message />
                <Results>
                    <p>Rank</p>
                    <p>Player</p>
                    <p>Clicks</p>
                    <p>Date</p>
                </Results>
                {bestPlayers}
                <BlueP>You used {clicks} clicks to pair all the cards</BlueP>
                <button className="close" onClick={closeScores}>CLOSE</button>
            </Popup>
        </Overlay>
    );
};

export default HighScores;