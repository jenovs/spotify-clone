export default (playlist, nr) => {
  let trackNumber = nr;
  if (trackNumber <= 0) {
    return -1;
  }

  trackNumber -= 1;
  while (!playlist[trackNumber].track.preview_url) {
    trackNumber -= 1;
    if (trackNumber < 0) {
      return -1;
    }
  }

  return trackNumber;
};
