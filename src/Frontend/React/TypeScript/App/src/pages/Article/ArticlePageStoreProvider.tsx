import React, { useContext, useReducer, createContext, type Dispatch } from 'react';

export interface ArticlePageState {
  article: string
  articleId: number
}

const initialState: ArticlePageState = {
  article: '',
  articleId: 0
}

export enum AtricleViewActionType {
  ArticleLoading,
  ArticleLoaded,
  Clear
}

export interface ArticlePageLoadingAction {
  type: AtricleViewActionType.ArticleLoading
  articleId: number
}

export interface ArticlePageLoadedAction {
  type: AtricleViewActionType.ArticleLoaded
  article: string
}

export interface ClearAction {
  type: AtricleViewActionType.Clear
}

export type ArticlePageAction =
  | ArticlePageLoadingAction
  | ArticlePageLoadedAction
  | ClearAction;

function reducer (state: ArticlePageState, action: ArticlePageAction): ArticlePageState {
  switch (action.type) {
    case AtricleViewActionType.ArticleLoading: {
      const { articleId } = action;
      return {
        ...state,
        articleId
      };
    }
    case AtricleViewActionType.ArticleLoaded: {
      const { article } = action;
      return {
        ...state,
        article
      };
    }
    case AtricleViewActionType.Clear: {
      return initialState;
    }
  }
}

const ArticlePageStateContext = createContext<ArticlePageState | null>(null);

const ArticlePageDispatchContext = createContext<Dispatch<ArticlePageAction> | null>(null);

export function useArticlePageState () {
  return useContext(ArticlePageStateContext);
}

export function useArticlePageDispatch () {
  return useContext(ArticlePageDispatchContext);
}

export default function ArticlePageStoreProvider ({ children }: React.PropsWithChildren) {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <ArticlePageStateContext.Provider value={state}>
      <ArticlePageDispatchContext.Provider value={dispatch}>
        {children}
      </ArticlePageDispatchContext.Provider>
    </ArticlePageStateContext.Provider>
  );
}
