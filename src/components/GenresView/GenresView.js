import React from 'react';
import { connect } from 'react-redux';

import * as actions from '../../actions';
import idFromHref from '../../utils/idFromHref';

import CoverArt from '../CoverArt';
import { Header, Wrapper } from './styled';

const gridTemplateColumns = w => {
  switch (true) {
    case w <= 547:
      return 'repeat(2, minmax(16px, 218px))';
    case w >= 548 && w <= 771:
      return 'repeat(3, minmax(146px, 230px))';
    case w >= 772 && w <= 979:
      return 'repeat(4, minmax(166px, 217px))';
    default:
      return 'repeat(6, minmax(145px, 230px))';
  }
};

class Genres extends React.Component {
  componentDidMount() {
    this.props.fetchGenres();
  }

  navigate = url => {
    const { history } = this.props;
    history.push(`/view/${idFromHref(url)}`);
  };

  render() {
    const { genres } = this.props;
    return (
      <React.Fragment>
        <Header>Genres & Moods</Header>
        <Wrapper template={gridTemplateColumns(this.props.windowWidth)}>
          {genres.map(genre => (
            <CoverArt
              key={genre.id}
              icon={genre.icons[0].url}
              handleClick={this.navigate}
              playBtn={false}
              {...genre}
            />
          ))}
        </Wrapper>
      </React.Fragment>
    );
  }
}

const mapStateToProps = state => ({
  genres: state.genres,
});

const mapDispatchToProps = (dispatch, getState) => ({
  fetchGenres: () => {
    dispatch(actions.fetchGenres());
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(Genres);
