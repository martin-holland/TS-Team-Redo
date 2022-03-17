import React, { useState}  from "react";
import { Popup, Overlay } from "./GameWon.styles";
import { collection, addDoc, Timestamp } from "firebase/firestore";
import { db } from "../firebase";


type Props = {
    turnsUsed: number;
    closePopup(): void;
    level: string;
}

export const GameWon: React.FC<Props> = ({turnsUsed, closePopup, level}) => {
    const [player, setPlayer] = useState("");

    const Message = () =>  {
        if (turnsUsed > 30) {
            return <p>It took you a while! You don't remember your REACT21 mates very well... </p>;
        } else if (turnsUsed > 8) {
            return <p>On you way to get very agile... </p>;
        } else {
            return <p>You are so agile. Individuals and interactions over processes and tools. </p>
        }
    }

    const scoreHandler = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        addScoreToDB();
        closePopup();
    }

    const addScoreToDB = async () => {
        await addDoc(collection(db, "memory"), {
          nickname: player,
          clicks: turnsUsed, 
          date: Timestamp.fromDate(new Date()),
          level: level
        });
    };

    const nickHandler = (e: React.ChangeEvent<HTMLInputElement>): void => {
        const nickname = e.target.value;
        if (nickname) {
            setPlayer(nickname);
        }
    }

      return (
        <Overlay>
            <Popup>
                <h1>YOU DID IT!</h1>
                <p>You used {turnsUsed} clicks to match all cards</p>
                <Message />
                <div>
                    <input type="text" className="player" placeholder="Nickname" required onChange={nickHandler}/>
                    <button className="score_button" onClick={scoreHandler}>SAVE</button>
                    <button className="close" onClick={closePopup}>CLOSE</button>
                </div>
            </Popup>
        </Overlay>
    );
};