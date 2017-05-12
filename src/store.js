import { connect } from 'react-redux';
import { createStore, combineReducers } from 'redux';

import reducers from './reducers';

// const reducer = (state = {}, action) => {
//   return state;
// }

const store = createStore(reducers);

export default store;
