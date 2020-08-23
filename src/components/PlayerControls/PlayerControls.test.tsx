import React from 'react';
import ReactDOM from 'react-dom';
import { cleanup, fireEvent, render } from '@testing-library/react';

import PlayerControls from './PlayerControls';
import { IProps } from './PlayerControls';

const mockNext = jest.fn();
const mockPause = jest.fn();
const mockPlay = jest.fn();
const mockPrev = jest.fn();

const props: IProps = {
  handleNext: mockNext,
  handlePause: mockPause,
  handlePlay: mockPlay,
  handlePrev: mockPrev,
  hasNextTrack: false,
  hasPrevTrack: false,
  isPlaying: false,
};

afterEach(() => {
  cleanup();
  mockNext.mockReset();
  mockPause.mockReset();
  mockPlay.mockReset();
  mockPrev.mockReset();
});

describe('NowPlaying component', () => {
  it('should render', () => {
    const div = document.createElement('div');
    ReactDOM.render(<PlayerControls {...props} />, div);
    ReactDOM.unmountComponentAtNode(div);
  });

  it('should display play button and two disabled skip buttons', () => {
    const { getByTestId, queryByTestId } = render(
      <PlayerControls {...props} />
    );

    // show play button
    expect(getByTestId('play-btn')).toBeVisible();
    expect(getByTestId('play-btn')).not.toBeDisabled();
    // doesn't show pause button
    expect(queryByTestId('pause-btn')).toBeNull();
    // show disabled prev button
    expect(getByTestId('prev-btn')).toBeVisible();
    expect(getByTestId('prev-btn')).toBeDisabled();
    // show disabled next button
    expect(getByTestId('next-btn')).toBeVisible();
    expect(getByTestId('next-btn')).toBeDisabled();

    // user can click play button
    fireEvent.click(getByTestId('play-btn'));
    expect(mockPlay).toBeCalled();

    // user can't click next button
    fireEvent.click(getByTestId('next-btn'));
    expect(mockNext).not.toBeCalled();

    // user can't click prev button
    fireEvent.click(getByTestId('prev-btn'));
    expect(mockPrev).not.toBeCalled();
  });

  it('should display pause button and two disabled skip buttons', () => {
    const { getByTestId, queryByTestId } = render(
      <PlayerControls {...props} isPlaying={true} />
    );

    // doesn't show play button
    expect(queryByTestId('play-btn')).toBeNull();
    // show pause button
    expect(getByTestId('pause-btn')).toBeVisible();
    expect(getByTestId('pause-btn')).not.toBeDisabled();
    // show disabled prev button
    expect(getByTestId('prev-btn')).toBeVisible();
    expect(getByTestId('prev-btn')).toBeDisabled();
    // show disabled next button
    expect(getByTestId('next-btn')).toBeVisible();
    expect(getByTestId('next-btn')).toBeDisabled();

    // user can click pause button
    fireEvent.click(getByTestId('pause-btn'));
    expect(mockPause).toBeCalled();

    // user can't click next button
    fireEvent.click(getByTestId('next-btn'));
    expect(mockNext).not.toBeCalled();

    // user can't click prev button
    fireEvent.click(getByTestId('prev-btn'));
    expect(mockPrev).not.toBeCalled();
  });

  it('should display pause button and two skip buttons', () => {
    const { getByTestId, queryByTestId } = render(
      <PlayerControls
        {...props}
        isPlaying={true}
        hasNextTrack={true}
        hasPrevTrack={true}
      />
    );

    // doesn't show play button
    expect(queryByTestId('play-btn')).toBeNull();
    // show pause button
    expect(getByTestId('pause-btn')).toBeVisible();
    expect(getByTestId('pause-btn')).not.toBeDisabled();
    // show prev button
    expect(getByTestId('prev-btn')).toBeVisible();
    expect(getByTestId('prev-btn')).not.toBeDisabled();
    // show next button
    expect(getByTestId('next-btn')).toBeVisible();
    expect(getByTestId('next-btn')).not.toBeDisabled();

    // user can click pause button
    fireEvent.click(getByTestId('pause-btn'));
    expect(mockPause).toBeCalled();

    // user can click next button
    fireEvent.click(getByTestId('next-btn'));
    expect(mockNext).toBeCalled();

    // user can click prev button
    fireEvent.click(getByTestId('prev-btn'));
    expect(mockPrev).toBeCalled();
  });
});
