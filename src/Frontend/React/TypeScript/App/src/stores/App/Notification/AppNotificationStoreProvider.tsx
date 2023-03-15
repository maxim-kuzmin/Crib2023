import React, { useReducer } from 'react';
import { appNotificationStoreService } from './appNotificationStoreService';

export function AppNotificationStoreProvider ({ children }: React.PropsWithChildren) {
  const [state, dispatch] = useReducer(appNotificationStoreService.reducer, appNotificationStoreService.initialState);

  return (
    <appNotificationStoreService.StateContext.Provider value={state}>
      <appNotificationStoreService.DispatchContext.Provider value={dispatch}>
        {children}
      </appNotificationStoreService.DispatchContext.Provider>
    </appNotificationStoreService.StateContext.Provider>
  );
}
