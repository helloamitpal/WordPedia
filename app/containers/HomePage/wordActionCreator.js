import * as actionTypes from './actionTypes';

export const searchWordAction = (word) => (dispatch, getState, { api }) => {
  dispatch({
    type: actionTypes.SEARCH_WORD,
    payload: { searchText: word },
    promise: api.get('/api/getAllWords').then((res) => res.data)
  });
};
