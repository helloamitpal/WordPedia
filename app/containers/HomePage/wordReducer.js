import { handle } from 'redux-pack';
import * as actionTypes from './actionTypes';
// import * as WordService from './wordService';

const initialState = {
  words: [],
  isError: false
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

    default:
      return state;
  }
};

export default wordReducer;
