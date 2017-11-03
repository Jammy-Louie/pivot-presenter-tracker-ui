import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import * as reducers from '../redux/reducers';
import thunk from 'redux-thunk';

const middlewares = [thunk];

const store = createStore(
  combineReducers({
    ...reducers,
  }),
  compose(applyMiddleware(...middlewares))
);

export { store };
