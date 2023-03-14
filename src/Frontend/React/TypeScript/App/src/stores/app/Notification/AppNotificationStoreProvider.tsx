import React, { useReducer } from 'react';
import { appNotificationStoreSlice } from './appNotificationStoreSlice';

export function AppNotificationStoreProvider ({ children }: React.PropsWithChildren) {
  const [state, dispatch] = useReducer(appNotificationStoreSlice.reducer, appNotificationStoreSlice.initialState);

  return (
    <appNotificationStoreSlice.StateContext.Provider value={state}>
      <appNotificationStoreSlice.DispatchContext.Provider value={dispatch}>
        {children}
      </appNotificationStoreSlice.DispatchContext.Provider>
    </appNotificationStoreSlice.StateContext.Provider>
  );
}
