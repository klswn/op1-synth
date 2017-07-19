import React, { Component } from 'react';

export default class Key extends Component {
   static defaultProps = {
      borderRight: true,
      isPressed: false,
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
      const props = this.props,
      isWhite = props.type === 'white',
      style = {
         wrapper: {
            position: 'relative',
            height: isWhite ? 124 : 62,
            width: isWhite || props.position === 'middle' ? 62 : 93,
            float: 'left',
            cursor: 'pointer',
            borderRight: props.borderRight ? '3px solid #000' : 'none',
            borderBottom: !isWhite ? '3px solid #000' : 'none',
            boxSizing: 'border-box',
            WebkitBoxShadow: props.isPressed ? 'inset 0px -3px 1px 1px rgba(0,0,0,0.3)' : 'none',
            MozBoxShadow: props.isPressed ? 'inset 0px -3px 1px 1px rgba(0,0,0,0.3)' : 'none',
            boxShadow: props.isPressed ? 'inset 0px 0px 10px 4px rgba(0,0,0,0.3)' : 'none',
         },
         button: {
            position: 'absolute',
            top: isWhite ? 12 : '50%',
            left: isWhite ? 8.5 : '50%',
            width: 42,
            height: isWhite ? 100 : 42,
            borderRadius: isWhite ? '10px' : '50%',
            backgroundColor: isWhite ? 'white' : 'black',
            border: isWhite ? 'none' : '2px solid #fff',
            boxSizing: 'border-box',
            margin: !isWhite ? this.calcMargin() : 0,
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
