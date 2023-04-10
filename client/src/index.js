import React from 'react';
import ReactDOM from 'react-dom/client';
import 'normalize.css'
import './index.css';
import App from './App';
import { AppProvider } from './context/appContext.js';
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <div dir='rtl'>

    <AppProvider>
      <App />
    </AppProvider>

    </div>
  </React.StrictMode>
);


