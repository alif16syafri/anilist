import React from 'react';
import { Router, ReactLocation } from '@tanstack/react-location';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

import { AnimeListPage } from 'pages/anime-list/AnimeListPage';
import { AnimeDetailPage } from 'pages/anime-detail/AnimeDetailPage';
import { CollectionListPage } from 'pages/collection-list/CollectionListPage';
import { CollectionDetailPage } from 'pages/collection-detail/CollectionDetailPage';

const routes = [
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
const queryClient = new QueryClient()

const App = () => (
  <QueryClientProvider client={queryClient}>
      <Router location={location} routes={routes} />
  </QueryClientProvider>
);

export default App;
