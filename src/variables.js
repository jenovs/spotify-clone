export const gridTemplateColumns = w => {
  switch (true) {
    case w <= 547:
      return 'repeat(2, 1fr)';
    case w >= 548 && w <= 771:
      return 'repeat(3, 1fr)';
    case w >= 772 && w <= 979:
      return 'repeat(4, 1fr)';
    default:
      return 'repeat(6, 1fr)';
  }
};

export const rootUrl = 'https://api.spotify.com/v1';
