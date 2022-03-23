import {combineReducers} from 'redux';
import {reducer, signUpReducer} from './reducer';

const reducers = combineReducers({
  userData: reducer,
  signUpData: signUpReducer,
});

export default reducers;
