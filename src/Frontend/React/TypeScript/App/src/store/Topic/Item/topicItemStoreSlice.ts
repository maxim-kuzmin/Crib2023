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
  payload: number
}

export type TopicItemStoreAction =
  | ActionToClear
  | ActionToLoadStart
  | ActionToLoadEnd;

export enum TopicItemStoreStatus {
  Fulfilled,
  Pending,
  Rejected
}

export interface TopicItemStoreState {
  data: string
  input: number
  operationCode: string
  requestStatus: TopicItemStoreStatus
  responseDetails: string
  responseErrors: string
  responseStatusCode: number
}

export const TopicItemStoreDispatchContext = createContext<Dispatch<TopicItemStoreAction> | null>(null);

export const TopicItemStoreStateContext = createContext<TopicItemStoreState | null>(null);

export const initialTopicItemStoreState: TopicItemStoreState = {
  data: '',
  input: 0,
  operationCode: '',
  requestStatus: TopicItemStoreStatus.Fulfilled,
  responseDetails: '',
  responseErrors: '',
  responseStatusCode: 200
}

export default function reducer (state: TopicItemStoreState, action: TopicItemStoreAction): TopicItemStoreState {
  switch (action.type) {
    case ActionType.LoadStart: {
      const { payload } = action;
      return {
        ...state,
        input: payload,
        requestStatus: TopicItemStoreStatus.Pending
      };
    }
    case ActionType.LoadEnd: {
      const { payload } = action;
      return {
        ...state,
        data: payload,
        requestStatus: TopicItemStoreStatus.Fulfilled
      };
    }
    case ActionType.Clear: {
      return initialTopicItemStoreState;
    }
  }
}

export function useTopicItemStoreState () {
  return useContext(TopicItemStoreStateContext)!;
}

function useDispatch () {
  return useContext(TopicItemStoreDispatchContext)!;
}

export function useTopicItemStoreDispatchToClear () {
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

export function useTopicItemStoreDispatchToLoad (topicId: number) {
  const dispatch = useDispatch();

  useEffect(() => {
    (async () => {
      const actionToLoadStart: ActionToLoadStart = {
        type: ActionType.LoadStart,
        payload: topicId
      };

      dispatch(actionToLoadStart);

      const data = await (new Promise<string>((resolve, reject) => {
        setTimeout(() => { resolve(`TopicItem, topicId=${topicId}: ${(new Date()).toString()}`); }, 1000)
      }));

      const actionToLoadEnd: ActionToLoadEnd = {
        type: ActionType.LoadEnd,
        payload: data
      };

      dispatch(actionToLoadEnd);
    })();
  }, [topicId]);
}
