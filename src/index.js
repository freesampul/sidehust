import React from 'react';
import { render } from 'react-dom';
import './index.scss';
import App from './App';
import { UserProvider } from './contexts/users.context';
import { BrowserRouter } from 'react-router-dom';
import { createRoot } from 'react-dom/client';

const rootElement = document.getElementById('root');

const root = createRoot(rootElement);

root.render(
  <React.StrictMode>
    <BrowserRouter>
      <UserProvider>
        <App />
      </UserProvider>
    </BrowserRouter>
  </React.StrictMode>
);