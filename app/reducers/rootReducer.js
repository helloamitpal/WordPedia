import { combineReducers } from 'redux';
import words from '../containers/HomePage/wordReducer';

const rootReducer = combineReducers({
  words
});

export default rootReducer;
