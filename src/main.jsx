import React, { Suspense } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App.jsx';
import './styles/globals.css';

const root = createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter basename={process.env.NODE_ENV === 'production' ? '/Shoppify-Health-Kart' : ''}>
      <Suspense fallback={<div>Loading…</div>}>
        <App />
      </Suspense>
    </BrowserRouter>
  </React.StrictMode>
);
