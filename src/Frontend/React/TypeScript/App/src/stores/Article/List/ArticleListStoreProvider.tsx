import React, { useReducer } from 'react';
import { articleListStoreService } from './articleListStoreService';

export function ArticleListStoreProvider ({ children }: React.PropsWithChildren) {
  const [state, dispatch] = useReducer(articleListStoreService.reducer, articleListStoreService.initialState);

  return (
    <articleListStoreService.StateContext.Provider value={state}>
      <articleListStoreService.DispatchContext.Provider value={dispatch}>
        {children}
      </articleListStoreService.DispatchContext.Provider>
    </articleListStoreService.StateContext.Provider>
  );
}
