import { useContext, createContext, type Dispatch, useEffect, useCallback } from 'react';
import appStore, {
  AppStoreDispatchType,
  AppStoreStatus,
  type AppStoreDispatchOptions,
  type AppStoreState,
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

type Action = ActionToClear | ActionToLoad | ActionToSet;

interface State extends AppStoreState {
  data: string | null
  input: string | null
}

const DispatchContext = createContext<Dispatch<Action> | null>(null);

const StateContext = createContext<State | null>(null);

const initialState = appStore.createState<State>({
  data: null,
  input: null
});

function reducer (state: State, action: Action): State {
  switch (action.type) {
    case ActionType.Clear: {
      return initialState;
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

function useState () {
  return useContext(StateContext)!;
}

function useDispatch () {
  return useContext(DispatchContext)!;
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

interface DispatchOptionsToClear extends AppStoreDispatchOptions {
  callback?: () => void
}

function useDispatchToClear ({
  dispatchType,
  callback
}: DispatchOptionsToClear = {}) {
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
    setTimeout(() => { resolve(`TopicTree, input=${(input ?? '')}: ${(new Date()).toString()}`); }, 1000)
  }));

  if (!shouldBeCanceled()) {
    runDispatchToSet(dispatch, callback, data);
  }
}

interface DispatchOptionsToLoad extends AppStoreDispatchOptions {
  callback?: (data: string | null) => void
  inputAtDispatch?: string
}

function useDispatchToLoad ({
  dispatchType,
  callback,
  inputAtDispatch
}: DispatchOptionsToLoad = {}) {
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

  return useCallback(async (input: string, shouldBeCanceled: () => boolean = appStore.getFalse) => {
    runDispatchToLoad(dispatch, callbackInner, shouldBeCanceled, input)
  }, [callbackInner, dispatch]);
}

interface DispatchOptionsToSet extends AppStoreDispatchOptions {
  callback?: (data: string | null) => void
  dataAtDispatch?: string
}

function useDispatchToSet ({
  dispatchType,
  callback,
  dataAtDispatch
}: DispatchOptionsToSet = {}) {
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

const topicTreeStoreSlice = {
  DispatchContext,
  StateContext,
  initialState,
  reducer,
  useDispatchToClear,
  useDispatchToLoad,
  useDispatchToSet,
  useState,
};

export default topicTreeStoreSlice;
