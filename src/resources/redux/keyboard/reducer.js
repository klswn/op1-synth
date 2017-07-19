// keyboard/reducer.js
import { fromJS } from 'immutable';
import { KEY_DOWN, KEY_UP } from './constants.js';
import { keyboardInitialState } from './initialState.js';

const initialState = fromJS(keyboardInitialState).sort((a, b) => a.get('freq') - b.get('freq'));

function keyboardReducer(state = initialState, action) {
   switch (action.type) {
      case KEY_DOWN:
         return state.setIn([action.keyCode, 'isPressed'], true);
      case KEY_UP:
         return state.setIn([action.keyCode, 'isPressed'], false);
      default:
         return state;
   }
};

export default keyboardReducer;
