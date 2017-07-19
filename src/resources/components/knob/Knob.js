import React, { Component, PropTypes } from 'react';

export default class Knob extends Component {
   static propTypes = {
      value: PropTypes.number,
      threshold: PropTypes.object,
      onChange: PropTypes.func,
      type: PropTypes.string,
      color: PropTypes.string,
   };

   static defaultProps = {
      value: 0,
      threshold: {
         min: 0,
         max: 127,
      },
      onChange: () => {},
      type: 'parameter',
      color: '#fff',
   };

   constructor() {
      super();

      this.state = {
         rotate: 0,
         mouseDown: false,
         rotate: 0,
         mouseX: 0,
         mouseY: 0,
         delta: Date.now(),
      };
   }

   componentDidMount() {
      window.addEventListener('mouseup', this.onMouseUp);
      window.addEventListener('mousemove', this.onMouseMove);
   }

   componentWillUnmount() {
      window.removeEventListener('mouseup', this.onMouseUp);
      window.removeEventListener('mousemove', this.onMouseMove);
   }

   onMouseDown = (e) => {
      let knob = this.refs.knob,
         knobRect = knob.getBoundingClientRect(),
         originX = knobRect.left + 21,
         originY = knobRect.top + 21,
         x = e.clientX - originX,
         y = e.clientY - originY,
         quad = 1;


      if (y < 0) {
         if (x > 0) {
            quad = 1;
         } else {
            quad = 2;
         }
      } else {
         if (x < 0) {
            quad = 3;
         } else {
            quad = 4;
         }
      }

      this.setState({
         mouseDown: true,
         mouseX: e.clientX,
         mouseY: e.clientY,
         delta: Date.now(),
         quad: quad,
      });
   };

   onMouseUp = () => {
      if (this.state.mouseDown) {
         this.setState({
            mouseDown: false,
         });
      }
   };

   onMouseMove = (e) => {
      if (!this.state.mouseDown) return;

      let dT = (Date.now() - this.state.delta) * 0.05;

      if (dT > 1) {
         let { rotate, quad } = this.state,
            { value, threshold } = this.props,
            dPosX = e.clientX - this.state.mouseX,
            dPosY = e.clientY - this.state.mouseY,
            dRotate = 0;

         if (Math.abs(dPosX) >= Math.abs(dPosY)) {
            if (quad == 1 || quad == 2) {
               dRotate = dPosX / dT;
            } else {
               dRotate = -dPosX / dT;
            }
         } else {
            if (quad == 1 || quad == 4) {
               dRotate = dPosY / dT;
            } else {
               dRotate = -dPosY / dT;
            }
         }

         rotate += dRotate;
         value += Math.floor(dRotate * 0.5);

         if (value < threshold.min) {
            value = threshold.min;
         }

         if (value > threshold.max) {
            value = threshold.max;
         }

         this.setState({
            rotate: rotate,
            mouseX: e.clientX,
            mouseY: e.clientY,
            delta: Date.now(),
         }, this.props.onChange(value));
      } else {
         this.setState({
            delta: Date.now(),
         });
      }
   };

   render() {
      const props = this.props,
         parameter = props.type === 'parameter',
         style = {
            knob: {
               position: 'relative',
               top: '50%',
               left: '50%',
               backgroundColor: props.color,
               width: 42,
               height: 42,
               margin: parameter ? '-21px 0 0 -21px' : '-21px 0 0 -52px',
               MozBorderRadius: '50%',
               WebkitBorderRadius: '50%',
               borderRadius: '50%',
               cursor: '-webkit-grab',

               WebkitTransform: `rotate(${this.state.rotate}deg)`,
               transform: `rotate(${this.state.rotate}deg)`,

               ':active': {
                  cursor: '-webkit-grabbing',
               },
            },
            indent: {
               position: 'absolute',
               top: 7,
               left: 16,
               height: parameter ? 28 : 10,
               width: 10,
               borderRadius: '10px',
               WebkitBoxShadow: 'inset 0px 0px 1px 1px rgba(0,0,0,0.3)',
               MozBoxShadow: 'inset 0px 0px 1px 1px rgba(0,0,0,0.3)',
               boxShadow: 'inset 0px 0px 1px 1px rgba(0,0,0,0.3)',
            },
         };

      return (
         <div
            ref="knob"
            style={ style.knob }
            onMouseDown={ this.onMouseDown }>
            <div style={ style.indent }></div>
         </div>
      );
   }
}
