import { call } from 'redux-saga/effects';
import watchSearchWord from './watchers';

export default function* saga() {
  yield call(watchSearchWord);
}
