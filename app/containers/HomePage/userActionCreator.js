import { toast } from 'react-toastify';

import * as actionTypes from './userActionTypes';

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

export const registerUser = (userDetails) => (dispatch, getState, { api }) => {
  dispatch({
    type: actionTypes.REGISTER_USER,
    payload: { userDetails },
    promise: api.post('/api/register', userDetails).then((res) => {
      if (typeof res === 'object' && res.Status === 'USER_REGISTERED') {
        toast.info('You have already been registered.');
      } else {
        toast.success('You have been registered successfully.');
      }
      return res.data;
    }, () => {
      toast.error('Something went wrong. Please try again!');
      return null;
    })
  });
};

export const logoutUser = (userDetails) => (dispatch, getState, { api }) => {
  dispatch({
    type: actionTypes.LOGOUT_USER,
    payload: {},
    promise: api.post('/api/logout', userDetails).then((res) => {
      toast.success('You are logged out successfully.');
      return res.data;
    }, () => {
      toast.error('Something went wrong. Please try again!');
      return null;
    })
  });
};

export const updateUser = (userDetails) => (dispatch, getState, { api }) => {
  dispatch({
    type: actionTypes.UPDATE_USER,
    payload: {},
    promise: api.put('/api/updateUser', userDetails).then((res) => {
      toast.success('Changes are saved successfully.');
      return res.data;
    }, () => {
      toast.error('Something went wrong. Please try again!');
      return null;
    })
  });
};