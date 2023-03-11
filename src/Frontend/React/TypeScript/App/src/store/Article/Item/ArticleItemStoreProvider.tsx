import React, { useReducer } from 'react';
import reducer, {
  ArticleItemStoreDispatchContext,
  ArticleItemStoreStateContext,
  initialArticleItemStoreState,
} from './articleItemStoreSlice';

export default function ArticleItemStoreProvider ({ children }: React.PropsWithChildren) {
  const [state, dispatch] = useReducer(reducer, initialArticleItemStoreState);

  return (
    <ArticleItemStoreStateContext.Provider value={state}>
      <ArticleItemStoreDispatchContext.Provider value={dispatch}>
        {children}
      </ArticleItemStoreDispatchContext.Provider>
    </ArticleItemStoreStateContext.Provider>
  );
}
