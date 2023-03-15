import React, { useReducer } from 'react';
import { topicTreeStoreService } from './topicTreeStoreService';

export function TopicTreeStoreProvider ({ children }: React.PropsWithChildren) {
  const [state, dispatch] = useReducer(topicTreeStoreService.reducer, topicTreeStoreService.initialState);

  return (
    <topicTreeStoreService.StateContext.Provider value={state}>
      <topicTreeStoreService.DispatchContext.Provider value={dispatch}>
        {children}
      </topicTreeStoreService.DispatchContext.Provider>
    </topicTreeStoreService.StateContext.Provider>
  );
}
