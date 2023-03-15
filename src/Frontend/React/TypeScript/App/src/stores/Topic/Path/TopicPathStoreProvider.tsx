import React, { useReducer } from 'react';
import { getTopicPathStoreService } from './TopicPathStoreService';

export function TopicPathStoreProvider ({ children }: React.PropsWithChildren) {
  const service = getTopicPathStoreService();

  const [state, dispatch] = useReducer(service.reducer, service.initialState);

  return (
    <service.StateContext.Provider value={state}>
      <service.DispatchContext.Provider value={dispatch}>
        {children}
      </service.DispatchContext.Provider>
    </service.StateContext.Provider>
  );
}
