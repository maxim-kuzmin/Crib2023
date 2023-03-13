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

export type ArticleItemStoreAction =
  | ActionToClear
  | ActionToLoad
  | ActionToSet;

export enum ArticleItemStoreStatus {
  Fulfilled,
  Pending,
  Rejected
}

export interface ArticleItemStoreState {
  data: string | null
  input: number | null
  operationCode: string
  requestStatus: ArticleItemStoreStatus
  responseDetails: string
  responseErrors: string
  responseStatusCode: number
}

export const ArticleItemStoreDispatchContext = createContext<Dispatch<ArticleItemStoreAction> | null>(null);

export const ArticleItemStoreStateContext = createContext<ArticleItemStoreState | null>(null);

export const initialArticleItemStoreState: ArticleItemStoreState = {
  data: null,
  input: null,
  operationCode: '',
  requestStatus: ArticleItemStoreStatus.Fulfilled,
  responseDetails: '',
  responseErrors: '',
  responseStatusCode: 200
}

export default function reducer (state: ArticleItemStoreState, action: ArticleItemStoreAction): ArticleItemStoreState {
  switch (action.type) {
    case ActionType.Clear: {
      return initialArticleItemStoreState;
    }
    case ActionType.Load: {
      const { input } = action;
      return {
        ...state,
        input,
        requestStatus: ArticleItemStoreStatus.Pending
      };
    }
    case ActionType.Set: {
      const { data } = action;
      return {
        ...state,
        data,
        requestStatus: ArticleItemStoreStatus.Fulfilled
      };
    }
  }
}

export function useArticleItemStoreState () {
  return useContext(ArticleItemStoreStateContext)!;
}

function useDispatch () {
  return useContext(ArticleItemStoreDispatchContext)!;
}

function runDispatchToClear (
  dispatch: Dispatch<ArticleItemStoreAction>,
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

export interface ArticleItemStoreDispatchOptionsToClear extends AppStoreDispatchOptions {
  callback?: () => void
}

export function useArticleItemStoreDispatchToClear ({
  runType,
  callback
}: ArticleItemStoreDispatchOptionsToClear = {}) {
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
  dispatch: Dispatch<ArticleItemStoreAction>,
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
  dispatch: Dispatch<ArticleItemStoreAction>,
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
    setTimeout(() => { resolve(`ArticleItem, input=${(input ?? '')}: ${(new Date()).toString()}`); }, 1000)
  }));

  if (!shouldBeCanceled()) {
    runDispatchToSet(dispatch, callback, data);
  }
}

export interface ArticleItemStoreDispatchOptionsToLoad extends AppStoreDispatchOptions {
  callback?: (data: string | null) => void
  inputAtRun?: number
}

export function useArticleItemStoreDispatchToLoad ({
  runType,
  callback,
  inputAtRun
}: ArticleItemStoreDispatchOptionsToLoad = {}) {
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

  const result = useCallback(async (shouldBeCanceled: () => boolean, input: number) => {
    runDispatchToLoad(dispatch, callbackValue, shouldBeCanceled, input)
  }, [callbackValue, dispatch]);

  return result;
}

export interface ArticleItemStoreDispatchOptionsToSet extends AppStoreDispatchOptions {
  callback?: (data: string | null) => void
  dataAtRun?: string
}

export function useArticleItemStoreDispatchToSet ({
  runType,
  callback,
  dataAtRun
}: ArticleItemStoreDispatchOptionsToSet = {}) {
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
