import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { BrowserRouter, HashRouter } from 'react-router-dom';
import reportWebVitals from './reportWebVitals';

import { Provider } from 'react-redux';
import { store } from './redux/store';

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLDivElement);
root.render(
  <HashRouter>
    <Provider store={store}>
      <App />
    </Provider>
    </HashRouter>,
);

reportWebVitals();
