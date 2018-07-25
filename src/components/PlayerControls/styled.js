import styled from 'styled-components';

export const Container = styled.div`
  flex: 1;
  height: 56px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

export const Controls = styled.div`
  align-items: center;
  display: flex;
  flex-direction: row;
  height: 32px;
  justify-content: space-between;
  align-items: center;
  width: 224px;

  & > button {
    color: #a0a0a0;
    outline: none;
  }
`;

export const PlayButton = styled.button`
  background-color: transparent;
  border: none;
  // color: #fff;
  cursor: pointer;
  font-size: 2.1rem;
  height: 32px;
  margin-top: -0.5rem;
  padding: 0;
  width: 32px;
  transition: all 0.1s;

  &:hover {
    color: #fff;
    transform: scale(1.2);
  }
`;

export const SkipButton = styled.button`
  background-color: transparent;
  border: none;
  color: #fff;
  cursor: pointer;
  font-size: 1.2rem;
  height: 32px;
  padding: 0;
  width: 32px;

  &:hover {
    color: #fff;
  }

  &:disabled:hover {
    color: #a0a0a0;
  }
`;
