import styled from 'styled-components';

export const DescriptionWrapper = styled.div`
  align-items: center;
  justify-content: flex-start;
  display: flex;
  flex-direction: column;
  flex: 1;
  padding: 0 8px;
  position: relative;
  text-align: center;
  top: 40px;

  @media (max-width: 1199px) {
    top: 0;
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    align-items: stretch;
    max-width: 100%;
    width: 100%;
    max-height: 255px;
  }

  @media (min-width: 1200px) and (min-width: 1499px) {
  }
`;

export const InfoBox = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  position: relative;
`;

export const Text = styled.div`
  color: rgba(255, 255, 255, 0.6);
  font-size: 14px;
  font-weight: 200;
  line-height: 28px;
  margin: 12px;
  pointer-events: none;

  & > a {
    color: currentColor;
  }
`;

export const TracksWrapper = styled.div`
  flex: 2;

  @media (max-width: 1199px) {
  }

  @media (min-width: 1200px) and (max-width: 1499px) {
    flex: 3;
  }
`;

export const Wrapper = styled.div`
  display: flex;
  flex-direction: row;
  color: white;
  margin: auto;
  max-width: 1480px;
  padding: 35px 28px 0;

  @media (min-width: 1200px) and (min-width: 1499px) {
  }

  @media (max-width: 1199px) {
    display: flex;
    flex-direction: column;
    min-height: 100vh;
    min-width: 515px;
    width: 100%;
  }
`;
