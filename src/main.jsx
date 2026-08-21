import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { RouterProvider } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

import './i18n/i18n.js';
import './styles/index.css';

import { ThemeProvider } from './theme/ThemeProvider.jsx';
import { ToastProvider } from './components/ui/ToastProvider.jsx';
import { router } from './router.jsx';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 60_000,
      retry: 1,
    },
  },
});

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <ThemeProvider>
        <ToastProvider>
          <RouterProvider router={router} />
        </ToastProvider>
      </ThemeProvider>
    </QueryClientProvider>
  </StrictMode>,
);

const loader = document.getElementById('app-loader');
if (loader) {
  requestAnimationFrame(() => {
    loader.classList.add('app-loader-hidden');
    loader.addEventListener('transitionend', () => loader.remove(), { once: true });
  });
}
