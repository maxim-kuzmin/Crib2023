import React, { useReducer } from 'react';
import topicTreeStoreSlice from './topicTreeStoreSlice';

export default function ArticleTreeStoreProvider ({ children }: React.PropsWithChildren) {
  const [state, dispatch] = useReducer(topicTreeStoreSlice.reducer, topicTreeStoreSlice.initialState);

  return (
    <topicTreeStoreSlice.StateContext.Provider value={state}>
      <topicTreeStoreSlice.DispatchContext.Provider value={dispatch}>
        {children}
      </topicTreeStoreSlice.DispatchContext.Provider>
    </topicTreeStoreSlice.StateContext.Provider>
  );
}
