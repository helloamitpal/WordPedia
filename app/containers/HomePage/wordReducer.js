import { handle } from 'redux-pack';
import * as actionTypes from './actionTypes';

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
          let filteredData = payload;
          if (searchText) {
            filteredData = payload.filter(({ name }) => (name.toLowerCase().includes(searchText.toLowerCase())));
          }
          return {
            ...defaultState,
            words: filteredData
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
