import React, { useReducer } from 'react';
import { topicPathStoreService } from './topicPathStoreService';

export function TopicPathStoreProvider ({ children }: React.PropsWithChildren) {
  const [state, dispatch] = useReducer(topicPathStoreService.reducer, topicPathStoreService.initialState);

  return (
    <topicPathStoreService.StateContext.Provider value={state}>
      <topicPathStoreService.DispatchContext.Provider value={dispatch}>
        {children}
      </topicPathStoreService.DispatchContext.Provider>
    </topicPathStoreService.StateContext.Provider>
  );
}
