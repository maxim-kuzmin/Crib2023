import React, { useReducer } from 'react';
import { getTopicItemStoreService } from './topicItemStoreService1';

export function TopicItemStoreProvider ({ children }: React.PropsWithChildren) {
  const service = getTopicItemStoreService();

  const [state, dispatch] = useReducer(service.reducer, service.initialState);

  return (
    <service.StateContext.Provider value={state}>
      <service.DispatchContext.Provider value={dispatch}>
        {children}
      </service.DispatchContext.Provider>
    </service.StateContext.Provider>
  );
}
