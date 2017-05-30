export const skipUnavailableTracks = (playlist, trackNumber) => {
  if (!playlist) return 0;
  if (trackNumber >= playlist.tracks.items.length) return -1;

  while (!playlist.tracks.items[trackNumber].track.preview_url) {
    trackNumber++;
    if (trackNumber >= playlist.tracks.items.length) return -1;
  }

  return trackNumber;
}

export const searchPrevTrack = (playlist, trackNumber) => {
  if (!trackNumber) return 0;

  trackNumber--;
  while (!playlist.tracks.items[trackNumber].track.preview_url) {
    trackNumber--;
    if (trackNumber < 0) return -1;
  }

  return trackNumber;
}
