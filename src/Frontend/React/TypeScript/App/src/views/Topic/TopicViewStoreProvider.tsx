import React, { useContext, useReducer, createContext, type Dispatch } from 'react';

export interface TopicViewState {
  articles: string
  topic: string
  topicId: number
}

const initialState: TopicViewState = {
  articles: '',
  topic: '',
  topicId: 0
};

export enum TopicViewActionType {
  ArticlesLoading,
  ArticlesLoaded,
  Clear,
  TopicLoading,
  TopicLoaded
}

export interface ArticlesViewLoadingAction {
  type: TopicViewActionType.ArticlesLoading
  topicId: number
}

export interface ArticlesViewLoadedAction {
  type: TopicViewActionType.ArticlesLoaded
  articles: string
}

export interface ClearAction {
  type: TopicViewActionType.Clear
}

export interface TopicViewLoadingAction {
  type: TopicViewActionType.TopicLoading
  topicId: number
}

export interface TopicViewLoadedAction {
  type: TopicViewActionType.TopicLoaded
  topic: string
}

export type TopicViewAction =
  | ArticlesViewLoadingAction
  | ArticlesViewLoadedAction
  | ClearAction
  | TopicViewLoadingAction
  | TopicViewLoadedAction;

function reducer (state: TopicViewState, action: TopicViewAction): TopicViewState {
  switch (action.type) {
    case TopicViewActionType.ArticlesLoading: {
      const { topicId } = action;
      return {
        ...state,
        topicId
      };
    }
    case TopicViewActionType.ArticlesLoaded: {
      const { articles } = action;
      return {
        ...state,
        articles
      };
    }
    case TopicViewActionType.Clear: {
      return initialState;
    }
    case TopicViewActionType.TopicLoading: {
      const { topicId } = action;
      return {
        ...state,
        topicId
      };
    }
    case TopicViewActionType.TopicLoaded: {
      const { topic } = action;
      return {
        ...state,
        topic
      };
    }
  }
}

const TopicViewStateContext = createContext<TopicViewState | null>(null);

const TopicViewDispatchContext = createContext<Dispatch<TopicViewAction> | null>(null);

export function useTopicViewState () {
  return useContext(TopicViewStateContext);
}

export function useTopicViewDispatch () {
  return useContext(TopicViewDispatchContext);
}

export default function TopicViewStoreProvider ({ children }: React.PropsWithChildren) {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <TopicViewStateContext.Provider value={state}>
      <TopicViewDispatchContext.Provider value={dispatch}>
        {children}
      </TopicViewDispatchContext.Provider>
    </TopicViewStateContext.Provider>
  );
}
