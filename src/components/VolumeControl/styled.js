import styled from 'styled-components';

export const Wrapper = styled.div`
  width: 180px;

  & input[type='range'] {
    -webkit-appearance: none;
  }

  & input[type='range']::-webkit-slider-runnable-track {
    background: #a0a0a0;
    border: none;
    border-radius: 3px;
    cursor: pointer;
    height: 4px;
  }

  & input[type='range']::-webkit-slider-thumb {
    -webkit-appearance: none;
    background: #fff;
    border: none;
    border-radius: 50%;
    height: 12px;
    margin-top: -4px;
    outline: none;
    width: 12px;
  }

  input[type='range']:focus {
    outline: none;
  }

  input[type='range']:focus::-webkit-slider-runnable-track {
    background: #a0a0a0;
  }
`;
