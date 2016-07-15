import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
//import { Router, Route, IndexRoute, browserHistory } from 'react-router';

// Components
import App from './resources/components/app/App.js';
//import Synth from './resources/components/synth/Synth.js';

// const routes = (
// 	<Route path="/" component={ App }>
// 		<Route path="synth" component={ Synth } />
// 		<IndexRoute component={ Synth } />
// 	</Route>
// );

render(<App />, document.getElementById('root'));
