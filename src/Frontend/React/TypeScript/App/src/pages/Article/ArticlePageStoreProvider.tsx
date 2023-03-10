import React, { useContext, useReducer, createContext, type Dispatch } from 'react';

export interface ArticlePageState {
  article: string
  articleId: number
  articleIsLoading: boolean
}

const initialState: ArticlePageState = {
  article: '',
  articleId: 0,
  articleIsLoading: false
}

enum ActionType {
  ArticleLoading,
  ArticleLoaded,
  Clear
}

export interface ArticlePageArticleLoadingAction {
  type: ActionType.ArticleLoading
  articleId: number
}

export function createArticlePageArticleLoadingAction (articleId: number): ArticlePageArticleLoadingAction {
  return {
    type: ActionType.ArticleLoading,
    articleId
  };
}

export interface ArticlePageArticleLoadedAction {
  type: ActionType.ArticleLoaded
  article: string
}

export function createArticlePageArticleLoadedAction (article: string): ArticlePageArticleLoadedAction {
  return {
    type: ActionType.ArticleLoaded,
    article
  };
}

export interface ArticlePageClearAction {
  type: ActionType.Clear
}

export function createArticlePageClearAction (): ArticlePageClearAction {
  return {
    type: ActionType.Clear
  };
}

export type ArticlePageAction =
  | ArticlePageArticleLoadingAction
  | ArticlePageArticleLoadedAction
  | ArticlePageClearAction;

function reducer (state: ArticlePageState, action: ArticlePageAction): ArticlePageState {
  switch (action.type) {
    case ActionType.ArticleLoading: {
      const { articleId } = action;
      return {
        ...state,
        articleId,
        articleIsLoading: true
      };
    }
    case ActionType.ArticleLoaded: {
      const { article } = action;
      return {
        ...state,
        article,
        articleIsLoading: false
      };
    }
    case ActionType.Clear: {
      return initialState;
    }
  }
}

const StateContext = createContext<ArticlePageState | null>(null);

export function useArticlePageState () {
  return useContext(StateContext)!;
}

const DispatchContext = createContext<Dispatch<ArticlePageAction> | null>(null);

export function useArticlePageDispatch () {
  return useContext(DispatchContext)!;
}

export default function ArticlePageStoreProvider ({ children }: React.PropsWithChildren) {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <StateContext.Provider value={state}>
      <DispatchContext.Provider value={dispatch}>
        {children}
      </DispatchContext.Provider>
    </StateContext.Provider>
  );
}
