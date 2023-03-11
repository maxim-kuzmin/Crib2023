import { useContext, createContext, type Dispatch, useEffect } from 'react';

enum ActionType {
  Clear,
  LoadEnd,
  LoadStart
}

interface ActionToClear {
  type: ActionType.Clear
}

interface ActionToLoadEnd {
  type: ActionType.LoadEnd
  payload: string
}

interface ActionToLoadStart {
  type: ActionType.LoadStart
  payload: string
}

export type TopicListStoreAction =
  | ActionToClear
  | ActionToLoadStart
  | ActionToLoadEnd;

export enum TopicListStoreStatus {
  Fulfilled,
  Pending,
  Rejected
}

export interface TopicListStoreState {
  data: string
  input: string
  operationCode: string
  requestStatus: TopicListStoreStatus
  responseDetails: string
  responseErrors: string
  responseStatusCode: number
}

export const TopicListStoreDispatchContext = createContext<Dispatch<TopicListStoreAction> | null>(null);

export const TopicListStoreStateContext = createContext<TopicListStoreState | null>(null);

export const initialTopicListStoreState: TopicListStoreState = {
  data: '',
  input: '',
  operationCode: '',
  requestStatus: TopicListStoreStatus.Fulfilled,
  responseDetails: '',
  responseErrors: '',
  responseStatusCode: 200
}

export default function reducer (state: TopicListStoreState, action: TopicListStoreAction): TopicListStoreState {
  switch (action.type) {
    case ActionType.LoadStart: {
      const { payload } = action;
      return {
        ...state,
        input: payload,
        requestStatus: TopicListStoreStatus.Pending
      };
    }
    case ActionType.LoadEnd: {
      const { payload } = action;
      return {
        ...state,
        data: payload,
        requestStatus: TopicListStoreStatus.Fulfilled
      };
    }
    case ActionType.Clear: {
      return initialTopicListStoreState;
    }
  }
}

export function useTopicListStoreState () {
  return useContext(TopicListStoreStateContext)!;
}

function useDispatch () {
  return useContext(TopicListStoreDispatchContext)!;
}

export function useTopicListStoreDispatchToClear () {
  const dispatch = useDispatch();

  useEffect(() => {
    const actionToClear: ActionToClear = {
      type: ActionType.Clear
    };

    return () => {
      dispatch(actionToClear);
    };
  }, []);
}

export function useTopicListStoreDispatchToLoad (topicTreePath: string) {
  const dispatch = useDispatch();

  useEffect(() => {
    (async () => {
      const actionToLoadStart: ActionToLoadStart = {
        type: ActionType.LoadStart,
        payload: topicTreePath
      };

      dispatch(actionToLoadStart);

      const data = await (new Promise<string>((resolve, reject) => {
        setTimeout(() => { resolve(`TopicList, topicTreePath=${topicTreePath}: ${(new Date()).toString()}`); }, 1000)
      }));

      const actionToLoadEnd: ActionToLoadEnd = {
        type: ActionType.LoadEnd,
        payload: data
      };

      dispatch(actionToLoadEnd);
    })();
  }, [topicTreePath]);
}
