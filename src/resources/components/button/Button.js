import React, { Component } from 'react';
import Radium from 'radium';
import _ from 'lodash';

class Button extends Component {
	static defaultProps = {
		borderBottom: true,
		borderRight: true,
		content: '',
		keyCode: 0,
		style: {},
	};

	constructor() {
		super();

		this.state = {
			isPressed: false,
		};
	}

	componentDidMount() {
		window.addEventListener('mouseup', this.onMouseUp);
	}

	componentWillUnmount() {
		window.removeEventListener('mouseup', this.onMouseUp);
	}

	onMouseDown = () => {
		this.setState({
			isPressed: true,
		});
	};

	onMouseUp = () => {
		if (this.state.isPressed) {
			this.setState({
				isPressed: false,
			});
		}
	};

	render() {
		const style = {
			wrapper: {
				position: 'relative',
				width: 62,
				height: 62,
				float: 'left',
				cursor: 'pointer',
				boxSizing: 'border-box',
				borderBottom: this.props.borderBottom ? '3px solid #000' : 'none',
				borderRight: this.props.borderRight ? '3px solid #000' : 'none',
				WebkitBoxShadow: this.state.isPressed ? 'inset 0px -3px 1px 1px rgba(0,0,0,0.3)' : 'none',
				MozBoxShadow: this.state.isPressed ? 'inset 0px -3px 1px 1px rgba(0,0,0,0.3)' : 'none',
				boxShadow: this.state.isPressed ? 'inset 0px 0px 10px 4px rgba(0,0,0,0.3)' : 'none',
			},
			button: {
				position: 'absolute',
				top: '50%',
				left: '50%',
				width: 42,
				height: 42,
				margin: '-21px 0 0 -21px',
				backgroundColor: '#DEE8E9',
				borderRadius: '50%',
			},
		};

		return (
			<div style={ style.wrapper }
				onMouseDown={ this.onMouseDown }
				onMouseUp={ this.onMouseUp }>
				<div style={ style.button }>
					<div style={ this.props.style }>
						{ this.props.children }
					</div>
				</div>
			</div>
		);
	}
}

module.exports = Radium(Button);
