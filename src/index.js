import React from 'react';
import ReactDOM from 'react-dom';
import App from './app/layout/App';
import { BrowserRouter } from 'react-router-dom';
import './stylesheets/main.scss';

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root')
);