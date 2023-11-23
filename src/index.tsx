import React from 'react';
import ReactDOM from 'react-dom/client';

import { LocationContextProvider } from './context/location-context';
import App from './App';
import './index.css';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <LocationContextProvider>
      <App />
    </LocationContextProvider>
  </React.StrictMode>
);