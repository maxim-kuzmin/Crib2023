import React, { useReducer } from 'react';
import { getArticleItemStoreService } from './ArticleItemStoreService';

export function ArticleItemStoreProvider ({ children }: React.PropsWithChildren) {
  const service = getArticleItemStoreService();

  const [state, dispatch] = useReducer(service.reducer, service.initialState);

  return (
    <service.StateContext.Provider value={state}>
      <service.DispatchContext.Provider value={dispatch}>
        {children}
      </service.DispatchContext.Provider>
    </service.StateContext.Provider>
  );
}
