import { handle } from 'redux-pack';
import * as actionTypes from './actionTypes';

const initialState = {
  words: [],
  wordsOnWeb: [],
  isError: false,
  searchType: '',
  updated: false,
  isLoading: false,
  isNoInitWords: false
};

const wordReducer = (state = initialState, action = '') => {
  const { type, payload } = action;

  switch (type) {
    case actionTypes.ADD_WORD:
    case actionTypes.DELETE_WORD:
      return handle(state, action, {
        start: (defaultState) => ({
          ...defaultState,
          isError: false,
          updated: false
        }),
        success: (defaultState) => ({
          ...defaultState,
          updated: payload
        }),
        failure: (defaultState) => ({
          ...defaultState,
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
          isLoading: true,
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
