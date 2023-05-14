import React, { memo } from 'react';
import { StoresContextProvider } from '../../features';
import { Context, type ContextProviderProps } from '.';

export const ContextProvider: React.FC<ContextProviderProps> = memo(
function ContextProvider ({
  children,
  instanceOfApp,
}: ContextProviderProps): React.ReactElement<ContextProviderProps> | null {
  return (
    <Context.Provider value={instanceOfApp}>
      <StoresContextProvider>
        { children }
      </StoresContextProvider>
    </Context.Provider>
  );
});
