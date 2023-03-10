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

export interface TopicPageArticlesLoadingAction {
  type: TopicPageActionType.ArticlesLoading
  topicId: number
}

export function createTopicPageArticlesLoadingAction (topicId: number): TopicPageArticlesLoadingAction {
  return {
    type: TopicPageActionType.ArticlesLoading,
    topicId
  };
}

export interface TopicPageArticlesLoadedAction {
  type: TopicPageActionType.ArticlesLoaded
  articles: string
}

export function createTopicPageArticlesLoadedAction (articles: string): TopicPageArticlesLoadedAction {
  return {
    type: TopicPageActionType.ArticlesLoaded,
    articles
  };
}

export interface TopicPageClearAction {
  type: TopicPageActionType.Clear
}

export interface TopicPageTopicLoadingAction {
  type: TopicPageActionType.TopicLoading
  topicId: number
}

export function createTopicPageTopicLoadingAction (topicId: number): TopicPageTopicLoadingAction {
  return {
    type: TopicPageActionType.TopicLoading,
    topicId
  };
}

export interface TopicPageTopicLoadedAction {
  type: TopicPageActionType.TopicLoaded
  topic: string
}

export function createTopicPageTopicLoadedAction (topic: string): TopicPageTopicLoadedAction {
  return {
    type: TopicPageActionType.TopicLoaded,
    topic
  };
}

export type TopicPageAction =
  | TopicPageArticlesLoadingAction
  | TopicPageArticlesLoadedAction
  | TopicPageClearAction
  | TopicPageTopicLoadingAction
  | TopicPageTopicLoadedAction;

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

const StateContext = createContext<TopicPageState | null>(null);

export function useTopicPageState () {
  return useContext(StateContext);
}

const DispatchContext = createContext<Dispatch<TopicPageAction> | null>(null);

export function useTopicPageDispatch () {
  return useContext(DispatchContext);
}

export default function TopicPageStoreProvider ({ children }: React.PropsWithChildren) {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <StateContext.Provider value={state}>
      <DispatchContext.Provider value={dispatch}>
        {children}
      </DispatchContext.Provider>
    </StateContext.Provider>
  );
}
