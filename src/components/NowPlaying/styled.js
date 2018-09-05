import styled from 'styled-components';

export const Artist = styled.div`
  color: #a0a0a0;
  font-size: 11px;
`;

export const Image = styled.img`
  width: 100%;
`;

export const ImageContainer = styled.div`
  margin-right: 13px;
  width: 64px;
`;

export const InfoBox = styled.div`
  align-items: flex-start;
  display: flex;
  flex-direction: column;
  justify-content: center;
  line-height: 20px;
  width: calc(100% - 76px);
`;

export const Title = styled.div`
  display: flex;
  font-size: 14px;
  max-width: 100%;
`;

export const EllipsisText = styled.div`
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

export const Wrapper = styled.div`
  display: flex;
  flex-direction: row;
  height: 64px;
  justify-content: flex-start;
  max-width: 450px;
  width: 30%;
`;
