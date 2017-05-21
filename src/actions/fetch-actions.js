import * as utils from '../utils';
import * as types from '../actions/action-types';

const setToken = token => ({
  type: types.TOKEN_SET,
  token,
});

const setFeatured = featured => ({
  type: types.FEATURED_SET,
  featured,
});

export const fetchToken = () => async dispatch => {
  dispatch(setToken(await utils.fetchToken()));
};

export const fetchFeatured = () => async (dispatch, getState) => {
  const { token } = getState();

  const data = await utils.fetchFeatured(token);
  dispatch(setFeatured(data));
};
