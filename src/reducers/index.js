import * as types from '../actions/action-types';

const initState = {
  activeTrackId: -1,
  categoryPlaylist: null,
  featured: null,
  genres: [],
  isPaused: false,
  isPlaying: false,
  newReleases: null,
  playlist: {},
  playlistView: {},
  sectionMessage: null,
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
        isPaused: false,
        isPlaying: true,
      };

    case types.STOP_TRACK: {
      return {
        ...state,
        isPaused: false,
        isPlaying: false,
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
        sectionMessage: action.sectionMessage,
        tracklist: action.tracklist,
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
        activeTrackId: action.activeTrackId,
        isPaused: false,
        isPlaying: true,
        playlist: {
          ...state.playlist,
          ...action.playlist,
        },
        tracklist: action.tracks,
      };

    case types.PLAYLIST_SET:
      return {
        ...state,
        activeTrackId: action.trackId,
        isPaused: false,
        isPlaying: true,
        playlist: {
          ...state.playlist,
          ...action.playlist,
        },
        tracklist: [...action.tracks],
      };

    case types.PLAY_TRACK:
      return {
        ...state,
        activeTrackId: action.trackId,
        isPaused: false,
        isPlaying: true,
      };

    case types.SET_PAUSE:
      return {
        ...state,
        isPaused: true,
        isPlaying: true,
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
        activeTrackId: action.trackId,
        isPaused: false,
        isPlaying: true,
        playlist: { ...state.playlistView },
        tracklist: [...state.tracklistView],
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
        isPaused: false,
        isPlaying: true,
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
        isPaused: false,
        isPlaying: false,
        playlist: {},
        tracklist: null,
      };

    default:
      return state;
  }
};

export default playReducer;
