import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(<App />, document.getElementById('root'));
registerServiceWorker();

/**
 * Hot Module Replacement emulation
 * To be removed before production
 * See https://medium.com/superhighfives/hot-reloading-create-react-app-73297a00dcad
 */
const rootEl = document.getElementById('root');

if (module.hot) {
  module.hot.accept('./App', () => {
    const NextApp = require('./App').default;
    ReactDOM.render(<NextApp />, rootEl);
  });
}
