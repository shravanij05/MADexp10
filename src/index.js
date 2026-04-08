import React, { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
const rootElement = document.getElementById('root');
const root = createRoot(rootElement);
root.render(
  <StrictMode>
    <App />
  </StrictMode>
);
// Register Service Worker
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker
      .register(`${process.env.PUBLIC_URL}/service-worker.js`)
      .then(registration => {
        console.log('[SW] Registered successfully:', registration.scope);
      })
      .catch(error => {
        console.error('[SW] Registration failed:', error);
      });
  });
}
