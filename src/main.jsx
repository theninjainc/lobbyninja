import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App'; // Seu componente principal
import './index.css';

// Registrar o Service Worker
if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('/service-worker.js') // Registro do service worker
    .then(registration => {
      console.log('Service Worker registrado com sucesso:', registration);
    })
    .catch(error => {
      console.log('Erro ao registrar o Service Worker:', error);
    });
}

ReactDOM.createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <App />
  </BrowserRouter>
);
