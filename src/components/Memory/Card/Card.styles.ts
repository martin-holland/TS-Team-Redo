import styled, { css } from 'styled-components';

export const Wrapper = styled.div`
  height: 12rem;
  width: 12rem;
  margin: 0.5rem;
  position: relative;
  perspective: 1000px;

  .front.flipped {
    z-index: 1;
    transform: rotateY(180deg);
  }
`;

type Props = {
  flipped: boolean;
};

const sharedStyles = css`
  width: 100%;
  height: 100%;
  transition: all 0.5s;
  backface-visibility: hidden;
  cursor: pointer;
  transform-style: preserve-3d;
  border: 2px solid black;
  border-radius: 5%;
  background-color: rgb(46, 46, 46);
  margin: 1rem;
`;

export const FrontImg = styled.img<Props>`
  ${sharedStyles}

  z-index: ${props => (props.flipped ? 2 : 1)};
  transform: ${props => (props.flipped ? 'rotate(0deg)' : 'rotateY(180deg)')};
`;

export const BackImg = styled.img<Props>`
  ${sharedStyles}

  z-index: ${props => (props.flipped ? 1 : 2)};
  transform: ${props => (props.flipped ? 'rotateY(180deg)' : 'rotate(360deg)')};
  position: absolute;
  top: 0px;
  left: 0px;
`;