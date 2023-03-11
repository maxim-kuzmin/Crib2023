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

function runDispatchToClear (dispatch: Dispatch<TopicListStoreAction>) {
  const actionToClear: ActionToClear = {
    type: ActionType.Clear
  };

  dispatch(actionToClear);
}

export function useTopicListStoreDispatchToClear (sholdBeRunOnUnmount: boolean) {
  const dispatch = useDispatch();

  useEffect(() => {
    return () => {
      if (sholdBeRunOnUnmount) {
        runDispatchToClear(dispatch);
      }
    };
  }, []);

  return () => {
    runDispatchToClear(dispatch);
  };
}

async function runDispatchToLoad (
  dispatch: Dispatch<TopicListStoreAction>,
  shouldBeCanceled: () => boolean,
  topicTreePath: string
) {
  const actionToLoadStart: ActionToLoadStart = {
    type: ActionType.LoadStart,
    payload: topicTreePath
  };

  dispatch(actionToLoadStart);

  const data = await (new Promise<string>((resolve, reject) => {
    setTimeout(() => { resolve(`TopicList, topicTreePath=${topicTreePath}: ${(new Date()).toString()}`); }, 1000)
  }));

  if (!shouldBeCanceled()) {
    const actionToLoadEnd: ActionToLoadEnd = {
      type: ActionType.LoadEnd,
      payload: data
    };

    dispatch(actionToLoadEnd);
  }
}

export function useTopicListStoreDispatchToLoad (sholdBeRunOnMountOrUpdate: boolean, topicTreePath: string) {
  const dispatch = useDispatch();

  useEffect(() => {
    let isCanceled = false;

    if (sholdBeRunOnMountOrUpdate) {
      runDispatchToLoad(dispatch, () => isCanceled, topicTreePath);
    }

    return () => {
      isCanceled = true;
    };
  }, [topicTreePath]);

  return async (shouldBeCanceled: () => boolean, topicTreePath: string) => {
    runDispatchToLoad(dispatch, shouldBeCanceled, topicTreePath)
  };
}
