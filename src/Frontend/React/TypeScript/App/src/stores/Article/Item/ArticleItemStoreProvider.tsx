import React, { type PropsWithChildren, useReducer } from 'react';
import { getModule } from '../../../all';

export const ArticleItemStoreProvider: React.FC<PropsWithChildren> = ({ children }: PropsWithChildren) => {
  const { getArticleItemStoreService } = getModule();

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
