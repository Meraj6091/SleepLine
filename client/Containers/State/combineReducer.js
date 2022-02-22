import {combineReducers} from 'redux';
import reducer from './reducer';

const reducers = combineReducers({
  userData: reducer,
});

export default reducers;
