import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import keyboardActions from '../../redux/keyboard/actions.js';
import Speaker from '../speaker/Speaker.js';
import Display from '../display/Display.js';
import Volume from '../volume/Volume.js';
import Button from '../button/Button.js';
import ButtonRow from '../button-row/ButtonRow.js';
import Keyboard from '../keyboard/Keyboard.js';
import Parameter from '../parameter/Parameter.js';
import SimpleReverb from '../../utils/SimpleReverb.js';
import { makeDistortionCurve } from '../../utils/Distortion.js';

class Synth extends Component {
  constructor() {
    super();

    // TODO: Move most of this to Redux
    this.state = {
      pressedKeys: [],
      oscKeys: [49],
      arrowKey: 0,
      context: {},
      oscillators: {},
      mousePressed: false,
      masterVolume: {},
      volume: 50,
    };

    this.keyCodes = [
      65,87,83,69,68,
      82,70,71,89,72,
      85,74,75,79,76,
      80,186,219,222,
      90,221,88,220,67
    ];

    this.oscCodes = [49, 50, 51, 52];

    this.arrowCodes = [53, 54]; // [ left arrow, right arrow ]
  }

  componentWillMount() {
    const AudioContext = window.AudioContext || window.webkitAudioContext;

    const context = new AudioContext();

    let masterVolume = context.createGain();
    let analyser = context.createAnalyser();

    masterVolume.gain.value = 0.5;
    masterVolume.connect(analyser);
    analyser.connect(context.destination);

    this.setState({ context, masterVolume, analyser });

    window.addEventListener('keydown', this.onKeyDown);
    window.addEventListener('keyup', this.onKeyUp);
  }

  componentWillUnmount() {
    window.removeEventListener('keydown', this.onKeyDown);
    window.removeEventListener('keyup', this.onKeyUp);
  }

  onKeyDown = (e) => {
    const index = this.keyCodes.indexOf(e.keyCode),
      oscIndex = this.oscCodes.indexOf(e.keyCode),
      arrowIndex = this.arrowCodes.indexOf(e.keyCode);

    if (index > -1 && !this.props.keys.getIn([index.toString(), 'isPressed'])) {
      this.playSound(this.props.keys.getIn([index.toString(), 'freq']));

      this.props.dispatch(
        keyboardActions.keyDown(index.toString())
      );
    }

    if (oscIndex > -1) {
      let updatedOscKeys = this.state.oscKeys;

      if (this.state.oscKeys.indexOf(e.keyCode) > -1) {
        // remove osc key
        if (this.state.oscKeys.length > 1) {
          updatedOscKeys = this.state.oscKeys.filter(k => k !== e.keyCode);
        }
      } else {
        // add osc key
        updatedOscKeys.push(e.keyCode);
      }

      this.setState({
        oscKeys: updatedOscKeys,
      });
    }

    if (arrowIndex > -1 && this.state.arrowKey !== e.keyCode) {
      if (this.state.arrowKey === 0) {
        this.setState({
          arrowKey: e.keyCode
        });
      } else {
        this.setState({
          arrowKey: 0
        });
      }
    }
  };

  onKeyUp = (e) => {
    const index = this.keyCodes.indexOf(e.keyCode);

    if (index > -1) {
      this.stopSound(this.props.keys.getIn([index.toString(), 'freq']));

      this.props.dispatch(
        keyboardActions.keyUp(index.toString())
      );
    }
  };

  playSound = (frequency) => {
    let { context, oscillators, masterVolume, analyser, oscKeys, arrowKey } = this.state,
      octave = 1;

    oscKeys.forEach(oscKey => {
      let osc = context.createOscillator();
      let compressor = context.createDynamicsCompressor();
      let filter = context.createBiquadFilter();
      let distortion = context.createWaveShaper();
      let reverb = new SimpleReverb(context, {
        seconds: 3,
        decay: 1,
        reverse: 0,
      });

      switch (oscKey) {
        case 49:
          osc.type = 'sine';
          break;
        case 50:
          osc.type = 'sawtooth';
          break;
        case 51:
          osc.type = 'triangle';
          break;
        case 52:
          osc.type = 'square';
          break;
        default:
          osc.type = 'sine';
          break;
      }

      switch (arrowKey) {
        case 53:
          octave = 0.5;
          break;
        case 54:
          octave = 2;
          break;
        default:
          octave = 1;
          break;
      }

      // compressor values
      // compressor.attack.setValueAtTime(0, context.currentTime + 1000);
      // compressor.release.setValueAtTime(0, context.currentTime + 1000);

      // oscillator values
      osc.frequency.value = frequency * octave;
      oscillators[frequency * octave * oscKey] = osc;

      // masterVolume values
      masterVolume.gain.value = 0.3 / oscKeys.length;

      // filter values
      // filter.type = 'lowpass';
      // filter.frequency.setValueAtTime(1000, context.currentTime);

      // distortion values
      // distortion.curve = makeDistortionCurve(400);
      // distortion.oversample = '4x';

      // normal
      osc.connect(masterVolume);
      masterVolume.connect(analyser);

      // with reverb
      // osc.connect(reverb.input);
      // reverb.connect(analyser);

      // with distortion
      // osc.connect(distortion);
      // distortion.connect(analyser);

      // with compressor and fitler
      // osc.connect(compressor);
      // compressor.connect(filter);
      // filter.connect(masterVolume);
      // masterVolume.connect(analyser);

      // connect to analyser
      analyser.connect(context.destination);

      // start the oscillator
      osc.start(0);
    });

    this.setState({ oscillators });
  };

  stopSound = (frequency) => {
    let { oscillators, arrowKey, oscKeys } = this.state,
      octave = 1;

    switch (arrowKey) {
      case 53:
        octave = 0.5;
        break;
      case 54:
        octave = 2;
        break;
      default:
        octave = 1;
        break;
    }

    oscKeys.forEach(oscKey => {
      oscillators[frequency * octave * oscKey].stop(0);
    });
  };

  onKeyChange = (pressedKeys) => {
    this.setState({ pressedKeys });
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
              onChange={ this.onKnobChange.bind(this, 'volume')}
            />
            <Button borderRight={ true } />
            <Button />
          </div>

          <Display
            oscKeys={ this.state.oscKeys }
            analyser={this.state.analyser}
          />

          <Parameter color={ '#62B8F3' } onChange={ this.onKnobChange.bind(this, 'blue')} />
          <Parameter color={ '#01BB00' } onChange={ this.onKnobChange.bind(this, 'green')} />
          <Parameter color={ '#FFFFFF' } onChange={ this.onKnobChange.bind(this, 'white')} />
          <Parameter color={ '#F85105' } onChange={ this.onKnobChange.bind(this, 'orange')} />

          <div style={ style.rectGroup }>
            <Button borderRight={ false }/>
            <Button borderRight={ false }/>
          </div>

          <ButtonRow
            oscKeys={ this.state.oscKeys }
            arrowKey={ this.state.arrowKey }
          />

          <div style={ style.controlGroup }>
            <Button />
            <Button />
            <Button />
            <Button />
            <Button />
            <Button />
            <Button borderBottom={ false } />
            <Button borderBottom={ false } />
            <Button borderBottom={ false }>
              <div style={ style.text }>{ 'Shift' }</div>
            </Button>
          </div>

          <Keyboard keys={ this.props.keys } />
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

function mapStateToProps(state) {
  return {
    keys: state.keys,
  };
}

export default connect(mapStateToProps)(Synth);
