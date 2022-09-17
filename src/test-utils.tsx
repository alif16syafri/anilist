import React, { FC, ReactElement } from 'react';
import { render, RenderOptions } from '@testing-library/react';
import { MockedProvider } from '@apollo/client/testing';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Router, ReactLocation } from '@tanstack/react-location';

import { routes } from './App';

const queryClient = new QueryClient();
const location = new ReactLocation();

const AllTheProviders: FC<{ children: React.ReactNode, gqlMocks: any }> = ({ children, gqlMocks =[] }) => {
  return (
    <MockedProvider mocks={[...gqlMocks]} addTypename={false}>
      <QueryClientProvider client={queryClient}>
        <Router location={location} routes={routes}>
          {children}
        </Router>
      </QueryClientProvider>
    </MockedProvider>
  );
};

const customRender = (
  ui: ReactElement,
  options?: Omit<RenderOptions, 'wrapper'> & {
    gqlMocks: any,
  },
) => {
  return render(
    <AllTheProviders gqlMocks={options?.gqlMocks}>
      {ui}
    </AllTheProviders>,
    { ...options },
  );
};

export * from '@testing-library/react';
export { customRender as render };
