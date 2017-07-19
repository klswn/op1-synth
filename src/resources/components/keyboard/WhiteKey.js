import React, { Component } from 'react';

export default class WhiteKey extends Component {
   static defaultProps = {
      borderRight: true,
   };

   componentDidMount() {
      window.addEventListener('mouseup', this.onMouseUp);
      window.addEventListener('keydown', this.onKeyDown);
      window.addEventListener('keyup', this.onKeyUp);
   }

   componentWillUnmount() {
      window.removeEventListener('mouseup', this.onMouseUp);
      window.removeEventListener('keydown', this.onKeyDown);
      window.removeEventListener('keyup', this.onKeyUp);
   }

   press = (state) => {
      this.setState(state, this.props.onKeyPress(this.props.frequency));
   };

   unpress = (state) => {
      this.setState(state, this.props.onKeyRelease(this.props.frequency));
   };

   onMouseDown = () => {
      this.press({ isPressed: true });
   };

   onMouseUp = () => {
      if (this.state.isPressed && !this.state.keyDown) {
         this.unpress({ isPressed: false });
      }
   };

   onMouseLeave = () => {
      if (this.state.isPressed && !this.state.keyDown) {
         this.unpress({ isPressed: false });
      }
   };

   onMouseEnter = () => {
      if (this.props.mousePressed) {
         this.press({ isPressed: true });
      }
   };

   calcMargin = () => {
      const { position } = this.props;
      let margin = '';

      switch (position) {
         case 'left':
            margin = '-21px 0 0 -34px';
            break;
         case 'right':
            margin = '-21px 0 0 -8px';
            break;
         case 'middle':
            margin = '-21px 0 0 -21px';
            break;
      }

      return margin;
   };

   render() {
      const style = {
         wrapper: {
            position: 'relative',
            height: 124,
            width: 62,
            float: 'left',
            cursor: 'pointer',
            borderRight: this.props.borderRight ? '3px solid #000' : 'none',
            boxSizing: 'border-box',
            WebkitBoxShadow: this.state.isPressed ? 'inset 0px -3px 1px 1px rgba(0,0,0,0.3)' : 'none',
            MozBoxShadow: this.state.isPressed ? 'inset 0px -3px 1px 1px rgba(0,0,0,0.3)' : 'none',
            boxShadow: this.state.isPressed ? 'inset 0px 0px 10px 4px rgba(0,0,0,0.3)' : 'none',
         },
         button: {
            position: 'absolute',
            top: 12,
            left: 8.5,
            width: 42,
            height: 100,
            borderRadius: '10px',
            backgroundColor: 'white',
         },
      };

      return (
         <div
            style={ style.wrapper }
            onMouseDown={ this.onMouseDown }
            onMouseEnter={ this.onMouseEnter }
            onMouseLeave={ this.onMouseLeave }>
            <div style={ style.button }></div>
         </div>
      );
   }
}
