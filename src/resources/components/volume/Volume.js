import React, { Component } from 'react';
import Knob from '../knob/Knob.js';

export default class Volume extends Component {
   style = {
      wrapper: {
         float: 'left',
         height: 62,
         width: 124,
         boxSizing: 'border-box',
         borderBottom: '3px solid #000',
         borderRight: '3px solid #000',
      },
   };

   render() {
      return (
         <div style={ this.style.wrapper }>
         <Knob
            type="volume"
            value={ this.props.value }
            onChange={ this.props.onChange } />
         </div>
      );
   }
}
