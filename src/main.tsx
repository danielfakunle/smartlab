import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.tsx';
import { LoadingProvider } from './context/LoadingContext.tsx';
import { UserProvider } from './context/UserContext.tsx';
import './index.css';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <LoadingProvider>
      <UserProvider>
        <App />
      </UserProvider>
    </LoadingProvider>
  </React.StrictMode>
);
