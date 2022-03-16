import * as React from 'react';
import styled from 'styled-components';
import { Value } from './GameState';

const StyledSquare = styled.button`
  width: 90px;
  height: 90px;
  background: #fff;
  border: 1px solid #999;
  padding: 0;
  font-size: 48px;
  font-weight: bold;
`;
export type SquareProps = {
  value: Value;
  onClick: () => void;
};
export function Square(props: SquareProps) {
  return (
    <StyledSquare onClick={props.onClick}>
      {props.value}
    </StyledSquare>
  );
}