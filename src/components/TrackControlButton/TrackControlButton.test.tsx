import React from 'react';
import ReactDOM from 'react-dom';
import { cleanup, fireEvent, render } from '@testing-library/react';
import 'jest-dom/extend-expect';

import TrackControlButton from './TrackControlButton';
import { IProps } from './TrackControlButton';

const mockHandlePause = jest.fn();
const mockHandlePlay = jest.fn();
const mockUnpause = jest.fn();

const props: IProps = {
  handlePause: mockHandlePause,
  handlePlay: mockHandlePlay,
  hasPreview: true,
  isActive: false,
  isHovered: false,
  isPlaying: false,
  nr: 0,
  unpause: mockUnpause,
};

afterEach(() => {
  cleanup();
  mockHandlePause.mockReset();
  mockHandlePlay.mockReset();
  mockUnpause.mockReset();
});

describe('PlaylistPlayButton component', () => {
  it('should render', () => {
    const div = document.createElement('div');
    ReactDOM.render(<TrackControlButton {...props} />, div);
    ReactDOM.unmountComponentAtNode(div);
  });

  it('should display an ordinal number', () => {
    const { getByText } = render(<TrackControlButton {...props} />);

    expect(getByText('1.')).toBeVisible();
  });

  // Following tests are not quite good because they test implementation (depends on the class name)
  it('should display play icon', () => {
    const { getByRole } = render(
      <TrackControlButton {...props} isPlaying={true} />
    );
    expect(getByRole('img')).toHaveClass('fa-volume-up');
  });

  it('should display pause icon and pause on click', () => {
    const { getByRole } = render(
      <TrackControlButton
        {...props}
        isActive={true}
        isHovered={true}
        isPlaying={true}
      />
    );

    const btn = getByRole('img');
    expect(btn).toHaveClass('fa-pause');
    fireEvent.click(btn);
    expect(mockHandlePause).toBeCalled();
  });
});
