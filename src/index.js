import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import reducers from './resources/redux/reducers.js';
import App from './resources/components/app/App.js';

let store = createStore(reducers);

render(
   <Provider store={ store }>
      <App />
   </Provider>
   ,document.getElementById('root')
);
