import { takeLatest } from 'redux-saga';
import searchWordSaga from '../containers/HomePage/wordSagas';
import * as types from '../containers/HomePage/actionTypes';

export default function* watchSearchWord() {
  yield* takeLatest(types.SEARCH_WORD_REQUEST, searchWordSaga);
}
