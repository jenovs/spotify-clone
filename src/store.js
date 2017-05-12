// import { createStore, combineReducers } from 'redux';
import { applyMiddleware, compose, createStore } from 'redux';
import thunk from 'redux-thunk';

import reducers from './reducers';

// const reducer = (state = {}, action) => {
//   return state;
// }

// const store = createStore(reducers);
const store = createStore(reducers, compose(applyMiddleware(thunk), window.devToolsExtension ? window.devToolsExtension() : noop => noop));


export default store;
