import React, { useContext, useReducer, createContext, type Dispatch } from 'react';

export interface TopicPageState {
  articles: string
  topic: string
  topicId: number
}

const initialState: TopicPageState = {
  articles: '',
  topic: '',
  topicId: 0
};

export enum TopicPageActionType {
  ArticlesLoading,
  ArticlesLoaded,
  Clear,
  TopicLoading,
  TopicLoaded
}

export interface ArticlesViewLoadingAction {
  type: TopicPageActionType.ArticlesLoading
  topicId: number
}

export interface ArticlesViewLoadedAction {
  type: TopicPageActionType.ArticlesLoaded
  articles: string
}

export interface ClearAction {
  type: TopicPageActionType.Clear
}

export interface TopicPageLoadingAction {
  type: TopicPageActionType.TopicLoading
  topicId: number
}

export interface TopicPageLoadedAction {
  type: TopicPageActionType.TopicLoaded
  topic: string
}

export type TopicPageAction =
  | ArticlesViewLoadingAction
  | ArticlesViewLoadedAction
  | ClearAction
  | TopicPageLoadingAction
  | TopicPageLoadedAction;

function reducer (state: TopicPageState, action: TopicPageAction): TopicPageState {
  switch (action.type) {
    case TopicPageActionType.ArticlesLoading: {
      const { topicId } = action;
      return {
        ...state,
        topicId
      };
    }
    case TopicPageActionType.ArticlesLoaded: {
      const { articles } = action;
      return {
        ...state,
        articles
      };
    }
    case TopicPageActionType.Clear: {
      return initialState;
    }
    case TopicPageActionType.TopicLoading: {
      const { topicId } = action;
      return {
        ...state,
        topicId
      };
    }
    case TopicPageActionType.TopicLoaded: {
      const { topic } = action;
      return {
        ...state,
        topic
      };
    }
  }
}

const TopicPageStateContext = createContext<TopicPageState | null>(null);

const TopicPageDispatchContext = createContext<Dispatch<TopicPageAction> | null>(null);

export function useTopicPageState () {
  return useContext(TopicPageStateContext);
}

export function useTopicPageDispatch () {
  return useContext(TopicPageDispatchContext);
}

export default function TopicPageStoreProvider ({ children }: React.PropsWithChildren) {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <TopicPageStateContext.Provider value={state}>
      <TopicPageDispatchContext.Provider value={dispatch}>
        {children}
      </TopicPageDispatchContext.Provider>
    </TopicPageStateContext.Provider>
  );
}
