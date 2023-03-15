import React, { useReducer } from 'react';
import { articleItemStoreService } from './articleItemStoreService';

export function ArticleItemStoreProvider ({ children }: React.PropsWithChildren) {
  const [state, dispatch] = useReducer(articleItemStoreService.reducer, articleItemStoreService.initialState);

  return (
    <articleItemStoreService.StateContext.Provider value={state}>
      <articleItemStoreService.DispatchContext.Provider value={dispatch}>
        {children}
      </articleItemStoreService.DispatchContext.Provider>
    </articleItemStoreService.StateContext.Provider>
  );
}
