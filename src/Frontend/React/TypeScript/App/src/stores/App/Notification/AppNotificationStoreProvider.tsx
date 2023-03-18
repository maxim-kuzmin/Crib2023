import React, { type PropsWithChildren, useReducer } from 'react';
import { getModule } from '../../../all';

export function AppNotificationStoreProvider ({ children }: PropsWithChildren) {
  const { getAppNotificationStoreService } = getModule();

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
