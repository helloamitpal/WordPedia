import { handle } from 'redux-pack';
import * as actionTypes from './actionTypes';
// import * as WordService from './wordService';

const initialState = {
  words: [],
  wordsOnWeb: [],
  isError: false,
  searchType: ''
};

const wordReducer = (state = initialState, action = '') => {
  const { type, payload } = action;

  switch (type) {
    case actionTypes.LOAD_WORDS:
      return handle(state, action, {
        start: (defaultState) => ({
          ...defaultState,
          isError: false
        }),
        success: (defaultState) => ({
          ...defaultState,
          words: payload
        }),
        failure: (defaultState) => ({
          ...defaultState,
          isError: true
        })
      });

    case actionTypes.SEARCH_WORD:
      return handle(state, action, {
        start: (defaultState) => ({
          ...defaultState,
          isError: false,
          searchType: state.searchType
        }),
        success: (defaultState) => {
          let wordsOnWeb;
          if (payload.wordDetails) {
            wordsOnWeb = [];
            defaultState.wordsOnWeb.forEach((obj) => {
              wordsOnWeb.push((obj.word === payload.wordDetails.word) ? payload.wordDetails : obj);
            });
          }

          return {
            ...defaultState,
            words: payload.bookmarkedWords,
            wordsOnWeb: wordsOnWeb || payload.wordsOnWeb
          };
        },
        failure: (defaultState) => ({
          ...defaultState,
          isError: true
        })
      });

    default:
      return state;
  }
};

export default wordReducer;
