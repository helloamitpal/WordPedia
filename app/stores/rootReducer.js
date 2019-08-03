import { combineReducers } from 'redux';
import userReducer from '../containers/HomePage/userReducer';

// this is the root reducer to combine module wise reducers
const rootReducer = combineReducers({
  user: userReducer
});

export default rootReducer;
