import React from 'react';
import ReactDOM from 'react-dom/client';
import './assets/css/index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import {isMobile} from '@/utils'

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <App />
);
reportWebVitals();
window.isMobile = isMobile()