import React, { useReducer } from 'react';
import { topicItemStoreService } from './topicItemStoreService';

export function TopicItemStoreProvider ({ children }: React.PropsWithChildren) {
  const [state, dispatch] = useReducer(topicItemStoreService.reducer, topicItemStoreService.initialState);

  return (
    <topicItemStoreService.StateContext.Provider value={state}>
      <topicItemStoreService.DispatchContext.Provider value={dispatch}>
        {children}
      </topicItemStoreService.DispatchContext.Provider>
    </topicItemStoreService.StateContext.Provider>
  );
}
