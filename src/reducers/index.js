const initState = {
  playing: false,
  playlistId: null,
  songId: null,
}

const playReducer = (state = initState, action) => {
  switch (action.type) {
    case 'SET_PLAYING':
      return {...state, playing: true, playlistId: action.id}
    default:
      return state;
  }
}

export default playReducer;
