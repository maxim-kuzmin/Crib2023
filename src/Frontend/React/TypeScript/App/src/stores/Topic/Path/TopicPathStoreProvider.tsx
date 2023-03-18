import React, { type PropsWithChildren, useReducer } from 'react';
import { getModule } from '../../../all';

export function TopicPathStoreProvider ({ children }: PropsWithChildren) {
  const { getTopicPathStoreService } = getModule();

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
