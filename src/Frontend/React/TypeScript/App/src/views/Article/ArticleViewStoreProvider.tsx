import React, { useContext, useReducer, createContext, type Dispatch } from 'react';

export interface ArticleViewState {
  article: string
  articleId: number
}

const initialState: ArticleViewState = {
  article: '',
  articleId: 0
}

export enum AtricleViewActionType {
  ArticleLoading,
  ArticleLoaded,
  Clear
}

export interface ArticleViewLoadingAction {
  type: AtricleViewActionType.ArticleLoading
  articleId: number
}

export interface ArticleViewLoadedAction {
  type: AtricleViewActionType.ArticleLoaded
  article: string
}

export interface ClearAction {
  type: AtricleViewActionType.Clear
}

export type ArticleViewAction =
  | ArticleViewLoadingAction
  | ArticleViewLoadedAction
  | ClearAction;

function reducer (state: ArticleViewState, action: ArticleViewAction): ArticleViewState {
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

const ArticleViewStateContext = createContext<ArticleViewState | null>(null);

const ArticleViewDispatchContext = createContext<Dispatch<ArticleViewAction> | null>(null);

export function useArticleViewState () {
  return useContext(ArticleViewStateContext);
}

export function useArticleViewDispatch () {
  return useContext(ArticleViewDispatchContext);
}

export default function ArticleViewStoreProvider ({ children }: React.PropsWithChildren) {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <ArticleViewStateContext.Provider value={state}>
      <ArticleViewDispatchContext.Provider value={dispatch}>
        {children}
      </ArticleViewDispatchContext.Provider>
    </ArticleViewStateContext.Provider>
  );
}
