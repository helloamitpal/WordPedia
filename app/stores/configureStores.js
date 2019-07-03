import { createStore, applyMiddleware, compose } from 'redux';
import createSagaMiddleware from 'redux-saga';

import rootReducer from '../reducers';
import rootSaga from '../sagas';

const configureStore = () => {
  const sagaMiddleware = createSagaMiddleware();
  return {
    ...createStore(rootReducer, applyMiddleware(sagaMiddleware)),
    runSaga: sagaMiddleware.run(rootSaga)
  };
};

// const configureStore = (initialState) => {
//   const sagaMiddleware = createSagaMiddleware();
//   const middleware = [sagaMiddleware];
//   const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
//   const store = createStore(rootReducer, initialState, composeEnhancers(applyMiddleware(...middleware)));
//   sagaMiddleware.run(rootSaga);
//   return store;
// };

export default configureStore;
