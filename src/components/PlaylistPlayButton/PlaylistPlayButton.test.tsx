import React from 'react';
import ReactDOM from 'react-dom';
import { cleanup, fireEvent, render } from '@testing-library/react';

import PlaylistPlayButton from './PlaylistPlayButton';
import { IProps } from './PlaylistPlayButton';

const mockOnClick = jest.fn();

const props: IProps = {
  isPlaying: false,
  onClick: mockOnClick,
};

afterEach(() => {
  cleanup();
  mockOnClick.mockReset();
});

describe('PlaylistPlayButton component', () => {
  it('should render', () => {
    const div = document.createElement('div');
    ReactDOM.render(<PlaylistPlayButton {...props} />, div);
    ReactDOM.unmountComponentAtNode(div);
  });

  it('should display a button with a text PLAY', () => {
    const { getByText } = render(<PlaylistPlayButton {...props} />);

    const btn = getByText('PLAY');
    expect(btn).toBeVisible();
    fireEvent.click(btn);
    expect(mockOnClick).toBeCalled();
  });

  it('should display a button with a text PAUSE', () => {
    const { getByText } = render(
      <PlaylistPlayButton {...props} isPlaying={true} />
    );

    const btn = getByText('PAUSE');
    expect(btn).toBeVisible();
    fireEvent.click(btn);
    expect(mockOnClick).toBeCalled();
  });
});
