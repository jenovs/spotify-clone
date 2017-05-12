const playReducer = (state = {}, action) => {
  switch (action.type) {
    case 'SET_PLAYING':
      return Object.assign({}, {...state}, {playing: true});
      break;
    default:
  }
}

export default playReducer;
