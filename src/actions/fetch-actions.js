import * as types from '../actions/action-types';

const setToken = token => ({
  type: types.TOKEN_SET,
  token,
});

const setFeatured = featured => ({
  type: types.FEATURED_SET,
  featured,
});

const setPlaylist = playlist => ({
  type: types.PLAYLIST_SET,
  playlist,
})

export const fetchToken = () => dispatch => {
  return fetch('http://localhost:3001')
  .then(res => res.json())
  .then(token => dispatch(setToken(token)))
  .catch(err => console.log('Error fetching Token', err)); // TODO add error handling
}

export const fetchFeatured = () => (dispatch, getState) => {
  const { token } = getState();

  return fetch('https://api.spotify.com/v1/browse/featured-playlists', {
    headers: new Headers({
      Authorization: "Bearer " + token.access_token,
    }),
  })
  .then(res => res.json())
  .then(data => {
    if (data.error) throw data.error.message;
    dispatch(setFeatured(data));
  })
  .catch(err => console.log('Error fetching Featured', err)) // TODO add error handling
}

export const fetchPlaylist = id => (dispatch, getState) => {
  const { token } = getState();

  fetch(`https://api.spotify.com/v1/users/spotify/playlists/${id}`, {
    headers: {Authorization: "Bearer " + token.access_token}
  })
  .then(res => res.json())
  .then(data => {
    if (data.error) throw data.error.message;
    dispatch(setPlaylist(data));
  })
  .catch(err => console.log('Error fetching Playlist', err)) // TODO add error handling
}
