import React, { type PropsWithChildren, useReducer } from 'react';
import { getModule } from '../../../all';

export const ArticleListStoreProvider: React.FC<PropsWithChildren> = ({ children }: PropsWithChildren) => {
  const { getArticleListStoreService } = getModule();

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
