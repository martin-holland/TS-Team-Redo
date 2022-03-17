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
    transform-origin: top right;
    animation: drop 2s ease forwards, swing 2s 1s ease-in both;
`;