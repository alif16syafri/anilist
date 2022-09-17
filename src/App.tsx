import React, { lazy, Suspense } from 'react';
import { Toaster } from 'react-hot-toast';
import { Router, ReactLocation } from '@tanstack/react-location';

import { COLOR } from './lib/styles/variables';

const AnimeListPage = lazy(() => import('pages/anime-list/AnimeListPage'));
const AnimeDetailPage = lazy(() => import('pages/anime-detail/AnimeDetailPage'));
const CollectionListPage = lazy(() => import('pages/collection-list/CollectionListPage'));
const CollectionDetailPage = lazy(() => import('pages/collection-detail/CollectionDetailPage'));

export const routes = [
  {
    path: '/animes/',
    element: <AnimeListPage />,
  },
  {
    path: '/anime/:id/',
    element: <AnimeDetailPage />,
  },
  {
    path: '/collections/',
    element: <CollectionListPage />,
  },
  {
    path: '/collection/:id',
    element: <CollectionDetailPage />,
  },
];

const location = new ReactLocation();

const App = () => (
  <>
    <Suspense fallback={<div style={{ background: COLOR.N900, width: '100vw', height: '100vh' }} />}>
      <Router location={location} routes={routes} />
    </Suspense>
    <Toaster />
  </>
);

export default App;
