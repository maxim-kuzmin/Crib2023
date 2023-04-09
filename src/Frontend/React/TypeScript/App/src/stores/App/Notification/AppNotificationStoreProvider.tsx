import React, { type PropsWithChildren, useReducer, memo } from 'react';
import { getModule } from '../../../all';

export const AppNotificationStoreProvider: React.FC<PropsWithChildren> = memo(function AppNotificationStoreProvider ({
  children
}: PropsWithChildren) {
  const service = getModule().getAppNotificationStoreService();

  const [state, dispatch] = useReducer(service.reducer, service.initialState);

  return (
    <service.StateContext.Provider value={state}>
      <service.DispatchContext.Provider value={dispatch}>
        {children}
      </service.DispatchContext.Provider>
    </service.StateContext.Provider>
  );
});
