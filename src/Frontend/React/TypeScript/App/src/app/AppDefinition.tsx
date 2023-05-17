import React, { createContext, memo } from 'react';
import { RouterProvider } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import { StoresContextProvider } from '../stores';
import { type AppInstance, createAppInstance } from './AppInstance';
import { createAppRouter } from './AppRouter';
import { createAppSetup } from './AppSetup';

const instanceOfApp = createAppInstance();

const setupOfApp = createAppSetup({ instanceOfApp });

setupOfApp.run();

export const AppContext = createContext<AppInstance | null>(null);

export const AppComponent: React.FC = memo(
function AppComponent (): React.ReactElement | null {
  return (
    <React.StrictMode>
      <AppContext.Provider value={instanceOfApp}>
        <StoresContextProvider>
          <HelmetProvider>
            <RouterProvider router={createAppRouter()} />
          </HelmetProvider>
        </StoresContextProvider>
      </AppContext.Provider>
    </React.StrictMode>
  );
});
