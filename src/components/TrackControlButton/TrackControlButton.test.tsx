import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';

import TrackControlButton, { IProps } from './TrackControlButton';

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
  mockHandlePause.mockReset();
  mockHandlePlay.mockReset();
  mockUnpause.mockReset();
});

describe('PlaylistPlayButton component', () => {
  it('should display an ordinal number', () => {
    render(<TrackControlButton {...props} />);

    expect(screen.getByText('1.')).toBeVisible();
  });

  // Following tests are not quite good because they test implementation (depends on the class name)
  it('should display play icon', () => {
    render(<TrackControlButton {...props} isPlaying={true} />);

    expect(screen.getByRole('img', { hidden: true })).toHaveClass(
      'fa-volume-up'
    );
  });

  it('should display pause icon and pause on click', () => {
    render(
      <TrackControlButton
        {...props}
        isActive={true}
        isHovered={true}
        isPlaying={true}
      />
    );

    const btn = screen.getByRole('img', { hidden: true });

    expect(btn).toHaveClass('fa-pause');

    fireEvent.click(btn);

    expect(mockHandlePause).toBeCalled();
  });
});
