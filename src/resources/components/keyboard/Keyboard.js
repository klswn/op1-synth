import React, { Component } from 'react';
import WhiteKey from './WhiteKey.js';
import BlackKey from './BlackKey.js';

export default class Keyboard extends Component {
	static defaultProps = {
		pressedKeys: [],
		mousePressed: false,
		onKeyPress: () => {},
		onKeyRelease: () => {},
		onChange: () => {},
	};

	onKeyPress = (value) => {
		let { pressedKeys } = this.props;

		if (pressedKeys.indexOf(value) === -1) {
			pressedKeys.push(value);
			
			console.log('onKeyPress: ', pressedKeys);

			this.props.onChange(pressedKeys);
			this.props.onKeyPress(value);
		}
	};

	onKeyRelease = (value) => {
		let pressedKeys = this.props.pressedKeys.filter(x => x !== value);
		console.log('onKeyRelease: ', pressedKeys);
		
		this.props.onChange(pressedKeys);
		this.props.onKeyRelease(value);
	};

	render() {
		return (
			<div>
				<BlackKey
					mousePressed={ this.props.mousePressed }
					onKeyPress={ this.onKeyPress }
					onKeyRelease={ this.onKeyRelease }
					keyCode={ 87 }
					position={ 'right' }
					frequency={ 369.994 } />
				<BlackKey
					mousePressed={ this.props.mousePressed }
					onKeyPress={ this.onKeyPress }
					onKeyRelease={ this.onKeyRelease }
					keyCode={ 69 }
					position={ 'middle' }
					frequency={ 415.305 } />
				<BlackKey
					mousePressed={ this.props.mousePressed }
					onKeyPress={ this.onKeyPress }
					onKeyRelease={ this.onKeyRelease }
					keyCode={ 82 }
					position={ 'left' }
					frequency={ 466.164 } />
				<BlackKey
					mousePressed={ this.props.mousePressed }
					onKeyPress={ this.onKeyPress }
					onKeyRelease={ this.onKeyRelease }
					keyCode={ 89 }
					position={ 'right' }
					frequency={ 554.365 } />
				<BlackKey
					mousePressed={ this.props.mousePressed }
					onKeyPress={ this.onKeyPress }
					onKeyRelease={ this.onKeyRelease }
					keyCode={ 85 }
					position={ 'left' }
					frequency={ 622.254 } />
				<BlackKey
					mousePressed={ this.props.mousePressed }
					onKeyPress={ this.onKeyPress }
					onKeyRelease={ this.onKeyRelease }
					keyCode={ 79 }
					position={ 'right' }
					frequency={ 739.989 } />
				<BlackKey
					mousePressed={ this.props.mousePressed }
					onKeyPress={ this.onKeyPress }
					onKeyRelease={ this.onKeyRelease }
					keyCode={ 80 }
					position={ 'middle' }
					frequency={ 830.609 } />
				<BlackKey
					mousePressed={ this.props.mousePressed }
					onKeyPress={ this.onKeyPress }
					onKeyRelease={ this.onKeyRelease }
					keyCode={ 219 }
					position={ 'left' }
					frequency={ 932.328 } />
				<BlackKey
					mousePressed={ this.props.mousePressed }
					onKeyPress={ this.onKeyPress }
					onKeyRelease={ this.onKeyRelease }
					keyCode={ 221 }
					position={ 'right' }
					frequency={ 1108.730 } />
				<BlackKey
					mousePressed={ this.props.mousePressed }
					onKeyPress={ this.onKeyPress }
					onKeyRelease={ this.onKeyRelease }
					keyCode={ 220 }
					position={ 'left' }
					frequency={ 1244.508 }
					borderRight={ false } />
				<WhiteKey
					mousePressed={ this.props.mousePressed }
					onKeyPress={ this.onKeyPress }
					onKeyRelease={ this.onKeyRelease }
					keyCode={ 65 }
					frequency={ 349.228 } />
				<WhiteKey
					mousePressed={ this.props.mousePressed }
					onKeyPress={ this.onKeyPress }
					onKeyRelease={ this.onKeyRelease }
					keyCode={ 83 }
					frequency={ 391.995 } />
				<WhiteKey
					mousePressed={ this.props.mousePressed }
					onKeyPress={ this.onKeyPress }
					onKeyRelease={ this.onKeyRelease }
					keyCode={ 68 }
					frequency={ 440.000 } />
				<WhiteKey
					mousePressed={ this.props.mousePressed }
					onKeyPress={ this.onKeyPress }
					onKeyRelease={ this.onKeyRelease }
					keyCode={ 70 }
					frequency={ 493.883 } />
				<WhiteKey
					mousePressed={ this.props.mousePressed }
					onKeyPress={ this.onKeyPress }
					onKeyRelease={ this.onKeyRelease }
					keyCode={ 71 }
					frequency={ 523.251 } />
				<WhiteKey
					mousePressed={ this.props.mousePressed }
					onKeyPress={ this.onKeyPress }
					onKeyRelease={ this.onKeyRelease }
					keyCode={ 72 }
					frequency={ 587.330 } />
				<WhiteKey
					mousePressed={ this.props.mousePressed }
					onKeyPress={ this.onKeyPress }
					onKeyRelease={ this.onKeyRelease }
					keyCode={ 74 }
					frequency={ 659.255 } />
				<WhiteKey
					mousePressed={ this.props.mousePressed }
					onKeyPress={ this.onKeyPress }
					onKeyRelease={ this.onKeyRelease }
					keyCode={ 75 }
					frequency={ 698.456 } />
				<WhiteKey
					mousePressed={ this.props.mousePressed }
					onKeyPress={ this.onKeyPress }
					onKeyRelease={ this.onKeyRelease }
					keyCode={ 76 }
					frequency={ 783.991 } />
				<WhiteKey
					mousePressed={ this.props.mousePressed }
					onKeyPress={ this.onKeyPress }
					onKeyRelease={ this.onKeyRelease }
					keyCode={ 186 }
					frequency={ 880.000 } />
				<WhiteKey
					mousePressed={ this.props.mousePressed }
					onKeyPress={ this.onKeyPress }
					onKeyRelease={ this.onKeyRelease }
					keyCode={ 222 }
					frequency={ 987.767 } />
				<WhiteKey
					mousePressed={ this.props.mousePressed }
					onKeyPress={ this.onKeyPress }
					onKeyRelease={ this.onKeyRelease }
					keyCode={ 90 }
					frequency={ 1046.502 } />
				<WhiteKey
					mousePressed={ this.props.mousePressed }
					onKeyPress={ this.onKeyPress }
					onKeyRelease={ this.onKeyRelease }
					keyCode={ 88 }
					frequency={ 1174.659 } />	
				<WhiteKey
					mousePressed={ this.props.mousePressed }
					onKeyPress={ this.onKeyPress }
					onKeyRelease={ this.onKeyRelease }
					keyCode={ 67 }
					frequency={ 1318.510 }
					borderRight={ false } />
			</div>
		);
	}
}
