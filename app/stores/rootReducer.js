import { combineReducers } from 'redux';
import wordReducer from '../containers/HomePage/wordReducer';

// this is the root reducer to combine module wise reducers
const rootReducer = combineReducers({
  words: wordReducer
});

export default rootReducer;
