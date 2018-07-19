export default (playlist, nr) => {
  let trackNumber = nr;
  if (!playlist) {
    return 0;
  }
  if (trackNumber >= playlist.length) {
    return -1;
  }

  while (!playlist[trackNumber].track.preview_url) {
    trackNumber += 1;
    if (trackNumber >= playlist.length) {
      return -1;
    }
  }

  return trackNumber;
};
