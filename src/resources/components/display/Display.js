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
    display: {
      textAlign: 'center',
      verticalAlign: 'center',
      marginLeft: '-10px',
      lineHeight: '124px',
      fontFamily: '\'Bungee Hairline\', cursive',
      fontSize: '3em',
      fontWeight: 400,
    },
  };

  render() {
    const { oscKey } = this.props;
    const style = this.style;
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

    return (
      <div style={ style.wrapper }>
        <div style={{ ...style.display, color: color }}>
          { label }
        </div>
      </div>
    );
  };
}

Display.propTypes = {
  oscKey: PropTypes.number,
};
