import { useContext, createContext, type Dispatch, useEffect, useCallback } from 'react';
import AppRunType from '../../../app/AppRunType';
import type AppStoreDispatchOptions from '../../../app/store/AppStoreDispatchOptions';

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

export type TopicPathStoreAction =
  | ActionToClear
  | ActionToLoad
  | ActionToSet;

export enum TopicPathStoreStatus {
  Fulfilled,
  Pending,
  Rejected
}

export interface TopicPathStoreState {
  data: string | null
  input: string | null
  operationCode: string
  requestStatus: TopicPathStoreStatus
  responseDetails: string
  responseErrors: string
  responseStatusCode: number
}

export const TopicPathStoreDispatchContext = createContext<Dispatch<TopicPathStoreAction> | null>(null);

export const TopicPathStoreStateContext = createContext<TopicPathStoreState | null>(null);

export const initialTopicPathStoreState: TopicPathStoreState = {
  data: null,
  input: null,
  operationCode: '',
  requestStatus: TopicPathStoreStatus.Fulfilled,
  responseDetails: '',
  responseErrors: '',
  responseStatusCode: 200
}

export default function reducer (state: TopicPathStoreState, action: TopicPathStoreAction): TopicPathStoreState {
  switch (action.type) {
    case ActionType.Clear: {
      return initialTopicPathStoreState;
    }
    case ActionType.Load: {
      const { input } = action;
      return {
        ...state,
        input,
        requestStatus: TopicPathStoreStatus.Pending
      };
    }
    case ActionType.Set: {
      const { data } = action;
      return {
        ...state,
        data,
        requestStatus: TopicPathStoreStatus.Fulfilled
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
  dispatch: Dispatch<TopicPathStoreAction>,
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
  runType,
  callback
}: TopicPathStoreDispatchOptionsToClear = {}) {
  const dispatch = useDispatch();

  const callbackValue = callback ?? null;

  useEffect(() => {
    if (runType === AppRunType.MountOrUpdate) {
      runDispatchToClear(dispatch, callbackValue);
    };

    return () => {
      if (runType === AppRunType.Unmount) {
        runDispatchToClear(dispatch, callbackValue);
      }
    };
  }, [dispatch, runType, callbackValue]);

  const result = useCallback(() => {
    runDispatchToClear(dispatch, callbackValue);
  }, [callbackValue, dispatch]);

  return result;
}

function runDispatchToSet (
  dispatch: Dispatch<TopicPathStoreAction>,
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
  dispatch: Dispatch<TopicPathStoreAction>,
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
  inputAtRun?: string
}

export function useTopicPathStoreDispatchToLoad ({
  runType,
  callback,
  inputAtRun
}: TopicPathStoreDispatchOptionsToLoad = {}) {
  const dispatch = useDispatch();

  const callbackValue = callback ?? null;

  const inputAtRunValue = inputAtRun ?? null;

  useEffect(() => {
    let isCanceled = false;

    const shouldBeCanceledValue = () => isCanceled;

    if (runType === AppRunType.MountOrUpdate) {
      runDispatchToLoad(dispatch, callbackValue, shouldBeCanceledValue, inputAtRunValue);
    }

    return () => {
      if (runType === AppRunType.Unmount) {
        runDispatchToLoad(dispatch, callbackValue, shouldBeCanceledValue, inputAtRunValue);
      } else {
        isCanceled = true;
      }
    };
  }, [dispatch, runType, callbackValue, inputAtRunValue]);

  const result = useCallback(async (shouldBeCanceled: () => boolean, input: string) => {
    runDispatchToLoad(dispatch, callbackValue, shouldBeCanceled, input)
  }, [callbackValue, dispatch]);

  return result;
}

export interface TopicPathStoreDispatchOptionsToSet extends AppStoreDispatchOptions {
  callback?: (data: string | null) => void
  dataAtRun?: string
}

export function useTopicPathStoreDispatchToSet ({
  runType,
  callback,
  dataAtRun
}: TopicPathStoreDispatchOptionsToSet = {}) {
  const dispatch = useDispatch();

  const callbackValue = callback ?? null;

  const dataAtRunValue = dataAtRun ?? null;

  useEffect(() => {
    if (runType === AppRunType.MountOrUpdate) {
      runDispatchToSet(dispatch, callbackValue, dataAtRunValue);
    };

    return () => {
      if (runType === AppRunType.Unmount) {
        runDispatchToSet(dispatch, callbackValue, dataAtRunValue);
      }
    };
  }, [dispatch, runType, callbackValue, dataAtRunValue]);

  const result = useCallback((data: string | null) => {
    runDispatchToSet(dispatch, callbackValue, data);
  }, [callbackValue, dispatch]);

  return result;
}
