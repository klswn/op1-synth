import React, { Component, PropTypes } from 'react';
import Speaker from '../speaker/Speaker.js';
import Display from '../display/Display.js';
import Volume from '../volume/Volume.js';
import Button from '../button/Button.js';
import ButtonRow from './ButtonRow.js';
import Keyboard from '../keyboard/Keyboard.js';
import Parameter from '../parameter/Parameter.js';

export default class Synth extends Component {
	constructor() {
		super();

		this.state = {
			pressedKeys: [],
			context: {},
			oscillators: {},
			mousePressed: false,
			masterVolume: {},
			volume: 70,
		};
	}

	componentDidMount() {
		const AudioContext = window.AudioContext || window.webkitAudioContext;

		const context = new AudioContext();

		let masterVolume = context.createGain();

		masterVolume.gain.value = 0.5;
		masterVolume.connect(context.destination);

		this.setState({ context, masterVolume });

		window.addEventListener('mousedown', this.onMouseDown);
		window.addEventListener('mouseup', this.onMouseUp);
	}

	componentWillUnmount() {
		window.removeEventListener('mousedown', this.onMouseDown);
		window.removeEventListener('mouseup', this.onMouseUp);
	}

	componentDidUpdate(prevProps, prevState) {
		let { volume } = prevState,
		{ masterVolume } = this.state;

		if (volume !== this.state.volume) {
			masterVolume.gain.value = volume / 127;

			this.setState({ masterVolume });
		}
	}

	onMouseDown = () => {
		this.setState({
			mousePressed: true,
		});
	};

	onMouseUp = () => {
		this.setState({
			mousePressed: false,
		});
	};

	onKeyPress = (frequency) => {
		let { context, oscillators, masterVolume } = this.state,
		osc = context.createOscillator(),
		osc2 = context.createOscillator();

		osc.type = 'sine';
		osc2.type = 'sine';
		osc.frequency.value = frequency;
		osc2.frequency.value = frequency;

		oscillators[frequency] = [ osc, osc2 ];

		osc.connect(masterVolume);
		osc2.connect(masterVolume);

		masterVolume.connect(context.destination);

		osc.start(0);
		osc2.start(0);
		
		this.setState({ oscillators });
	};

	onKeyRelease = (frequency) => {
		let { oscillators } = this.state;

		oscillators[frequency].forEach(osc => {
			osc.stop(0);
		});
	};

	onKeyChange = (pressedKeys) => {
		this.setState({ pressedKeys });

		console.log('synthOnKeyChange:', pressedKeys);
		console.log('-----------------------------');
	};

	onKnobChange = (name, value) => {
		this.setState({
			[`${name}`]: value,
		});
	};

	render() {
		const style = {
			synth: {
				position: 'relative',
				width: 1133,
				backgroundColor: '#C3C9C9',
				height: 412,
				borderRadius: '15px',
				boxSizing: 'border-box',
				padding: 15,
				margin: '0 auto',
			},
			modules: {
				width: '95.6%',
				height: '97.5%',
				border: '3px solid #000',
				borderRadius: '15px',
				float: 'left',
			},
			model: {
				transform: 'rotate(-90deg)',
				transformOrigin: 'left top 0',
				float: 'left',
				position: 'absolute',
				bottom: 30,	
				right: -4,
				color: '#636464',
				fontSize: '1.5rem',
				fontWeight: 500,
			},
			batteryLevel: {
				fontWeight: 500,
				fontSize: '1.5rem',
				transform: 'rotate(-90deg)',
				transformOrigin: 'left top 0',
				float: 'left',
				position: 'absolute',
				bottom: 170,
				right: 10,
				letterSpacing: '3px',
			},
			mic: {
				position: 'absolute',
				bottom: 367,
				right: 22,
			},
			micHole: {
				display: 'block',
				height: '7.8px',
				lineHeight: '7.8px',
				lineSpacing: '3px',
				fontSize: '2.2rem',
				fontWeight: 500,
				WebkitTouchCallout: 'none',
    			WebkitUserSelect: 'none',
				userSelect: 'none',
			},
			text: {
				fontFamily: '\'Quicksand\', sans-serif',
				fontSize: '0.85rem',
				position: 'relative',
				top: 12.5,
				textAlign: 'center',
				WebkitTouchCallout: 'none',
				WebkitUserSelect: 'none',
				userSelect: 'none',
			},
			squareGroup: {
				width: 124,
				height: 124,
				float: 'left'
			},
			rectGroup: {
				width: 62,
				height: 124,
				float: 'left',
			},
			controlGroup: {
				width: 186,
				height: 186,
				float: 'left',
			},
		},
		{ diameter, blue, green, white, orange } = this.state;

		return (
			<div style={ style.synth }>
				<div style={ style.modules }>
					<Speaker />

					<div style={ style.squareGroup }>
						<Volume
							value={ this.state.volume }
							onChange={ this.onKnobChange.bind(this, 'volume')} />
						<Button borderRight={ true }/>
						<Button />
					</div>

					<Display />

					<Parameter color={ '#62B8F3' } onChange={ this.onKnobChange.bind(this, 'blue')} />
					<Parameter color={ '#01BB00' } onChange={ this.onKnobChange.bind(this, 'green')} />
					<Parameter color={ '#FFFFFF' } onChange={ this.onKnobChange.bind(this, 'white')} />
					<Parameter color={ '#F85105' } onChange={ this.onKnobChange.bind(this, 'orange')} />

					<div style={ style.rectGroup }>
						<Button borderRight={ false }/>
						<Button borderRight={ false }/>
					</div>
					
					<ButtonRow />

					<div style={ style.controlGroup }>
						<Button />
						<Button />
						<Button />
						<Button />
						<Button />
						<Button />
						<Button borderBottom={ false }/>
						<Button borderBottom={ false }/>
						<Button borderBottom={ false }>
							<div style={ style.text }>{ 'Shift' }</div>
						</Button>
					</div>

					<Keyboard
						mousePressed= { this.state.mousePressed }
						pressedKeys={ this.state.pressedKeys }
						onKeyPress={ this.onKeyPress }
						onKeyRelease={ this.onKeyRelease }
						onChange={ this.onKeyChange } />
				</div>
				<div style={ style.model }>
					{ 'OP-1' }
				</div>
				<div style={ style.batteryLevel }>
					{ '.....' }
				</div>
				<div style={ style.mic }>
					<div style={ style.micHole }>{ '..' }</div>
					<div style={ style.micHole }>{ '..' }</div>
				</div>
			</div>
		);
	}
}