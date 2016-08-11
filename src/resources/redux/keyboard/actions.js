// keyboard/actions.js
import { KEY_DOWN, KEY_UP } from './constants.js';

const keyboardActions = {
	keyDown(keyCode) {
		return {
			type: KEY_DOWN,
			keyCode
		};
	},

	keyUp(keyCode) {
		return {
			type: KEY_UP,
			keyCode
		};
	},
};

export default keyboardActions;