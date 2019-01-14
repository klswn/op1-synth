import React, { Component } from 'react';
import { Link } from 'react-router';
import Synth from '../synth/Synth.js';
import Radium from 'radium';

class App extends Component {
   style = {
      wrapper: {
         backgroundColor: '#000',
         height: '100vh',
         width: '100vw',
         overflow: 'hidden',
         boxSizing: 'border-box',
         paddingTop: 40,
      },
   };

   render() {
      const style = this.style;

      return (
         <div style={ style.wrapper }>
            <Synth />
         </div>
      );
   }
}

export default Radium(App);
