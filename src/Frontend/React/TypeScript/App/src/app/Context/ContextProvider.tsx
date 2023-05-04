import React, { memo } from 'react';
import { StoresContextProvider } from '../../features';
import { Context } from './ContextDefinition';
import { type ContextProviderProps } from './ContextProviderProps';

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
