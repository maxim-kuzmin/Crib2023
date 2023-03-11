import React, { useReducer } from 'react';
import reducer, {
  ArticleListStoreDispatchContext,
  ArticleListStoreStateContext,
  initialArticleListStoreState,
} from './articleListStoreSlice';

export default function ArticleListStoreProvider ({ children }: React.PropsWithChildren) {
  const [state, dispatch] = useReducer(reducer, initialArticleListStoreState);

  return (
    <ArticleListStoreStateContext.Provider value={state}>
      <ArticleListStoreDispatchContext.Provider value={dispatch}>
        {children}
      </ArticleListStoreDispatchContext.Provider>
    </ArticleListStoreStateContext.Provider>
  );
}
