import React, { Component, PropTypes } from 'react';
import Knob from '../knob/Knob.js';

export default class Parameter extends Component {
	static propTypes = {
		color: PropTypes.string,
	};

	static defaultProps = {
		color: '#62B8F3',
	};

	render() {
		const props = this.props,
		style = {
			wrapper: {
				backgroundColor: 'transparent',
				width: 124,
				height: 124,
				borderRight: '3px solid #000',
				borderBottom: '3px solid #000',
				boxSizing: 'border-box',
				float: 'left',
			},
			outer: {
				position: 'relative',
				width: 70,
				height: 70,
				top: '50%',
				left: '50%',
				margin: '-35px 0 0 -35px',
				boxSizing: 'border-box',
				backgroundColor: '#DEE8E9',
				border: '3px solid #AAAAAA',
				MozBorderRadius: '50%',
				WebkitBorderRadius: '50%',
				borderRadius: '50%',
			},
		};

		return (
			<div style={ style.wrapper }>
				<div style={ style.outer }>
					<Knob
						color={ this.props.color }
						onChange={ this.props.onChange } />
				</div>
			</div>
		);
	}
}
