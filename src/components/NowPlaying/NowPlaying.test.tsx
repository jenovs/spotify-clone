import React from 'react';
import ReactDOM from 'react-dom';
import { cleanup, getByAltText, render } from '@testing-library/react';

import NowPlaying from './NowPlaying';
import { IProps } from './NowPlaying';

const props: IProps = {
  artist: 'Foo',
  src: 'some_url',
  title: 'Bar',
};

afterAll(cleanup);

describe('NowPlaying component', () => {
  it('should render', () => {
    const div = document.createElement('div');
    ReactDOM.render(<NowPlaying {...props} />, div);
    ReactDOM.unmountComponentAtNode(div);
  });

  it('should display image, artist name and song title', () => {
    const { container, getByText } = render(<NowPlaying {...props} />);

    // artist is displayed
    expect(getByText('Foo')).toBeVisible();
    // title is displayed
    expect(getByText('Bar')).toBeVisible();
    // image is displayed
    const imageEl = getByAltText(container, 'Foo - Bar') as HTMLImageElement;
    expect(imageEl).toBeVisible();
    expect(imageEl.src.includes('some_url')).toBeTruthy();
  });
});
