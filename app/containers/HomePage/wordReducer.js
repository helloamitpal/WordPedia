import { handle } from 'redux-pack';
import * as actionTypes from './actionTypes';
import * as WordService from './wordService';

const initialState = {
  words: [],
  isError: false
};

// reducer function to synthesize data if required
const wordReducer = (state = initialState, action = '') => {
  const { type, payload } = action;

  switch (type) {
    case actionTypes.SEARCH_WORD:
      return handle(state, action, {
        start: (defaultState) => ({
          ...defaultState,
          isError: false,
          searchText: payload.searchText
        }),
        success: (defaultState) => {
          const { searchText } = defaultState;

          return {
            ...defaultState,
            words: WordService.filterWords(payload, searchText)
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
