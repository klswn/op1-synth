import React, { Component } from 'react';

export default class BlackKey extends Component {
   static defaultProps = {
      borderRight: true,
   };

   constructor() {
      super();

      this.state = {
         isPressed: false,
      };
   }

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
      console.log('onmousedown: ' + this.props.frequency);
      this.press({ isPressed: true });
   };

   onMouseUp = () => {
      if (this.state.isPressed && !this.state.keyDown) {
         console.log('onmouseup: ' + this.props.frequency);
         this.unpress({ isPressed: false });
      }
   };

   onMouseLeave = () => {
      if (this.state.isPressed) {
         console.log('onmouseleave: ' + this.props.frequency);
         this.unpress({ isPressed: false });
      }
   };

   onKeyDown = (e) => {
      if (e.keyCode === this.props.keyCode) {
         this.press({ isPressed: true, keyDown: true });
      }
   };

   onKeyUp = (e) => {
      if (e.keyCode === this.props.keyCode && this.state.isPressed) {
         this.unpress({ isPressed: false, keyDown: false });
      }
   };

   onMouseEnter = () => {
      if (this.props.mousePressed) {
         console.log('onmouseenter: ' + this.props.frequency);
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
            height: 62,
            width: this.props.position === 'middle' ? 62 : 93,
            float: 'left',
            cursor: 'pointer',
            borderRight: this.props.borderRight ? '3px solid #000' : 'none',
            borderBottom: '3px solid #000',
            boxSizing: 'border-box',
            WebkitBoxShadow: this.state.isPressed ? 'inset 0px -3px 1px 1px rgba(0,0,0,0.3)' : 'none',
            MozBoxShadow: this.state.isPressed ? 'inset 0px -3px 1px 1px rgba(0,0,0,0.3)' : 'none',
            boxShadow: this.state.isPressed ? 'inset 0px 0px 10px 4px rgba(0,0,0,0.3)' : 'none',
         },
         button: {
            position: 'absolute',
            top: '50%',
            left: '50%',
            width: 42,
            height: 42,
            borderRadius: '50%',
            border: '2px solid #fff',
            boxSizing: 'border-box',
            backgroundColor: 'black',
            margin: this.calcMargin(),
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
