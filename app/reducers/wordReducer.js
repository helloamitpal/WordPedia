import initialState from './initialState';
import * as types from '../constants/actionTypes';

export default function (state = initialState.words, action) {
  switch (action.type) {
    case types.WORDS_SUCCESS:
      return action.words;
    case types.SELECTED_WORD:
      return { ...state, selectedWord: action.word };
    default:
      return state;
  }
}
