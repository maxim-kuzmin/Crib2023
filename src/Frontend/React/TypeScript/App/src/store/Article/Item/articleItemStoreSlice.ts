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
  input: number | null
}

interface ActionToSet {
  type: ActionType.Set
  data: string | null
}

type Action = ActionToClear | ActionToLoad | ActionToSet;

export interface ArticleItemStoreState extends AppStoreState {
  data: string | null
  input: number | null
}

export const ArticleItemStoreDispatchContext = createContext<Dispatch<Action> | null>(null);

export const ArticleItemStoreStateContext = createContext<ArticleItemStoreState | null>(null);

export const initialArticleItemStoreState = createAppStoreState<ArticleItemStoreState>({
  data: null,
  input: null
});

export default function reducer (state: ArticleItemStoreState, action: Action): ArticleItemStoreState {
  switch (action.type) {
    case ActionType.Clear: {
      return initialArticleItemStoreState;
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

export function useArticleItemStoreState () {
  return useContext(ArticleItemStoreStateContext)!;
}

function useDispatch () {
  return useContext(ArticleItemStoreDispatchContext)!;
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

export interface ArticleItemStoreDispatchOptionsToClear extends AppStoreDispatchOptions {
  callback?: () => void
}

export function useArticleItemStoreDispatchToClear ({
  dispatchType,
  callback
}: ArticleItemStoreDispatchOptionsToClear = {}) {
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
  inputAtDispatch?: number
}

export function useArticleItemStoreDispatchToLoad ({
  dispatchType,
  callback,
  inputAtDispatch
}: ArticleItemStoreDispatchOptionsToLoad = {}) {
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

  return useCallback(async (shouldBeCanceled: () => boolean, input: number) => {
    runDispatchToLoad(dispatch, callbackInner, shouldBeCanceled, input)
  }, [callbackInner, dispatch]);
}

export interface ArticleItemStoreDispatchOptionsToSet extends AppStoreDispatchOptions {
  callback?: (data: string | null) => void
  dataAtDispatch?: string
}

export function useArticleItemStoreDispatchToSet ({
  dispatchType,
  callback,
  dataAtDispatch
}: ArticleItemStoreDispatchOptionsToSet = {}) {
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
