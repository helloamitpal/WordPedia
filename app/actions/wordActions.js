import * as types from '../constants/actionTypes';

export const selectWordAction = (word) => ({
  type: types.SELECTED_WORD,
  word
});

export const searchWordAction = (payload) => ({
  type: types.SEARCH_WORD_REQUEST,
  payload
});

// export const searchWordAction = (payload) => (dispatch) => {
//   dispatch({
//     type: types.SEARCH_WORD_REQUEST,
//     payload
//   });
// };
//
// export const selectWordAction = (payload) => (dispatch) => {
//   dispatch({
//     type: types.SELECTED_WORD,
//     payload
//   });
// };
