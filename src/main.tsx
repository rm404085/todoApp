import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import "./i18n/i18n.ts";


import { Provider } from 'react-redux';
import { persistor, store } from './redux/store.ts';
import { RouterProvider } from 'react-router';
import { router } from './router/index.tsx';
import { PersistGate } from 'redux-persist/integration/react';
import { Toaster } from './components/ui/sonner.tsx';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Provider store={store}>
      {/* Toaster top-level এ রাখতে হবে */}
      <Toaster  richColors  // auto-colored for success/error/info
        position="top-right"  />
      
      <PersistGate loading={null} persistor={persistor}>
        <RouterProvider router={router} />
      </PersistGate>
    </Provider>
  </StrictMode>
);
