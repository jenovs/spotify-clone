import * as types from '../actions/action-types';

const setToken = token => ({
  type: types.TOKEN_SET,
  token,
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

const fetchWithToken = (url, token) => {
  return fetch(url, {
    headers: new Headers({
      Authorization: 'Bearer ' + token.access_token,
    }),
  });
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

  return fetch('https://api.spotify.com/v1/browse/featured-playlists', {
    headers: new Headers({
      Authorization: 'Bearer ' + token.access_token,
    }),
  })
    .then(res => res.json())
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
    .then(res => res.json())
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
    .then(res => res.json())
    .then(data => {
      if (data.error) throw data.error.message;
      dispatch(setCategoryPlaylist(data.playlists.items));
    })
    .catch(err => console.error(err));
};

export const fetchPlaylist = id => (dispatch, getState) => {
  const { token } = getState();

  fetch(`https://api.spotify.com/v1/users/spotify/playlists/${id}`, {
    headers: { Authorization: 'Bearer ' + token.access_token },
  })
    .then(res => res.json())
    .then(data => {
      if (data.error) throw data.error.message;
      dispatch(setPlaylist(data));
    })
    .catch(err => console.log('Error fetching Playlist', err)); // TODO add error handling
};
