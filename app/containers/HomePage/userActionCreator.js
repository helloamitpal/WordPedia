import { toast } from 'react-toastify';

import * as actionTypes from './userActionTypes';

export const searchWordAction = (word, searchType, synonym, userId) => (dispatch, getState, { api }) => {
  dispatch({
    type: actionTypes.SEARCH_WORD,
    payload: { searchText: word, searchType, isSynonym: !!synonym },
    promise: api.get(`/api/searchWord/${encodeURI(word)}/${searchType}/${userId}`).then((res) => res.data, () => {
      toast.error('Something went wrong in searching. Please try again!');
      throw new Error();
    })
  });
};

export const loadWordAction = (userId) => (dispatch, getState, { api }) => {
  dispatch({
    type: actionTypes.LOAD_WORDS,
    payload: {},
    promise: api.get(`/api/getAllWords/${userId}`).then((res) => res.data, () => {
      toast.error('Something went wrong in loading words. Please try again!');
      throw new Error();
    })
  });
};

export const addWordAction = (wordDetails, userId, toastText) => (dispatch, getState, { api }) => {
  dispatch({
    type: actionTypes.ADD_WORD,
    payload: {},
    promise: api.post('/api/addWordToCollection', { ...wordDetails, userId }).then((res) => {
      toast.success(toastText || `${wordDetails.word} has been bookmarked`);
      return res.data;
    }, () => {
      toast.error('Something went wrong in bookmarking word. Please try again!');
      throw new Error();
    })
  });
};

export const deleteWordAction = (word, userId) => (dispatch, getState, { api }) => {
  dispatch({
    type: actionTypes.DELETE_WORD,
    payload: { word },
    promise: api.delete(`/api/deleteWord/${encodeURI(word)}/${userId}`).then((res) => {
      return res.data;
    }, () => {
      toast.error('Something went wrong in deleting word. Please try again!');
      throw new Error();
    })
  });
};

export const registerUser = (userDetails) => (dispatch, getState, { api }) => {
  dispatch({
    type: actionTypes.REGISTER_USER,
    payload: { userDetails },
    promise: api.post('/api/register', userDetails).then((res) => {
      if (typeof res === 'object' && res.Status === 'USER_REGISTERED') {
        toast.info('You have already been registered');
      } else {
        toast.success('You are registered successfully');
      }
      return res.data;
    }, () => {
      toast.error('Something went wrong in registration. Please try again!');
      throw new Error();
    })
  });
};

export const logoutUser = (userDetails) => (dispatch, getState, { api }) => {
  dispatch({
    type: actionTypes.LOGOUT_USER,
    payload: {},
    promise: api.post('/api/logout', userDetails).then((res) => {
      toast.success('You are de-registered out successfully');
      return res.data;
    }, () => {
      toast.error('Something went wrong in de-registration. Please try again!');
      throw new Error();
    })
  });
};

export const updateUser = (userDetails) => (dispatch, getState, { api }) => {
  dispatch({
    type: actionTypes.UPDATE_USER,
    payload: {},
    promise: api.put('/api/updateUser', userDetails).then((res) => {
      toast.success('Preferences are saved successfully');
      return res.data;
    }, () => {
      toast.error('Something went wrong in saving user preferences. Please try again!');
      throw new Error();
    })
  });
};
