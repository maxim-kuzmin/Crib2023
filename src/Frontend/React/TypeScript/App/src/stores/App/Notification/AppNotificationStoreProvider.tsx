import React, { useReducer } from 'react';
import { getAppNotificationStoreService } from './AppNotificationStoreService';

export function AppNotificationStoreProvider ({ children }: React.PropsWithChildren) {
  const service = getAppNotificationStoreService();

  const [state, dispatch] = useReducer(service.reducer, service.initialState);

  return (
    <service.StateContext.Provider value={state}>
      <service.DispatchContext.Provider value={dispatch}>
        {children}
      </service.DispatchContext.Provider>
    </service.StateContext.Provider>
  );
}
