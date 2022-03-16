import React, { useEffect, useState}  from "react";
import { Popup, Overlay } from "./GameWon.styles";
// import { db } from "../firebase.js";
import { collection, addDoc, Timestamp } from "firebase/firestore";
import { db } from "../firebase";


type Props = {
    turnsUsed: number;
    closePopup(): void;
}

export const GameWon: React.FC<Props> = ({turnsUsed, closePopup}) => {
    const [player, setPlayer] = useState("");

    const closeOnEscapeKeyDown = (e: KeyboardEvent) => {
        if (e.key === 'Esc' ) {
            closePopup();
        }
    }

    useEffect(() => {
        document.body.addEventListener('keydown', closeOnEscapeKeyDown)
    }, [])

    const Message = () =>  {
        if (turnsUsed> 18) {
            return <p>It took you a while! You don't know your REACT mates very well... </p>;
        } else if (turnsUsed > 6) {
            return <p>You are so agile. Individuals and interactions over processes and tools. </p>;
        } else {
            return <p>You are so agile. Individuals and interactions over processes and tools. </p>
        }
    }

    const scoreHandler = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        // e.preventDefault();
        addScoreToDB();
        closePopup();
    }

    const addScoreToDB = async () => {
        await addDoc(collection(db, "speedgame"), {
          player: player,
          clicks: turnsUsed, 
          date: Timestamp.fromDate(new Date()),
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
                <div className="input_button">
                    <input type="text" className="player" placeholder="Nickname" required onChange={nickHandler}/>
                    <button className="score_button" onClick={scoreHandler}>SAVE</button>
                    <button className="close" onClick={closePopup}>CLOSE</button>
                </div>
            </Popup>
        </Overlay>
    );
};