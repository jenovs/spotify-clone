import * as types from './action-types';
import { getToken } from '../helpers';

if (!localStorage.getItem('token')) getToken();

const token = JSON.parse(localStorage.getItem('token')).access_token;

export const setPause = (id) => ({
  type: types.SET_PAUSE,
  id,
});

const playTracks = () => ({
  type: types.PLAY_TRACKS,
});

export const playNextTrack = (playlist, songInd) => ({
  type: types.PLAY_NEXT_TRACK,
  songInd: skipUnavailableTracks(playlist, songInd + 1),
});

const updatePlaylistAndPlay = (playlist, id, songInd) => ({
  type: types.UPDATE_PLAYLIST_AND_PLAY,
  id,
  songInd: skipUnavailableTracks(playlist, songInd),
  playlist,
});

export const startPlaying = (id, playlistId) => dispatch => {
  if (id !== playlistId) {
    fetch(`https://api.spotify.com/v1/users/spotify/playlists/${id}`, {
      headers: {Authorization: "Bearer " + token}
    })
    .then(res => res.json())
    .then(json => {
      dispatch(updatePlaylistAndPlay(json, id, 0));
    })
    .catch(err => console.log('>>>>> Error:', err));
  } else {
    dispatch(playTracks());
  }
}

function skipUnavailableTracks(playlist, trackNumber) {
  if (!playlist) return 0;
  if (trackNumber >= playlist.tracks.items.length) return -1;

  while (!playlist.tracks.items[trackNumber].track.preview_url) {
    trackNumber++;
    if (trackNumber >= playlist.tracks.items.length) return -1;
  }
  return trackNumber;
}
