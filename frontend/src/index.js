import React from 'react';
import ReactDOM from 'react-dom/client';
import axios from 'axios';
import App from './App';
import { Provider } from 'react-redux';
import store from './store';
import './index.css';
import './enhancements.css';

import { positions, transitions, Provider as AlertProvider } from 'react-alert';
import AlertTemplate from 'react-alert-template-basic';

// All API calls go directly to the local backend.
// Use "localhost" (not 127.0.0.1) so the frontend (localhost:3000) and backend
// (localhost:4000) are same-site — otherwise the SameSite=Lax auth cookie is
// withheld on cross-site requests and the session is lost on refresh.
axios.defaults.baseURL = 'https://lazy-cart.vercel.app/';
// Send the httpOnly auth cookie with every request.
axios.defaults.withCredentials = true;

const options = {
  timeout: 5000,
  position: positions.BOTTOM_CENTER,
  transition: transitions.SCALE,
};
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Provider store={store}>
    <AlertProvider template={AlertTemplate} {...options}>
      <App />
    </AlertProvider>
  </Provider>
);
