import React, { useReducer } from 'react';
import articleItemStoreSlice from './articleItemStoreSlice';

export default function ArticleItemStoreProvider ({ children }: React.PropsWithChildren) {
  const [state, dispatch] = useReducer(articleItemStoreSlice.reducer, articleItemStoreSlice.initialState);

  return (
    <articleItemStoreSlice.StateContext.Provider value={state}>
      <articleItemStoreSlice.DispatchContext.Provider value={dispatch}>
        {children}
      </articleItemStoreSlice.DispatchContext.Provider>
    </articleItemStoreSlice.StateContext.Provider>
  );
}
