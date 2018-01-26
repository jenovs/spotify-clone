import styled from 'styled-components';

import { sidebarWidth, playerHeight } from '../../css-variables/layout';

export const Background = styled.div`
  ${'' /* background-image: linear-gradient(rgb(146, 138, 152), rgb(1, 1, 1) 85%); */} ${'' /* background-image: linear-gradient(rgb(9, 15, 24), rgb(4, 6, 11) 85%); */} background-image: linear-gradient(rgb(48, 44, 48), rgb(8, 7, 8) 30%);
  background-size: cover;
  background-repeat: no-repeat;
  height: 100vh;
  width: 100vw;
  position: fixed;
  z-index: -1;
`;

export const Section = styled.div`
  padding: 40px 30px 0 30px;
  margin-left: ${sidebarWidth};
  margin-bottom: ${playerHeight};
`;

export const Wrapper = styled.div`
  width: 100%;
`;
