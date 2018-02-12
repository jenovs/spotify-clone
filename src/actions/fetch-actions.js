import * as types from '../actions/action-types';
import { skipUnavailableTracks } from '../utils';

const setToken = token => ({
  type: types.TOKEN_SET,
  token,
});

const playTracks = () => ({
  type: types.PLAY_TRACKS,
});

const setFeatured = featured => ({
  type: types.FEATURED_SET,
  featured,
});

const setGenres = genres => ({
  type: types.GENRES_SET,
  genres,
});

const setPlaylist = playlist => ({
  type: types.PLAYLIST_SET,
  playlist,
});

const setCategoryPlaylist = categoryPlaylist => ({
  type: types.CATEGORY_PLAYLIST_SET,
  categoryPlaylist,
});

const updatePlaylistAndPlay = (playlist, id, songInd) => ({
  type: types.UPDATE_PLAYLIST_AND_PLAY,
  id,
  playlist,
  songInd,
});

const fetchWithToken = (url, token) => {
  return fetch(url, {
    headers: new Headers({
      Authorization: 'Bearer ' + token.access_token,
    }),
  }).then(res => res.json());
};

export const clearCategoryPlaylist = () => ({
  type: types.CATEGORY_PLAYLIST_CLEAR,
});

export const fetchToken = () => dispatch => {
  return fetch('https://spotify.jenovs.com')
    .then(res => res.json())
    .then(token => dispatch(setToken(token)))
    .catch(err => console.log('Error fetching Token', err)); // TODO add error handling
};

export const fetchFeatured = () => (dispatch, getState) => {
  const { token } = getState();
  const url = 'https://api.spotify.com/v1/browse/featured-playlists';

  return fetchWithToken(url, token)
    .then(data => {
      if (data.error) throw data.error.message;
      dispatch(setFeatured(data));
    })
    .catch(err => console.log('Error fetching Featured', err)); // TODO add error handling
};

export const fetchGenres = () => (dispatch, getState) => {
  const { token } = getState();
  const url = 'https://api.spotify.com/v1/browse/categories?limit=50';

  fetchWithToken(url, token)
    .then(data => {
      if (data.error) throw data.error.message;
      dispatch(setGenres(data.categories.items));
    })
    .catch(err => console.error(err));
};

export const fetchCategoryPlaylist = category_id => (dispatch, getState) => {
  const { token } = getState();
  const url = `https://api.spotify.com/v1/browse/categories/${category_id}/playlists?limit=50`;

  fetchWithToken(url, token)
    .then(data => {
      if (data.error) throw data.error.message;
      dispatch(setCategoryPlaylist(data.playlists.items));
    })
    .catch(err => console.error(err));
};

export const fetchPlaylist = id => (dispatch, getState) => {
  const { token } = getState();
  const url = `https://api.spotify.com/v1/users/spotify/playlists/${id}`;

  fetchWithToken(url, token)
    .then(data => {
      if (data.error) throw data.error.message;
      console.log(data);
      dispatch(setPlaylist(data));
    })
    .catch(err => console.log('Error fetching Playlist', err)); // TODO add error handling
};

const setNewReleases = albums => ({
  type: types.NEW_RELEASES_SET,
  albums,
});

export const fetchNewReleases = () => (dispatch, getState) => {
  const { token } = getState();
  const url = 'https://api.spotify.com/v1/browse/new-releases?limit=50';

  fetchWithToken(url, token).then(albums => dispatch(setNewReleases(albums)));
};

const setAlbumPlaylist = albumPlaylist => ({
  type: types.ALBUM_PLAYLIST_SET,
  albumPlaylist,
});

export const fetchAlbumTracks = id => (dispatch, getState) => {
  const { token } = getState();
  const url = `https://api.spotify.com/v1/albums/${id}/tracks?limit=50`;

  fetchWithToken(url, token)
    .then(data => {
      dispatch(setAlbumPlaylist(data.items));
    })
    .catch(err => console.log('>>>>> Error:', err));
};

export const startPlaying = (id, playlistId, songInd = 0) => (
  dispatch,
  getState
) => {
  const { token } = getState();
  const url = `https://api.spotify.com/v1/users/spotify/playlists/${id}`;

  if (id !== playlistId) {
    fetchWithToken(url, token)
      .then(json => {
        const ind = skipUnavailableTracks(json, songInd);
        if (~ind) {
          dispatch(updatePlaylistAndPlay(json, id, ind));
        }
      })
      .catch(err => console.log('>>>>> Error:', err));
  } else {
    dispatch(playTracks());
  }
};
