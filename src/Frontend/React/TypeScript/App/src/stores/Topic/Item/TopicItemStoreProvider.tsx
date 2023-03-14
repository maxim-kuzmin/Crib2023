import React, { useReducer } from 'react';
import { topicItemStoreSlice } from './topicItemStoreSlice';

export function TopicItemStoreProvider ({ children }: React.PropsWithChildren) {
  const [state, dispatch] = useReducer(topicItemStoreSlice.reducer, topicItemStoreSlice.initialState);

  return (
    <topicItemStoreSlice.StateContext.Provider value={state}>
      <topicItemStoreSlice.DispatchContext.Provider value={dispatch}>
        {children}
      </topicItemStoreSlice.DispatchContext.Provider>
    </topicItemStoreSlice.StateContext.Provider>
  );
}
