import { combineReducers } from 'redux';
import words from './wordReducer';

const rootReducer = combineReducers({
  words
});

export default rootReducer;
