import styled from 'styled-components';

export const Header = styled.h1`
  color: #fff;
  font-size: 36px;
  font-weight: 600;
  letter-spacing: -0.18px;
  line-height: 44px;
  margin: 24px 0;
  text-align: center;
`;

export const Wrapper = styled.div`
  display: grid;
  grid-template-columns: ${p => p.template};
  justify-content: center;
  padding: 0 28px;
`;
