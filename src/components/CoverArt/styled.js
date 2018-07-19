import styled, { css } from 'styled-components';

export const Card = styled.div`
  cursor: pointer;
  margin-bottom: 35px;
  position: relative;
`;

export const Clipart = styled.div`
  backface-visibility: hidden;
  background-image: url('${props => props.icon}');
  background-size: cover;
  filter: brightness(1);
  height: 0;
  padding-bottom: 100%;
  transition: all 1s ease;
  transition: filter 0.3s cubic-bezier(0.3, 0, 0, 1);
  width: 100%;

  ${props =>
    props.hover &&
    css`
      filter: brightness(0.3);
    `};
`;

export const ClipartWrapper = styled.div`
  box-shadow: ${p => (p.shrink ? '0 0 0' : '0 0 10px rgba(0, 0, 0, 0.3)')};
  transform: scale(${p => (p.shrink ? 0.95 : 1)});
  transition: transform 0.1s ease;
`;

export const Title = styled.p`
  color: #fff;
  display: block;
  font-size: ${p => (p.bigTitle ? '26px' : '14px')};
  font-weight: ${p => (p.bigTitle ? 600 : 400)};
  height: ${p => (p.bigTitle ? '36px' : '20px')};
  margin: 12px 0 4px;
  text-align: center;
`;

export const Wrapper = styled.div`
  padding: 0 8px;
  max-width: 320px;
  width: 100%;
`;
