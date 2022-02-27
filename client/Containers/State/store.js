import {createStore} from 'redux';
import reducers from './combineReducer';

const store = createStore(reducers);

export default store;
