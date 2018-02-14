import React, { Component } from 'react';
import { connect } from 'react-redux';

import * as actions from '../../actions';

import CoverArt from '../../components/CoverArt';
import Loading from '../Loading';
import { Header, Wrapper } from './styled';

import { gridTemplateColumns, rootUrl } from '../../variables';

class AlbumsView extends Component {
  componentDidMount() {
    this.props.fetchNewReleases();
  }

  handleClick = (href, playClicked) => {
    const {
      activePlaylistHref,
      history,
      isPlaying,
      setPause,
      startAlbum,
    } = this.props;
    if (playClicked) {
      if (isPlaying && href === activePlaylistHref) {
        return setPause();
      } else {
        return startAlbum(href);
      }
    }
    if (history) {
      return history.push(`/${href.replace(rootUrl + '/', '')}`);
    }
  };

  render() {
    const {
      activePlaylistHref,
      isPlaying,
      items,
      noPreview,
      windowWidth,
    } = this.props;
    if (!items) return <Loading />;

    return (
      <div>
        <Header danger={noPreview}>
          {noPreview ? 'No preview available :(' : 'New Albums and Singles'}
        </Header>
        <Wrapper template={gridTemplateColumns(windowWidth)}>
          {items.map(item => {
            return (
              <CoverArt
                handleClick={this.handleClick}
                history={this.props.history}
                href={item.href}
                icon={item.images[0].url}
                id={item.id}
                key={item.id}
                name={item.name}
                playlistId={item.id}
                showPlayBtn={activePlaylistHref === item.href && isPlaying}
              />
            );
          })}
        </Wrapper>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  items: state.newReleases ? state.newReleases.albums.items : [],
  activePlaylistHref: state.playlist.href,
  isPlaying: state.isPlaying,
  noPreview: state.noPreview,
});

const mapDispatchToProps = (dispatch, getState) => ({
  fetchNewReleases: () => {
    dispatch(actions.fetchNewReleases());
  },
  fetchAlbum: url => {
    dispatch(actions.fetchAlbum(url));
  },
  startAlbum: href => {
    dispatch(actions.startAlbum({ href }));
  },
  setPause: () => {
    dispatch(actions.setPause());
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(AlbumsView);
