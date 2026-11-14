import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router';
import App from './App.jsx';
import './index.css';

// El "backend" es un mock (MSW). Se activa siempre, salvo que se defina VITE_USE_MOCKS=false
// para apuntar a un servidor real. La aplicación espera a que el mock esté listo antes de mostrarse.
async function activarMock() {
  if (import.meta.env.VITE_USE_MOCKS === 'false') return;

  const { worker } = await import('./mocks/browser');
  await worker.start({
    onUnhandledRequest: 'bypass',
    serviceWorker: { url: `${import.meta.env.BASE_URL}mockServiceWorker.js` },
  });
}

activarMock().then(() => {
  ReactDOM.createRoot(document.getElementById('root')).render(
    <React.StrictMode>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </React.StrictMode>,
  );
});
