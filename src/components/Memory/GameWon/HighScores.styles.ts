import styled from 'styled-components';

export const Overlay = styled.div`
    background-color: rgba(0, 0, 0, 0.461);
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    position: fixed; 
    display: flex;
    justify-content: center;
    align-items: center;
`;

export const Popup = styled.div`
    max-width: 90%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    color: black;
    position: absolute;
    padding: 2rem;
    background-color: white;
    top: 200px;
    border-radius: 4px;
`;


export const Results = styled.div`
    display: grid;
    grid-template-columns: repeat(4, 1fr);
`;


export const Span =styled.span`
    color: blue;
`;

export const BlueP = styled.p`
    color: blue;
`;