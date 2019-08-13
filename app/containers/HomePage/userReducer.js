/* eslint-disable no-param-reassign */

import { handle } from 'redux-pack';
import { remove } from 'lodash';

import * as actionTypes from './userActionTypes';

const initialState = {
  words: [],
  user: {},
  wordsOnWeb: [],
  isError: false,
  searchType: '',
  isLoading: false,
  isNoInitWords: true
};

const userReducer = (state = initialState, action = '') => {
  const { type, payload } = action;

  switch (type) {
    case actionTypes.UPDATE_USER:
      return handle(state, action, {
        start: (defaultState) => ({
          ...defaultState,
          isError: false,
          isLoading: true
        }),
        success: (defaultState) => ({
          ...defaultState,
          isLoading: false
        }),
        failure: (defaultState) => ({
          ...defaultState,
          isError: true,
          isLoading: false
        })
      });

    case actionTypes.REGISTER_USER:
      return handle(state, action, {
        start: (defaultState) => ({
          ...defaultState,
          isError: false,
          isLoading: true,
          userDetails: payload.userDetails
        }),
        success: (defaultState) => {
          const updatedDetails = (payload.details) ? Object.assign(defaultState.userDetails, payload.details) : defaultState.userDetails;
          const userDetails = { ...updatedDetails, wordCount: (payload.wordCount || 0) };
          delete defaultState.userDetails;

          return {
            ...defaultState,
            user: userDetails,
            isLoading: false
          };
        },
        failure: (defaultState) => ({
          ...defaultState,
          isError: true,
          isLoading: false
        })
      });

    case actionTypes.LOGOUT_USER:
      return handle(state, action, {
        start: (defaultState) => ({
          ...defaultState,
          isError: false,
          isLoading: true
        }),
        success: (defaultState) => {
          delete defaultState.user;
          return {
            ...defaultState,
            user: {},
            isLoading: false
          };
        },
        failure: (defaultState) => ({
          ...defaultState,
          isLoading: false
        })
      });

    case actionTypes.DELETE_WORD:
      return handle(state, action, {
        start: (defaultState) => ({
          ...defaultState,
          isError: false,
          isLoading: true,
          word: payload.word
        }),
        success: (defaultState) => {
          if (payload) {
            remove(defaultState.words, { word: defaultState.word });
            defaultState.user.wordCount = payload.wordCount || 0;
          }

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

    case actionTypes.ADD_WORD:
      return handle(state, action, {
        start: (defaultState) => ({
          ...defaultState,
          isError: false,
          isLoading: true
        }),
        success: (defaultState) => {
          defaultState.user.wordCount = payload.wordCount || 0;
          defaultState.words.unshift(payload.wordDetails);

          return {
            ...defaultState,
            isLoading: false,
            isNoInitWords: false
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
          isLoading: (payload.searchType !== 'web' || payload.isSynonym),
          searchType: payload.searchType,
          isSynonym: payload.isSynonym
        }),
        success: (defaultState) => {
          let wordsOnWeb;
          if (!defaultState.isSynonym && payload && payload.wordDetails && defaultState.wordsOnWeb) {
            wordsOnWeb = [];
            defaultState.wordsOnWeb.forEach((obj) => {
              const tempObj = (obj.word === payload.wordDetails.word) ? payload.wordDetails : obj;
              tempObj.expanded = true;
              wordsOnWeb.push(tempObj);
            });
          }

          return {
            ...defaultState,
            isLoading: false,
            words: payload.bookmarkedWords,
            wordsOnWeb: defaultState.isSynonym ? [payload.wordDetails] : (wordsOnWeb || payload.wordsOnWeb)
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

export default userReducer;
