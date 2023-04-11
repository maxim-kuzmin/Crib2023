import React, { type PropsWithChildren, useReducer, memo } from 'react';
import { getModule } from '../../../../all';

export const TopicItemStoreContextProvider: React.FC<PropsWithChildren> = memo(
    function TopicItemStoreContextProvider ({
      children
    }: PropsWithChildren) {
  const service = getModule().getTopicItemStoreService();

  const [state, dispatch] = useReducer(service.reducer, service.initialState);

  return (
    <service.StateContext.Provider value={state}>
      <service.DispatchContext.Provider value={dispatch}>
        {children}
      </service.DispatchContext.Provider>
    </service.StateContext.Provider>
  );
});
