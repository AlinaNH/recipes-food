import * as React from 'react';
import { render } from 'react-dom';
import { HashRouter } from 'react-router-dom';
import { Provider } from 'mobx-react';
import { App } from './App';
import { stores } from './stores/stores';

const domElement = document.getElementById('app');

render(
  <React.StrictMode>
    <HashRouter>
      <Provider {...stores}>
        <App />
      </Provider>
    </HashRouter>
  </React.StrictMode>,
  domElement,
);
