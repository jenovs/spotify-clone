import * as types from './action-types';
import { skipUnavailableTracks } from '../utils';

export * from './fetch-actions';
export * from './player-control-actions';

export const setPause = () => ({
  type: types.SET_PAUSE,
});

const playTracks = () => ({
  type: types.PLAY_TRACKS,
});

const updatePlaylistAndPlay = (playlist, id, songInd) => ({
  type: types.UPDATE_PLAYLIST_AND_PLAY,
  id,
  playlist,
  songInd,
});

export const startPlaying = (id, playlistId, songInd = 0) => (
  dispatch,
  getState
) => {
  console.log('startPlaying', id, playlistId, songInd);
  const { token } = getState();
  if (id !== playlistId) {
    fetch(`https://api.spotify.com/v1/users/spotify/playlists/${id}`, {
      headers: { Authorization: 'Bearer ' + token.access_token },
    })
      .then(res => res.json())
      .then(json => {
        const ind = skipUnavailableTracks(json, songInd);
        console.log('songInd', songInd, ind);
        if (~ind) {
          dispatch(updatePlaylistAndPlay(json, id, ind));
        }
      })
      .catch(err => console.log('>>>>> Error:', err));
  } else {
    dispatch(playTracks());
  }
};
