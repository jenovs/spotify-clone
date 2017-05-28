import * as types from './action-types';
export * from './fetch-actions';
export * from './player-control-actions';

export const setPause = () => ({
  type: types.SET_PAUSE,
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
  playlist,
  songInd: skipUnavailableTracks(playlist, songInd),
});

export const startPlaying = (id, playlistId, songInd = 0) => (dispatch, getState) => {
  console.log('startPlaying', id, playlistId, songInd);
  const { token } = getState();
  if (id !== playlistId) {
    fetch(`https://api.spotify.com/v1/users/spotify/playlists/${id}`, {
      headers: {Authorization: "Bearer " + token.access_token}
    })
    .then(res => res.json())
    .then(json => {
      dispatch(updatePlaylistAndPlay(json, id, songInd));
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
