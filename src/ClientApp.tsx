import './index.scss';
import React from 'react';
import ReactDOM from 'react-dom/client';
import WrappedApp from 'App/WrappedApp';

ReactDOM.hydrateRoot(
  document.getElementById('root') as HTMLElement,
  <React.StrictMode>
    <WrappedApp />
  </React.StrictMode>
);
