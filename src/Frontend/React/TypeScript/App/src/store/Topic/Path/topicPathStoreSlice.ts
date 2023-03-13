import { useContext, createContext, type Dispatch, useEffect, useCallback } from 'react';
import {
  type AppStoreDispatchOptions,
  AppStoreDispatchType,
  type AppStoreState,
  AppStoreStatus,
  createAppStoreState
} from '../../../app/store';

enum ActionType {
  Clear,
  Load,
  Set
}

interface ActionToClear {
  type: ActionType.Clear
}

interface ActionToLoad {
  type: ActionType.Load
  input: string | null
}

interface ActionToSet {
  type: ActionType.Set
  data: string | null
}

export type Action = ActionToClear | ActionToLoad | ActionToSet;

export interface TopicPathStoreState extends AppStoreState {
  data: string | null
  input: string | null
}

export const TopicPathStoreDispatchContext = createContext<Dispatch<Action> | null>(null);

export const TopicPathStoreStateContext = createContext<TopicPathStoreState | null>(null);

export const initialTopicPathStoreState = createAppStoreState<TopicPathStoreState>({
  data: null,
  input: null
});

export default function reducer (state: TopicPathStoreState, action: Action): TopicPathStoreState {
  switch (action.type) {
    case ActionType.Clear: {
      return initialTopicPathStoreState;
    }
    case ActionType.Load: {
      const { input } = action;
      return {
        ...state,
        input,
        requestStatus: AppStoreStatus.Pending
      };
    }
    case ActionType.Set: {
      const { data } = action;
      return {
        ...state,
        data,
        requestStatus: AppStoreStatus.Fulfilled
      };
    }
  }
}

export function useTopicPathStoreState () {
  return useContext(TopicPathStoreStateContext)!;
}

function useDispatch () {
  return useContext(TopicPathStoreDispatchContext)!;
}

function runDispatchToClear (
  dispatch: Dispatch<Action>,
  callback: (() => void) | null
) {
  const actionToClear: ActionToClear = {
    type: ActionType.Clear
  };

  dispatch(actionToClear);

  if (callback) {
    callback();
  }
}

export interface TopicPathStoreDispatchOptionsToClear extends AppStoreDispatchOptions {
  callback?: () => void
}

export function useTopicPathStoreDispatchToClear ({
  dispatchType,
  callback
}: TopicPathStoreDispatchOptionsToClear = {}) {
  const dispatch = useDispatch();

  const callbackInner = callback ?? null;

  useEffect(() => {
    if (dispatchType === AppStoreDispatchType.MountOrUpdate) {
      runDispatchToClear(dispatch, callbackInner);
    };

    return () => {
      if (dispatchType === AppStoreDispatchType.Unmount) {
        runDispatchToClear(dispatch, callbackInner);
      }
    };
  }, [dispatch, dispatchType, callbackInner]);

  return useCallback(() => {
    runDispatchToClear(dispatch, callbackInner);
  }, [callbackInner, dispatch]);
}

function runDispatchToSet (
  dispatch: Dispatch<Action>,
  callback: ((data: string | null) => void) | null,
  data: string | null
) {
  const actionToSet: ActionToSet = {
    type: ActionType.Set,
    data
  };

  dispatch(actionToSet);

  if (callback) {
    callback(data);
  }
}

async function runDispatchToLoad (
  dispatch: Dispatch<Action>,
  callback: ((data: string | null) => void) | null,
  shouldBeCanceled: () => boolean,
  input: string | null
) {
  const actionToLoad: ActionToLoad = {
    type: ActionType.Load,
    input
  };

  dispatch(actionToLoad);

  const data = await (new Promise<string>((resolve, reject) => {
    setTimeout(() => { resolve(`TopicPath, input=${(input ?? '')}: ${(new Date()).toString()}`); }, 1000)
  }));

  if (!shouldBeCanceled()) {
    runDispatchToSet(dispatch, callback, data);
  }
}

export interface TopicPathStoreDispatchOptionsToLoad extends AppStoreDispatchOptions {
  callback?: (data: string | null) => void
  inputAtDispatch?: string
}

export function useTopicPathStoreDispatchToLoad ({
  dispatchType,
  callback,
  inputAtDispatch
}: TopicPathStoreDispatchOptionsToLoad = {}) {
  const dispatch = useDispatch();

  const callbackInner = callback ?? null;

  const inputAtDispatchInner = inputAtDispatch ?? null;

  useEffect(() => {
    let isCanceled = false;

    const shouldBeCanceledInner = () => isCanceled;

    if (dispatchType === AppStoreDispatchType.MountOrUpdate) {
      runDispatchToLoad(dispatch, callbackInner, shouldBeCanceledInner, inputAtDispatchInner);
    }

    return () => {
      if (dispatchType === AppStoreDispatchType.Unmount) {
        runDispatchToLoad(dispatch, callbackInner, shouldBeCanceledInner, inputAtDispatchInner);
      } else {
        isCanceled = true;
      }
    };
  }, [dispatch, dispatchType, callbackInner, inputAtDispatchInner]);

  return useCallback(async (shouldBeCanceled: () => boolean, input: string) => {
    runDispatchToLoad(dispatch, callbackInner, shouldBeCanceled, input)
  }, [callbackInner, dispatch]);
}

export interface TopicPathStoreDispatchOptionsToSet extends AppStoreDispatchOptions {
  callback?: (data: string | null) => void
  dataAtDispatch?: string
}

export function useTopicPathStoreDispatchToSet ({
  dispatchType,
  callback,
  dataAtDispatch
}: TopicPathStoreDispatchOptionsToSet = {}) {
  const dispatch = useDispatch();

  const callbackInner = callback ?? null;

  const dataAtDispatchInner = dataAtDispatch ?? null;

  useEffect(() => {
    if (dispatchType === AppStoreDispatchType.MountOrUpdate) {
      runDispatchToSet(dispatch, callbackInner, dataAtDispatchInner);
    };

    return () => {
      if (dispatchType === AppStoreDispatchType.Unmount) {
        runDispatchToSet(dispatch, callbackInner, dataAtDispatchInner);
      }
    };
  }, [dispatch, dispatchType, callbackInner, dataAtDispatchInner]);

  return useCallback((data: string | null) => {
    runDispatchToSet(dispatch, callbackInner, data);
  }, [callbackInner, dispatch]);
}
