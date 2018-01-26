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
  font-size: 20px;
`;

export const Wrapper = styled.div`
  font-size: 16px;
  height: 70px;
  color: ${p => (p.active ? spotifyGreenPlaying : 'rgba(255, 255, 255, 0.9)')};
  display: flex;
  flex-direction: row;
  padding: 16px;
  transition: all 0.2s;

  &:hover {
    background-color: rgba(0, 0, 0, 0.2);
  }
`;
