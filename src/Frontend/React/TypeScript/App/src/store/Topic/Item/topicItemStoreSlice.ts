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
  input: number | null
}

interface ActionToSet {
  type: ActionType.Set
  data: string | null
}

export type TopicItemStoreAction =
  | ActionToClear
  | ActionToLoad
  | ActionToSet;

export enum TopicItemStoreStatus {
  Fulfilled,
  Pending,
  Rejected
}

export interface TopicItemStoreState {
  data: string | null
  input: number | null
  operationCode: string
  requestStatus: TopicItemStoreStatus
  responseDetails: string
  responseErrors: string
  responseStatusCode: number
}

export const TopicItemStoreDispatchContext = createContext<Dispatch<TopicItemStoreAction> | null>(null);

export const TopicItemStoreStateContext = createContext<TopicItemStoreState | null>(null);

export const initialTopicItemStoreState: TopicItemStoreState = {
  data: null,
  input: null,
  operationCode: '',
  requestStatus: TopicItemStoreStatus.Fulfilled,
  responseDetails: '',
  responseErrors: '',
  responseStatusCode: 200
}

export default function reducer (state: TopicItemStoreState, action: TopicItemStoreAction): TopicItemStoreState {
  switch (action.type) {
    case ActionType.Clear: {
      return initialTopicItemStoreState;
    }
    case ActionType.Load: {
      const { input } = action;
      return {
        ...state,
        input,
        requestStatus: TopicItemStoreStatus.Pending
      };
    }
    case ActionType.Set: {
      const { data } = action;
      return {
        ...state,
        data,
        requestStatus: TopicItemStoreStatus.Fulfilled
      };
    }
  }
}

export function useTopicItemStoreState () {
  return useContext(TopicItemStoreStateContext)!;
}

function useDispatch () {
  return useContext(TopicItemStoreDispatchContext)!;
}

function runDispatchToClear (
  dispatch: Dispatch<TopicItemStoreAction>,
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

export interface TopicItemStoreDispatchOptionsToClear extends AppStoreDispatchOptions {
  callback?: () => void
}

export function useTopicItemStoreDispatchToClear ({
  runType,
  callback
}: TopicItemStoreDispatchOptionsToClear = {}) {
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
  dispatch: Dispatch<TopicItemStoreAction>,
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
  dispatch: Dispatch<TopicItemStoreAction>,
  callback: ((data: string | null) => void) | null,
  shouldBeCanceled: () => boolean,
  input: number | null
) {
  const actionToLoad: ActionToLoad = {
    type: ActionType.Load,
    input
  };

  dispatch(actionToLoad);

  const data = await (new Promise<string>((resolve, reject) => {
    setTimeout(() => { resolve(`TopicItem, input=${(input ?? '')}: ${(new Date()).toString()}`); }, 1000)
  }));

  if (!shouldBeCanceled()) {
    runDispatchToSet(dispatch, callback, data);
  }
}

export interface TopicItemStoreDispatchOptionsToLoad extends AppStoreDispatchOptions {
  callback?: (data: string | null) => void
  inputAtRun?: number
}

export function useTopicItemStoreDispatchToLoad ({
  runType,
  callback,
  inputAtRun
}: TopicItemStoreDispatchOptionsToLoad = {}) {
  const dispatch = useDispatch();

  const callbackValue = callback ?? null;

  const inputAtRunValue = inputAtRun ?? null;

  useEffect(() => {
    let isCanceled = false;

    const shouldBeCanceled = () => isCanceled;

    if (runType === AppRunType.MountOrUpdate) {
      runDispatchToLoad(dispatch, callbackValue, shouldBeCanceled, inputAtRunValue);
    }

    return () => {
      if (runType === AppRunType.Unmount) {
        runDispatchToLoad(dispatch, callbackValue, shouldBeCanceled, inputAtRunValue);
      } else {
        isCanceled = true;
      }
    };
  }, [dispatch, runType, callbackValue, inputAtRunValue]);

  const result = useCallback(async (shouldBeCanceled: () => boolean, input: number) => {
    runDispatchToLoad(dispatch, callbackValue, shouldBeCanceled, input)
  }, [callbackValue, dispatch]);

  return result;
}

export interface TopicItemStoreDispatchOptionsToSet extends AppStoreDispatchOptions {
  callback?: (data: string | null) => void
  dataAtRun?: string
}

export function useTopicItemStoreDispatchToSet ({
  runType,
  callback,
  dataAtRun
}: TopicItemStoreDispatchOptionsToSet = {}) {
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
