import React, { createContext, memo } from 'react';
import { RouterProvider } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import { StoresContextProvider } from '../stores';
import { type AppInstance, createAppInstance } from './AppInstance';
import { createAppRouter } from './AppRouter';
import { createAppSetup } from './AppSetup';

const instanceOfApp = createAppInstance();

export const AppInstanceContext = createContext<AppInstance | null>(null);

export const AppRoot: React.FC = memo(
function AppRoot (): React.ReactElement | null {
  return (
    <React.StrictMode>
      <AppInstanceContext.Provider value={instanceOfApp}>
        <StoresContextProvider>
          <HelmetProvider>
            <RouterProvider router={createAppRouter()} />
          </HelmetProvider>
        </StoresContextProvider>
      </AppInstanceContext.Provider>
    </React.StrictMode>
  );
});

export const setupOfApp = createAppSetup({ instanceOfApp });
