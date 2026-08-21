import { createBrowserRouter } from 'react-router-dom';
import { RootLayout } from './App.jsx';
import { HomePage } from './pages/HomePage.jsx';
import { EventsPage } from './features/events/EventsPage.jsx';
import { EventDetailPage } from './features/events/EventDetailPage.jsx';
import { GalleryPage } from './features/gallery/GalleryPage.jsx';
import { NewsDetailPage } from './features/news/NewsDetailPage.jsx';
import { PrivacyPage } from './features/legal/PrivacyPage.jsx';
import { TermsPage } from './features/legal/TermsPage.jsx';
import { CookiesPage } from './features/legal/CookiesPage.jsx';
import { NotFoundPage } from './pages/NotFoundPage.jsx';

export const router = createBrowserRouter([
  {
    element: <RootLayout />,
    children: [
      { path: '/', element: <HomePage /> },
      { path: '/evenements', element: <EventsPage /> },
      { path: '/evenements/:slug', element: <EventDetailPage /> },
      { path: '/galerie', element: <GalleryPage /> },
      { path: '/actualites/:slug', element: <NewsDetailPage /> },
      { path: '/confidentialite', element: <PrivacyPage /> },
      { path: '/conditions', element: <TermsPage /> },
      { path: '/cookies', element: <CookiesPage /> },
      { path: '*', element: <NotFoundPage /> },
    ],
  },
]);
