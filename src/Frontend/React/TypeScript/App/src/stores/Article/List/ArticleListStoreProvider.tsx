import React, { useReducer } from 'react';
import { articleListStoreSlice } from './articleListStoreSlice';

export function ArticleListStoreProvider ({ children }: React.PropsWithChildren) {
  const [state, dispatch] = useReducer(articleListStoreSlice.reducer, articleListStoreSlice.initialState);

  return (
    <articleListStoreSlice.StateContext.Provider value={state}>
      <articleListStoreSlice.DispatchContext.Provider value={dispatch}>
        {children}
      </articleListStoreSlice.DispatchContext.Provider>
    </articleListStoreSlice.StateContext.Provider>
  );
}
