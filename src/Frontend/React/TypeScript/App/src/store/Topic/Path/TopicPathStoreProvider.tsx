import React, { useReducer } from 'react';
import topicPathStoreSlice from './topicPathStoreSlice';

export default function ArticlePathStoreProvider ({ children }: React.PropsWithChildren) {
  const [state, dispatch] = useReducer(topicPathStoreSlice.reducer, topicPathStoreSlice.initialState);

  return (
    <topicPathStoreSlice.StateContext.Provider value={state}>
      <topicPathStoreSlice.DispatchContext.Provider value={dispatch}>
        {children}
      </topicPathStoreSlice.DispatchContext.Provider>
    </topicPathStoreSlice.StateContext.Provider>
  );
}
