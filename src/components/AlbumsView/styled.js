import styled from 'styled-components';

export const Header = styled.h1`
  color: ${p => (p.danger ? '#f00' : '#fff')};
  font-size: 36px;
  font-weight: 600;
  letter-spacing: -0.18px;
  line-height: 44px;
  margin: 24px 0;
  text-align: center;
  transition: color 0.1s ease;
`;

export const Wrapper = styled.div`
  display: grid;
  grid-template-columns: ${p => p.template};
  justify-content: center;
  margin: auto;
  max-width: 1480px;
`;
