import React from 'react';
import ReactDOM from 'react-dom';

import NowPlaying from './NowPlaying';
import { IProps } from './NowPlaying';

const props: IProps = {
  artist: 'Foo',
  src: 'some_url',
  title: 'Bar',
};

describe('NowPlaying component', () => {
  it('should render', () => {
    const div = document.createElement('div');
    ReactDOM.render(<NowPlaying {...props} />, div);
    ReactDOM.unmountComponentAtNode(div);
  });
});
