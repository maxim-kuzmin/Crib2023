import React, { useReducer } from 'react';
import { getArticleListStoreService } from './articleListStoreService1';

export function ArticleListStoreProvider ({ children }: React.PropsWithChildren) {
  const service = getArticleListStoreService();

  const [state, dispatch] = useReducer(service.reducer, service.initialState);

  return (
    <service.StateContext.Provider value={state}>
      <service.DispatchContext.Provider value={dispatch}>
        {children}
      </service.DispatchContext.Provider>
    </service.StateContext.Provider>
  );
}
