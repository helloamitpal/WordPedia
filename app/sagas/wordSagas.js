import { put, call } from 'redux-saga/effects';
import { getWords } from '../Api/api';
import * as types from '../constants/actionTypes';

export default function* searchWordSaga({ payload }) {
  try {
    const words = yield call(getWords, payload);
    yield put({ type: types.WORDS_SUCCESS, words });
  } catch (error) {
    yield put({ type: 'SEARCH_WORD_FAILURE', error });
  }
}
