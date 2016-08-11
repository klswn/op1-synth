import React, { Component, PropTypes } from 'react';
import Key from './Key.js';

export default class Keyboard extends Component {
	renderBlackKeys = () => {
		return this.props.keys.map((key, index) => {
			const props = key.toJS();

			if (props.type === 'black') {
				return (
					<Key
						{ ...props }
						borderRight={ props.id !== 22 }
						key={ index } />
				);
			}
		});
	};

	renderWhiteKeys = () => {
		return this.props.keys.map((key, index) => {
			const props = key.toJS();

			if (props.type === 'white') {
				return (
					<Key
						{ ...props }
						borderRight={ props.id !== 23 }
						key={ index } />
				);
			}
		});
	};

	render() {
		return (
			<div>
				{ this.renderBlackKeys() }
				{ this.renderWhiteKeys() }
			</div>
		);
	}
}