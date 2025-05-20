import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { ErrorProvider } from './Context/ErrorContext';
import { MessageProvider } from './Context/MessageContext';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
  <ErrorProvider>
  <MessageProvider>
      <App />
  </MessageProvider>
  </ErrorProvider>
  </React.StrictMode>
);
