import React, { Component, PropTypes } from 'react';

export default class Display extends Component {
	style = {
		wrapper: {
			position: 'relative',
			width: 248,
			height: 124,
			boxSizing: 'border-box',
			backgroundColor: '#000',
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
		//const context = this.refs.canvas.getContext('2d');
		//this.setState({ context });
		//requestAnimationFrame(() => { this.update() });
	}

	renderLabel = () => {
		const { oscKey } = this.props;
		let label, color;

		switch(oscKey) {
			case 49:
				label = 'SINE';
				color = '#62B8F3';
				break;
			case 50:
				label = 'SAW';
				color = '#01BB00';
				break;
			case 51:
				label = 'TRI';
				color = '#FFFFFF';
				break;
			case 52:
				label = 'SQUARE';
				color = '#F85105';
				break;
			default:
				label = 'wut';
				color = '#fff';
				break;
		}

		const style = {
			textAlign: 'center',
			verticalAlign: 'center',
			marginLeft: '-10px',
			lineHeight: '124px',
			fontFamily: '\'Bungee Hairline\', cursive',
			fontSize: '3em',
			fontWeight: 400,
			color: color,
		};

		return (
			<div style={ style }>
				{ label }
			</div>
		);
	};

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
				{ this.renderLabel() }
				{/**<canvas
					ref="canvas"
					style={ style.canvas }
					width={ "248" }
					height={ "124" } />**/}
			</div>
		);
	}
}

Display.propTypes = {
	oscKey: PropTypes.number,
};
