import React, { useReducer } from 'react';
import { getTopicTreeStoreService } from './topicTreeStoreService1';

export function TopicTreeStoreProvider ({ children }: React.PropsWithChildren) {
  const service = getTopicTreeStoreService();

  const [state, dispatch] = useReducer(service.reducer, service.initialState);

  return (
    <service.StateContext.Provider value={state}>
      <service.DispatchContext.Provider value={dispatch}>
        {children}
      </service.DispatchContext.Provider>
    </service.StateContext.Provider>
  );
}
