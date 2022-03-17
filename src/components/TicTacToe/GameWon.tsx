import { Popup, Overlay } from "./GameWon.styles";

type Props = {
    close(): void;
    winner: string;
}

export const GameWon: React.FC<Props> = ({close, winner}) => {
    const Message = () =>  {
        if (true) {
            return <p>{winner} WON!</p>;
        } 
    }

      return (
        <Overlay>
            <Popup>
                <h1>YOU DID IT!</h1>
                <Message />
                <div>
                    <button className="close" onClick={close}>CLOSE</button>
                </div>
            </Popup>
        </Overlay>
    );
};