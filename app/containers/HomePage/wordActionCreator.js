import * as actionTypes from './actionTypes';

export const searchWordAction = (word, searchType) => (dispatch, getState, { api }) => {
  dispatch({
    type: actionTypes.SEARCH_WORD,
    payload: { searchText: word, searchType },
    promise: api.get(`/api/searchWord/${encodeURI(word)}/${searchType}`).then((res) => res.data)
  });
};

export const loadWordAction = () => (dispatch, getState, { api }) => {
  dispatch({
    type: actionTypes.LOAD_WORDS,
    payload: {},
    promise: api.get('/api/getAllWords').then((res) => res.data)
  });
};
