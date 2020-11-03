import * as React from 'react';
import { render } from 'react-dom';
import { Provider } from 'mobx-react';
import { BrowserRouter } from 'react-router-dom';
import mainStore from './stores/mainStore';
import { App } from './App';

const stores = {
  mainStore,
  AutocompleteStore: mainStore.AutocompleteStore,
};

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
