import styled from 'styled-components';

import { spotifyGreen } from '../../../css-variables/colors';

const ActionButton = styled.div`
  pointer-events: none;
  position: absolute;
  top: calc(50% - 16px);
`;

export const Pause = styled(ActionButton)`
  border-left: 5px solid #fff;
  border-right: 5px solid #fff;
  height: 32px;
  left: calc(50% - 9px);
  width: 18px;
`;

export const Play = styled(ActionButton)`
  border: 15px solid transparent;
  border-left-color: #fff;
  height: 0;
  left: calc(50%);
  transform: scaleX(1.5);
  width: 0;
`;

export const Wrapper = styled.div`
  background-color: ${spotifyGreen};
  border-radius: 50%;
  bottom: 16px;
  cursor: default;
  filter: brightness(1);
  height: 40px;
  position: absolute;
  right: 20px;
  transition: transform 0.1s ease;
  width: 40px;

  &:hover {
    border-width: 2px;
    transform: scale(1.1);
  }

  &:active {
    border-width: 1px;
    transform: scale(1);
  }
`;
