export default (playlist, trackNumber) => {
  if (!trackNumber) return 0;

  trackNumber--;
  while (!playlist[trackNumber].track.preview_url) {
    trackNumber--;
    if (trackNumber < 0) return -1;
  }

  return trackNumber;
};
