import { toast } from 'react-toastify';

import * as actionTypes from './actionTypes';

export const searchWordAction = (word, searchType, synonym) => (dispatch, getState, { api }) => {
  dispatch({
    type: actionTypes.SEARCH_WORD,
    payload: { searchText: word, searchType, isSynonym: !!synonym },
    promise: api.get(`/api/searchWord/${encodeURI(word)}/${searchType}`).then((res) => res.data, () => {
      toast.error('Something went wrong. Please try again!');
      return null;
    })
  });
};

export const loadWordAction = () => (dispatch, getState, { api }) => {
  dispatch({
    type: actionTypes.LOAD_WORDS,
    payload: {},
    promise: api.get('/api/getAllWords').then((res) => res.data, () => {
      toast.error('Something went wrong. Please try again!');
      return null;
    })
  });
};

export const addWordAction = (wordDetails) => (dispatch, getState, { api }) => {
  dispatch({
    type: actionTypes.ADD_WORD,
    payload: {},
    promise: api.post('/api/addWordToCollection', wordDetails).then((res) => {
      toast.success(`${wordDetails.word} has been bookmarked."`);
      return res.data;
    }, () => {
      toast.error('Something went wrong. Please try again!');
      return null;
    })
  });
};

export const deleteWordAction = (word) => (dispatch, getState, { api }) => {
  dispatch({
    type: actionTypes.DELETE_WORD,
    payload: { word },
    promise: api.delete(`/api/deleteWord/${encodeURI(word)}`).then((res) => {
      toast.success(`${word} has been removed from bookmark."`);
      return res.data;
    }, () => {
      toast.error('Something went wrong. Please try again!');
      return null;
    })
  });
};
