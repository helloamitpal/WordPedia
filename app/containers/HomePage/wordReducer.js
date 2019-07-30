import { handle } from 'redux-pack';
import * as actionTypes from './actionTypes';

const initialState = {
  words: [],
  wordsOnWeb: [],
  isError: false,
  searchType: '',
  isLoading: false,
  isNoInitWords: false
};

const wordReducer = (state = initialState, action = '') => {
  const { type, payload } = action;

  switch (type) {
    case actionTypes.DELETE_WORD:
    case actionTypes.ADD_WORD:
      return handle(state, action, {
        start: (defaultState) => ({
          ...defaultState,
          isError: false,
          isLoading: true
        }),
        success: (defaultState) => {
          defaultState.words.push(payload.wordDetails);
          return {
            ...defaultState,
            isLoading: false
          };
        },
        failure: (defaultState) => ({
          ...defaultState,
          isLoading: false,
          isError: true
        })
      });

    case actionTypes.LOAD_WORDS:
      return handle(state, action, {
        start: (defaultState) => ({
          ...defaultState,
          isError: false,
          isLoading: true,
          isNoInitWords: false
        }),
        success: (defaultState) => ({
          ...defaultState,
          words: payload,
          isLoading: false,
          isNoInitWords: !(payload && payload.length)
        }),
        failure: (defaultState) => ({
          ...defaultState,
          isError: true,
          isLoading: false,
          isNoInitWords: true
        })
      });

    case actionTypes.SEARCH_WORD:
      return handle(state, action, {
        start: (defaultState) => ({
          ...defaultState,
          isError: false,
          isLoading: (payload.searchType !== 'web'),
          searchType: payload.searchType
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
            isLoading: false,
            words: payload.bookmarkedWords,
            wordsOnWeb: wordsOnWeb || payload.wordsOnWeb
          };
        },
        failure: (defaultState) => ({
          ...defaultState,
          isLoading: false,
          isError: true
        })
      });

    default:
      return state;
  }
};

export default wordReducer;
