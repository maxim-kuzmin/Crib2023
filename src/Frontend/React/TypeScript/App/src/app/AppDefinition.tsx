import React, { type PropsWithChildren, createContext, memo } from 'react';
import { StoresContextProvider } from '../stores';
import { type AppInstance, createAppInstance } from './AppInstance';
import { createAppSetup } from './AppSetup';

const instanceOfApp = createAppInstance();

const setupOfApp = createAppSetup({ instanceOfApp });

setupOfApp.run();

export const AppContext = createContext<AppInstance | null>(null);

export const AppContextProvider: React.FC<PropsWithChildren> = memo(
function ContextProvider ({
  children,
}: PropsWithChildren): React.ReactElement<PropsWithChildren> | null {
  return (
    <AppContext.Provider value={instanceOfApp}>
      <StoresContextProvider>
        {children}
      </StoresContextProvider>
    </AppContext.Provider>
  )
});
