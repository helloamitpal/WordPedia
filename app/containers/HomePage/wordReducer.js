import * as types from './actionTypes';

const initialWords = [];

export default function (state = initialWords, action) {
  switch (action.type) {
    case types.WORDS_SUCCESS:
      return action.words;
    case types.SELECTED_WORD:
      return { ...state, selectedWord: action.word };
    default:
      return state;
  }
}
