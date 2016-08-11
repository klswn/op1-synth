import { combineReducers } from 'redux';
import keyboardReducer from './keyboard/reducer.js';

const reducers = combineReducers(
	Object.assign(
		{},
		{
			keys: keyboardReducer,
		},
		{}
	)
);

export default reducers;