import React from 'react';

import {
  Artist,
  EllipsisText,
  Image,
  ImageContainer,
  InfoBox,
  Title,
  Wrapper,
} from './styled';

export interface IProps {
  artist: string;
  src: string;
  title: string;
}

const NowPlaying: React.SFC<IProps> = ({ artist, title, src }) => (
  <Wrapper>
    <ImageContainer>
      <Image src={src} alt={`${artist} - ${title}`} />
    </ImageContainer>
    <InfoBox>
      <Title>
        <EllipsisText>{title}</EllipsisText>
      </Title>
      <Artist>{artist}</Artist>
    </InfoBox>
  </Wrapper>
);

export default NowPlaying;
