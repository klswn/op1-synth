import React, { Component, PropTypes } from 'react';

export default class Display extends Component {
	style = {
		wrapper: {
			width: 248,
			height: 124,
			boxSizing: 'border-box',
			float: 'left',
		},
		canvas: {
			width: 248,
			height: 124,
			backgroundColor: '#000',
			WebkitTouchCallout: 'none',
			WebkitUserSelect: 'none',
			userSelect: 'none',
		},
	};

	constructor() {
		super();

		this.state = {
			n: 0,
		};
	}

	componentDidMount() {
		const context = this.refs.canvas.getContext('2d');
		this.setState({ context });
		//requestAnimationFrame(() => { this.update() });
	}

	update = () => {
		const context = this.refs.canvas.getContext('2d');
		let { n } = this.state ;
        
        context.strokeStyle = '#FF0000';
        context.strokeWidth = '4px';
        n += 1.5;

        if (n > 300) n = 0;

        context.clearRect(0, 0, 248, 124);
        context.beginPath();

        for(let x = 0; x < n; x++){
            let y = 3 * Math.sin(x/4);
            context.lineTo(x, y + 50);
        }

        context.stroke();
        this.setState({ n });
        requestAnimationFrame(() => { this.update() });
    }

	render() {
		const style = this.style;

		return (
			<div style={ style.wrapper }>
				<canvas
					ref="canvas"
					style={ style.canvas }
					width={ "248" }
					height={ "124" } />
			</div>
		);
	}
}
