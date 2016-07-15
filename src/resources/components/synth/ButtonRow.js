import React, { Component } from 'react';
import Button from '../button/Button.js';

export default class ButtonRow extends Component {
	render() {
		const style = {
			number: {
				fontFamily: '\'Quicksand\', sans-serif',
				fontSize: '1.5rem',
				position: 'relative',
				top: 7,
				textAlign: 'center',
				WebkitTouchCallout: 'none',
				WebkitUserSelect: 'none',
				userSelect: 'none',
			},
		};

		return (
			<div>
				<Button />
				<Button />
				<Button />
				<Button />
				<Button>
					<div style={ style.number }>{ '1' }</div>
				</Button>
				<Button>
					<div style={ style.number }>{ '2' }</div>
				</Button>
				<Button>
					<div style={ style.number }>{ '3' }</div>
				</Button>
				<Button>
					<div style={ style.number }>{ '4' }</div>
				</Button>
				<Button />
				<Button />
				<Button />
				<Button />
				<Button />
				<Button />
				<Button />
				<Button />
				<Button borderRight={ false } />
			</div>
		);
	}
}
