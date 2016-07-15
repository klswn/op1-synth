import React, { Component } from 'react';

export default class Speaker extends Component {
	render() {
		const style = {
			speaker: {
				height: 124,
				width: 124,
				borderRight: '3px solid #000',
				borderBottom: '3px solid #000',
				float: 'left',
				boxSizing: 'border-box',
				textAlign: 'center',
				cursor: 'default',
			},
			line: {
				position: 'relative',
				display: 'block',
				height: '7.8px',
				lineHeight: '7.8px',
				fontSize: '35px',
				fontWeight: 800,
				WebkitTouchCallout: 'none',
    			WebkitUserSelect: 'none',
				userSelect: 'none',
			},
		};

		return (
			<div style={ style.speaker }>
				<span style={ style.line }>{ '.......' }</span>
				<span style={ style.line }>{ '.........' }</span>
				<span style={ style.line }>{ '.........' }</span>
				<span style={ style.line }>{ '...........' }</span>
				<span style={ style.line }>{ '...........' }</span>
				<span style={ style.line }>{ '...........' }</span>
				<span style={ style.line }>{ '...........' }</span>
				<span style={ style.line }>{ '...........' }</span>
				<span style={ style.line }>{ '...........' }</span>
				<span style={ style.line }>{ '...........' }</span>
				<span style={ style.line }>{ '.........' }</span>
				<span style={ style.line }>{ '.........' }</span>
				<span style={ style.line }>{ '.......' }</span>
				
			</div>
		);
	}
}
