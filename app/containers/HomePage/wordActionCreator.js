import * as actionTypes from './actionTypes';

export const searchWordAction = (word) => (dispatch, getState, { api }) => {
  dispatch({
    type: actionTypes.SEARCH_WORD,
    payload: { searchText: word },
    promise: api.get(`/api/searchWord/${encodeURI(word)}`).then((res) => res.data)
  });
};

export const loadWordAction = () => (dispatch, getState, { api }) => {
  dispatch({
    type: actionTypes.LOAD_WORDS,
    payload: {},
    promise: api.get('/api/getAllWords').then((res) => res.data)
  });
};
