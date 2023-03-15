import { useContext, createContext, type Dispatch, useEffect, useCallback } from 'react';
import {
  type NotificationData,
  StoreDispatchType,
  type StoreDispatchOptions,
} from '../../../common';

enum ActionType {
  Clear,
  Set
}

interface ActionToClear {
  type: ActionType.Clear
}

interface ActionToSet {
  type: ActionType.Set
  data: NotificationData | null
}

type Action = ActionToClear | ActionToSet;

interface State {
  data: NotificationData | null
}

const DispatchContext = createContext<Dispatch<Action> | null>(null);

const StateContext = createContext<State | null>(null);

const initialState = {
  data: null
};

function reducer (state: State, action: Action): State {
  switch (action.type) {
    case ActionType.Clear: {
      return initialState;
    }
    case ActionType.Set: {
      const { data } = action;
      return {
        ...state,
        data,
      };
    }
  }
}

function useStateContext () {
  return useContext(StateContext)!;
}

function useDispatchContext () {
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

interface DispatchOptionsToClear extends StoreDispatchOptions {
  callback?: () => void
}

function useDispatchToClear ({
  dispatchType,
  callback
}: DispatchOptionsToClear = {}) {
  const dispatch = useDispatchContext();

  const callbackInner = callback ?? null;

  useEffect(() => {
    if (dispatchType === StoreDispatchType.MountOrUpdate) {
      runDispatchToClear(dispatch, callbackInner);
    };

    return () => {
      if (dispatchType === StoreDispatchType.Unmount) {
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
  callback: ((data: NotificationData | null) => void) | null,
  data: NotificationData | null
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

interface DispatchOptionsToSet extends StoreDispatchOptions {
  callback?: (data: NotificationData | null) => void
  dataAtDispatch?: NotificationData
}

function useDispatchToSet ({
  dispatchType,
  callback,
  dataAtDispatch
}: DispatchOptionsToSet = {}) {
  const dispatch = useDispatchContext();

  const callbackInner = callback ?? null;

  const dataAtDispatchInner = dataAtDispatch ?? null;

  useEffect(() => {
    if (dispatchType === StoreDispatchType.MountOrUpdate) {
      runDispatchToSet(dispatch, callbackInner, dataAtDispatchInner);
    };

    return () => {
      if (dispatchType === StoreDispatchType.Unmount) {
        runDispatchToSet(dispatch, callbackInner, dataAtDispatchInner);
      }
    };
  }, [dispatch, dispatchType, callbackInner, dataAtDispatchInner]);

  return useCallback((data: NotificationData | null) => {
    runDispatchToSet(dispatch, callbackInner, data);
  }, [callbackInner, dispatch]);
}

export const appNotificationStoreSlice = {
  DispatchContext,
  StateContext,
  initialState,
  reducer,
  useDispatchToClear,
  useDispatchToSet,
  useState: useStateContext
};
