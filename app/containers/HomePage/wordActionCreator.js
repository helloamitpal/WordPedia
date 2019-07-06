import * as actionTypes from './actionTypes';

export const searchWordAction = (word) => (dispatch, getState, { api }) => {
  dispatch({
    type: actionTypes.SEARCH_WORD,
    payload: { searchText: word },
    promise: api.get(`/api/searchWord/${encodeURI(word)}`).then((res) => res.data)
  });
};

export const loadWordAction = (offset) => (dispatch, getState, { api }) => {
  dispatch({
    type: actionTypes.LOAD_WORDS,
    payload: {},
    promise: api.get(`/api/getAllWords/${offset}`).then((res) => res.data)
  });
};
