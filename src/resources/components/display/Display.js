import React, { Component, PropTypes } from 'react';

const WIDTH = 248;
const HEIGHT = 124;

const oscKeyMap = {
  49: {
    label: 'SINE',
    color: '#62B8F3',
  },
  50: {
    label: 'SAW',
    color: '#01BB00',
  },
  51: {
    label: 'TRI',
    color: '#FFFFFF',
  },
  52: {
    label: 'SQUARE',
    color: '#F85105',
  },
};

export default class Display extends Component {
  style = {
    wrapper: {
      position: 'relative',
      width: WIDTH,
      height: HEIGHT,
      boxSizing: 'border-box',
      backgroundColor: '#000',
      float: 'left',
    },
    canvas: {
      width: WIDTH,
      height: HEIGHT,
      backgroundColor: '#000',
      WebkitTouchCallout: 'none',
      WebkitUserSelect: 'none',
      userSelect: 'none',
    },
  };

  componentDidMount() {
    let { analyser } = this.props;
    // WaveForm
    analyser.fftSize = 256;
    this.bufferLength = analyser.fftSize;

    // Bars
    // analyser.fftSize = 128;
    // this.bufferLength = analyser.frequencyBinCount;

    this.dataArray = new Uint8Array(this.bufferLength);
    requestAnimationFrame(() => { this.update() });
  }

  getLabel = () => {
    const { oscKeys } = this.props;
    let label, color;

    label = oscKeyMap[oscKeys[0]].label;

    if (oscKeys.length > 1) {
      for (let i = 1; i < oscKeys.length; i++) {
        label = `${label} + ${oscKeyMap[oscKeys[i]].label}`;
      }
    }

    return label;
  }

  getColor = () => {
    const { oscKeys } = this.props;

    return oscKeyMap[oscKeys[0]].color;
  }

  renderLabel = () => {
    const { oscKey } = this.props;
    const label = this.getLabel();
    const color = this.getColor();

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

    const newStyle = {
      position: 'absolute',
      fontFamily: '\'Bungee Hairline\', cursive',
      fontSize: '1em',
      fontWeight: 400,
      color: color,
    };

    return (
      <div style={ newStyle }>
        { label }
      </div>
    );
  };

  update = () => {
    const context = this.canvas.getContext('2d');
    const { analyser } = this.props;
    const strokeStyle = this.getColor();

    analyser.getByteTimeDomainData(this.dataArray);

    context.strokeStyle = strokeStyle;
    context.lineWidth = 2;

    context.clearRect(0, 0, WIDTH, HEIGHT);
    context.beginPath();

    let sliceWidth = WIDTH * 1.0 / this.bufferLength;
    let x = 0;

    for (let i = 0; i < this.bufferLength; i++) {
      var v = this.dataArray[i] / 128.0;
      var y = v * HEIGHT / 2;

      if (i === 0) {
        context.moveTo(x, y);
      } else {
        context.lineTo(x, y);
      }

      x += sliceWidth;
    }

    context.lineTo(WIDTH, HEIGHT / 2);
    context.stroke();
    requestAnimationFrame(() => { this.update() });
  }

  // update = () => {
  //   const context = this.canvas.getContext('2d');
  //   const { analyser } = this.props;
  //   const fillStyle = this.getColor();
  //
  //   analyser.getByteFrequencyData(this.dataArray);
  //
  //   context.fillStyle = '#000';
  //   context.fillRect(0, 0, WIDTH, HEIGHT);
  //
  //   let barWidth = (WIDTH / this.bufferLength) * 2.5;
  //   let barHeight;
  //   let x = 0;
  //
  //   for (let i = 0; i < this.bufferLength; i++) {
  //     barHeight = this.dataArray[i];
  //
  //     context.fillStyle = fillStyle;
  //     context.fillRect(x, HEIGHT - barHeight / 2, barWidth, barHeight / 2);
  //
  //     x += barWidth + 1;
  //   }
  //
  //   requestAnimationFrame(() => { this.update() });
  // }

  render() {
    const style = this.style;

    return (
     <div style={ style.wrapper }>
      { this.renderLabel() }
      <canvas ref={ref => this.canvas = ref} width={WIDTH} height={HEIGHT} />
     </div>
    );
  }
}

Display.propTypes = {
  oscKey: PropTypes.number,
};
