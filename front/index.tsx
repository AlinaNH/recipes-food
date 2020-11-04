import * as React from 'react';
import { render } from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'mobx-react';
import { App } from './App';
import { stores } from './stores/stores';

const domElement = document.getElementById('app');
render(
  <React.StrictMode>
    <BrowserRouter>
      <Provider {...stores}>
        <App />
      </Provider>
    </BrowserRouter>
  </React.StrictMode>,
  domElement,
);
