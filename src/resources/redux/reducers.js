import { combineReducers } from 'redux';
import keyboardReducer from './keyboard/reducer.js';

const reducers = combineReducers({
   keys: keyboardReducer,
});

export default reducers;
