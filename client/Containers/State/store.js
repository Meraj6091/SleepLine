import {applyMiddleware, createStore} from 'redux';

import reducers from './combineReducer';

export const store = createStore(reducers);
