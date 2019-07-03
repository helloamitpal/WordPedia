import { takeLatest } from 'redux-saga';
import searchWordSaga from './wordSagas';
import * as types from '../constants/actionTypes';

export default function* watchSearchWord() {
  yield* takeLatest(types.SEARCH_WORD_REQUEST, searchWordSaga);
}
