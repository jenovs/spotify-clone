import * as types from '../actions/action-types';

const initState = {
  activeTrackId: -1,
  categoryPlaylist: null,
  featured: null,
  genres: [],
  isPaused: false,
  isPlaying: false,
  sectionMessage: null,
  newReleases: null,
  playlist: {},
  playlistView: {},
  token: null,
  tracklist: null,
  tracklistView: null,
};

const playReducer = (state = initState, action) => {
  switch (action.type) {
    case types.PLAY_NEXT_TRACK:
      return {
        ...state,
        activeTrackId: action.activeTrackId,
        isPlaying: true,
        isPaused: false,
      };

    case types.STOP_TRACK: {
      return {
        ...state,
        isPlaying: false,
        isPaused: false,
      };
    }

    case types.TOKEN_SET:
      return {
        ...state,
        token: action.token,
      };

    case types.FEATURED_SET:
      return {
        ...state,
        featured: action.featured,
        tracklist: action.tracklist,
        sectionMessage: action.sectionMessage,
      };

    case types.GENRES_SET:
      return {
        ...state,
        genres: action.genres,
      };

    case types.NEW_RELEASES_SET:
      return {
        ...state,
        newReleases: action.albums,
        sectionMessage: null,
      };

    case types.CATEGORY_PLAYLIST_SET:
      return {
        ...state,
        categoryPlaylist: action.categoryPlaylist,
      };

    case types.CATEGORY_PLAYLIST_CLEAR:
      return {
        ...state,
        categoryPlaylist: null,
      };

    case types.ALBUM_UPDATE:
      return {
        ...state,
        playlist: {
          ...state.playlist,
          ...action.playlist,
        },
        tracklist: action.tracks,
        activeTrackId: action.activeTrackId,
        isPlaying: true,
        isPaused: false,
      };

    case types.PLAYLIST_SET:
      return {
        ...state,
        playlist: {
          ...state.playlist,
          ...action.playlist,
        },
        tracklist: [...action.tracks],
        isPlaying: true,
        isPaused: false,
        activeTrackId: action.trackId,
      };

    case types.PLAY_TRACK:
      return {
        ...state,
        isPlaying: true,
        isPaused: false,
        activeTrackId: action.trackId,
      };

    case types.SET_PAUSE:
      return {
        ...state,
        isPlaying: true,
        isPaused: true,
      };

    case types.COPY_TO_VIEW:
      return {
        ...state,
        playlistView: { ...state.playlist },
        tracklistView: [...state.tracklist],
      };

    case types.COPY_FROM_VIEW_AND_PLAY:
      return {
        ...state,
        playlist: { ...state.playlistView },
        tracklist: [...state.tracklistView],
        isPlaying: true,
        isPaused: false,
        activeTrackId: action.trackId,
      };

    case types.CLEAR_PLAYLIST_VIEW:
      return {
        ...state,
        playlistView: {},
        tracklistView: null,
      };

    case types.UNPAUSE:
      return {
        ...state,
        isPlaying: true,
        isPaused: false,
      };

    case types.SET_PLAYLIST_VIEW:
      return {
        ...state,
        playlistView: { ...action.playlist },
        tracklistView: [...action.tracks],
      };

    case types.STOP_PLAY:
      return {
        ...state,
        activeTrackId: -1,
        isPlaying: false,
        isPaused: false,
        playlist: {},
        tracklist: null,
      };

    default:
      return state;
  }
};

export default playReducer;
