import styled, { css } from 'styled-components';

export const Card = styled.div`
  cursor: pointer;
  margin-bottom: 35px;
`;

export const Clipart = styled.div`
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

export const Title = styled.p`
  color: #fff;
  display: block;
  font-size: 14px;
  font-weight: 400;
  height: 20;
  margin: 12px 0 4px;
  text-align: center;
`;

export const Wrapper = styled.div`
  padding: 0 8px;
`;
