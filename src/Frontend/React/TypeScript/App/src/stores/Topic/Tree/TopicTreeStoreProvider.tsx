import React, { type PropsWithChildren, useReducer } from 'react';
import { getModule } from '../../../app/Module';

export function TopicTreeStoreProvider ({ children }: PropsWithChildren) {
  const { getTopicTreeStoreService } = getModule();

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
