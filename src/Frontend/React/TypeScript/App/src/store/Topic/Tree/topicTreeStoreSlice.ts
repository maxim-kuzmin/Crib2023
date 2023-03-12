import { useContext, createContext, type Dispatch, useEffect } from 'react';
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

export type TopicTreeStoreAction =
  | ActionToClear
  | ActionToLoad
  | ActionToSet;

export enum TopicTreeStoreStatus {
  Fulfilled,
  Pending,
  Rejected
}

export interface TopicTreeStoreState {
  data: string | null
  input: string | null
  operationCode: string
  requestStatus: TopicTreeStoreStatus
  responseDetails: string
  responseErrors: string
  responseStatusCode: number
}

export const TopicTreeStoreDispatchContext = createContext<Dispatch<TopicTreeStoreAction> | null>(null);

export const TopicTreeStoreStateContext = createContext<TopicTreeStoreState | null>(null);

export const initialTopicTreeStoreState: TopicTreeStoreState = {
  data: null,
  input: null,
  operationCode: '',
  requestStatus: TopicTreeStoreStatus.Fulfilled,
  responseDetails: '',
  responseErrors: '',
  responseStatusCode: 200
}

export default function reducer (state: TopicTreeStoreState, action: TopicTreeStoreAction): TopicTreeStoreState {
  switch (action.type) {
    case ActionType.Clear: {
      return initialTopicTreeStoreState;
    }
    case ActionType.Load: {
      const { input } = action;
      return {
        ...state,
        input,
        requestStatus: TopicTreeStoreStatus.Pending
      };
    }
    case ActionType.Set: {
      const { data } = action;
      return {
        ...state,
        data,
        requestStatus: TopicTreeStoreStatus.Fulfilled
      };
    }
  }
}

export function useTopicTreeStoreState () {
  return useContext(TopicTreeStoreStateContext)!;
}

function useDispatch () {
  return useContext(TopicTreeStoreDispatchContext)!;
}

function runDispatchToClear (
  dispatch: Dispatch<TopicTreeStoreAction>,
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

export interface TopicTreeStoreDispatchOptionsToClear extends AppStoreDispatchOptions {
  callback?: () => void
}

export function useTopicTreeStoreDispatchToClear ({
  runType,
  callback
}: TopicTreeStoreDispatchOptionsToClear = {}) {
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

  return () => {
    runDispatchToClear(dispatch, callbackValue);
  };
}

function runDispatchToSet (
  dispatch: Dispatch<TopicTreeStoreAction>,
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
  dispatch: Dispatch<TopicTreeStoreAction>,
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
    setTimeout(() => { resolve(`TopicTree, input=${(input ?? '')}: ${(new Date()).toString()}`); }, 1000)
  }));

  if (!shouldBeCanceled()) {
    runDispatchToSet(dispatch, callback, data);
  }
}

export interface TopicTreeStoreDispatchOptionsToLoad extends AppStoreDispatchOptions {
  callback?: (data: string | null) => void
  inputAtRun?: string
}

export function useTopicTreeStoreDispatchToLoad ({
  runType,
  callback,
  inputAtRun
}: TopicTreeStoreDispatchOptionsToLoad = {}) {
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

  return async (shouldBeCanceled: () => boolean, input: string) => {
    runDispatchToLoad(dispatch, callbackValue, shouldBeCanceled, input)
  };
}

export interface TopicTreeStoreDispatchOptionsToSet extends AppStoreDispatchOptions {
  callback?: (data: string | null) => void
  dataAtRun?: string
}

export function useTopicTreeStoreDispatchToSet ({
  runType,
  callback,
  dataAtRun
}: TopicTreeStoreDispatchOptionsToSet = {}) {
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

  return (data: string | null) => {
    runDispatchToSet(dispatch, callback ?? null, data);
  };
}
