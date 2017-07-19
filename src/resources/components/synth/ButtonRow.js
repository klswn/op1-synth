import React, { Component, PropTypes } from 'react';
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
         arrow: {
            fontFamily: '\'Quicksand\', sans-serif',
            fontSize: '1.5rem',
            position: 'relative',
            top: 4,
            textAlign: 'center',
            WebkitTouchCallout: 'none',
            WebkitUserSelect: 'none',
            userSelect: 'none',
         }
      };

      return (
         <div>
            <Button />
            <Button />
            <Button />
            <Button />
            <Button isPressed={ this.props.oscKey === 49 }>
               <div style={ style.number }>{ '1' }</div>
            </Button>
            <Button isPressed={ this.props.oscKey === 50 }>
               <div style={ style.number }>{ '2' }</div>
            </Button>
            <Button isPressed={ this.props.oscKey === 51 }>
               <div style={ style.number }>{ '3' }</div>
            </Button>
            <Button isPressed={ this.props.oscKey === 52 }>
               <div style={ style.number }>{ '4' }</div>
            </Button>
            <Button isPressed={ this.props.arrowKey === 53 }>
               <div style={ style.arrow }>{ '<' }</div>
            </Button>
            <Button isPressed={ this.props.arrowKey === 54 }>
               <div style={ style.arrow }>{ '>' }</div>
            </Button>
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

ButtonRow.propTypes = {
   oscKey: PropTypes.number,
};
