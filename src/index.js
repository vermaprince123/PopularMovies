import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import 'antd/dist/reset.css';
import './index.css';

const rootElement = document.getElementById('root');

ReactDOM.createRoot(rootElement).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
