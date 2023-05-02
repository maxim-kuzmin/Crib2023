import React, { type PropsWithChildren, memo } from 'react';
import { AppContext } from './AppContext';
import { createAppInstance } from './AppInstance';

export const AppContextProvider: React.FC<PropsWithChildren> = memo(
function AppContextProvider ({
  children
}: PropsWithChildren): React.ReactElement<PropsWithChildren> | null {
  return (
    <AppContext.Provider value={createAppInstance()}>
      { children }
    </AppContext.Provider>
  );
});
