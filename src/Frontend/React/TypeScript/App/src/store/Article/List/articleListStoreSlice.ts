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

export type ArticleListStoreAction =
  | ActionToClear
  | ActionToLoad
  | ActionToSet;

export enum ArticleListStoreStatus {
  Fulfilled,
  Pending,
  Rejected
}

export interface ArticleListStoreState {
  data: string | null
  input: number | null
  operationCode: string
  requestStatus: ArticleListStoreStatus
  responseDetails: string
  responseErrors: string
  responseStatusCode: number
}

export const ArticleListStoreDispatchContext = createContext<Dispatch<ArticleListStoreAction> | null>(null);

export const ArticleListStoreStateContext = createContext<ArticleListStoreState | null>(null);

export const initialArticleListStoreState: ArticleListStoreState = {
  data: null,
  input: null,
  operationCode: '',
  requestStatus: ArticleListStoreStatus.Fulfilled,
  responseDetails: '',
  responseErrors: '',
  responseStatusCode: 200
}

export default function reducer (state: ArticleListStoreState, action: ArticleListStoreAction): ArticleListStoreState {
  switch (action.type) {
    case ActionType.Clear: {
      return initialArticleListStoreState;
    }
    case ActionType.Load: {
      const { input } = action;
      return {
        ...state,
        input,
        requestStatus: ArticleListStoreStatus.Pending
      };
    }
    case ActionType.Set: {
      const { data } = action;
      return {
        ...state,
        data,
        requestStatus: ArticleListStoreStatus.Fulfilled
      };
    }
  }
}

export function useArticleListStoreState () {
  return useContext(ArticleListStoreStateContext)!;
}

function useDispatch () {
  return useContext(ArticleListStoreDispatchContext)!;
}

function runDispatchToClear (
  dispatch: Dispatch<ArticleListStoreAction>,
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

export interface ArticleListStoreDispatchOptionsToClear extends AppStoreDispatchOptions {
  callback?: () => void
}

export function useArticleListStoreDispatchToClear ({
  runType,
  callback
}: ArticleListStoreDispatchOptionsToClear = {}) {
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
  dispatch: Dispatch<ArticleListStoreAction>,
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
  dispatch: Dispatch<ArticleListStoreAction>,
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
    setTimeout(() => { resolve(`ArticleList, input=${(input ?? '')}: ${(new Date()).toString()}`); }, 1000)
  }));

  if (!shouldBeCanceled()) {
    runDispatchToSet(dispatch, callback, data);
  }
}

export interface ArticleListStoreDispatchOptionsToLoad extends AppStoreDispatchOptions {
  callback?: (data: string | null) => void
  inputAtRun?: number
}

export function useArticleListStoreDispatchToLoad ({
  runType,
  callback,
  inputAtRun
}: ArticleListStoreDispatchOptionsToLoad = {}) {
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

export interface ArticleListStoreDispatchOptionsToSet extends AppStoreDispatchOptions {
  callback?: (data: string | null) => void
  dataAtRun?: string
}

export function useArticleListStoreDispatchToSet ({
  runType,
  callback,
  dataAtRun
}: ArticleListStoreDispatchOptionsToSet = {}) {
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
