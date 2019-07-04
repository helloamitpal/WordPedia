import * as types from './actionTypes';

export const selectWordAction = (word) => ({
  type: types.SELECTED_WORD,
  word
});

export const searchWordAction = (payload) => ({
  type: types.SEARCH_WORD_REQUEST,
  payload
});
