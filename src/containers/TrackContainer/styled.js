import styled from 'styled-components';

import { spotifyGray, spotifyGreenPlaying } from '../../css-variables/colors';

export const Artist = styled.div`
  color: ${spotifyGray};
  font-weight: 200;
`;

export const Description = styled.div`
  flex: 1;
`;

export const TrackName = styled.div`
  font-size: 16px;
  font-weight: 200;
`;

export const Wrapper = styled.div`
  align-items: center;
  color: ${p =>
    p.active
      ? spotifyGreenPlaying
      : p.hasPreview ? 'rgba(255, 255, 255, 0.9)' : 'rgba(255, 255, 255, 0.3)'};
  display: flex;
  flex-direction: row;
  font-size: 14px;
  font-weight: 200;
  height: 70px;
  max-width: 1480px;
  padding: 0 28px;
  transition: all 0.2s;

  &:hover {
    background-color: rgba(0, 0, 0, 0.2);
  }
`;
