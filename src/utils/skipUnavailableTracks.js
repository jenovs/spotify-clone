export default (playlist, trackNumber) => {
  if (!playlist) return 0;
  if (trackNumber >= playlist.length) return -1;

  while (!playlist[trackNumber].track.preview_url) {
    trackNumber++;
    if (trackNumber >= playlist.length) return -1;
  }

  return trackNumber;
};
