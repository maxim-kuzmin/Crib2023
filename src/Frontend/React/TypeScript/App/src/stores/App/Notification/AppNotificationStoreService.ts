import { useContext, createContext, type Dispatch, useEffect, useRef, type Context } from 'react';
import {
  type NotificationData,
  StoreDispatchType,
  type StoreActionOptions
} from '../../../all';

type Data = NotificationData | null;

enum ActionType {
  Clear,
  Set
}

interface ActionToClear {
  type: ActionType.Clear;
}

interface ActionToSet {
  type: ActionType.Set;
  data: Data;
}

type Action = ActionToClear | ActionToSet;

interface State {
  data: Data;
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

type CallbackToClear = () => void;

function runDispatchToClear (
  dispatch: Dispatch<Action>,
  callback: CallbackToClear | null
) {
  const actionToClear: ActionToClear = {
    type: ActionType.Clear
  };

  dispatch(actionToClear);

  if (callback) {
    callback();
  }
}

interface DispatchOptionsToClear extends StoreActionOptions {
  callback?: CallbackToClear;
}

interface DispatchToClear {
  run: () => void;
}

function useDispatchToClear ({
  dispatchType,
  callback
}: DispatchOptionsToClear = {}): DispatchToClear {
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

  return useRef({
    run: () => {
      runDispatchToClear(dispatch, callbackInner);
    }
  }).current;
}

type CallbackToSet = (data: Data) => void;

function runDispatchToSet (
  dispatch: Dispatch<Action>,
  callback: CallbackToSet | null,
  data: Data
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

interface DispatchOptionsToSet extends StoreActionOptions {
  callback?: CallbackToSet;
  dataAtDispatch?: NotificationData;
}

interface DispatchToSet {
  run: (data: Data) => void;
}

function useDispatchToSet ({
  dispatchType,
  callback,
  dataAtDispatch
}: DispatchOptionsToSet = {}): DispatchToSet {
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

  return useRef({
    run: (data: Data) => {
      runDispatchToSet(dispatch, callbackInner, data);
    }
  }).current;
}

export interface AppNotificationStoreService {
  readonly DispatchContext: Context<Dispatch<Action> | null>;
  readonly StateContext: Context<State | null>;
  readonly initialState: State;
  readonly reducer: (state: State, action: Action) => State;
  readonly useDispatchToClear: (options?: DispatchOptionsToClear) => DispatchToClear;
  readonly useDispatchToSet: (options?: DispatchOptionsToSet) => DispatchToSet;
  readonly useState: () => State;
}

export function creareAppNotificationStoreService (): AppNotificationStoreService {
  return {
    DispatchContext,
    StateContext,
    initialState,
    reducer,
    useDispatchToClear,
    useDispatchToSet,
    useState: useStateContext,
  };
}
