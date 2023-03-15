import { useContext, createContext, type Dispatch, useEffect, useRef, type Context } from 'react';
import {
  getStoreService,
  StoreDispatchType,
  StoreStatus,
  type StoreDispatchOptions,
  type StoreState,
} from '../../../common';

const storeService = getStoreService();

type Data = string | null;

type Input = string | null;

enum ActionType {
  Clear,
  Load,
  Set
}

interface ActionToClear {
  type: ActionType.Clear;
}

interface ActionToLoad {
  type: ActionType.Load;
  input: Input;
}

interface ActionToSet {
  type: ActionType.Set;
  data: Data;
}

type Action = ActionToClear | ActionToLoad | ActionToSet;

interface State extends StoreState {
  data: Data;
  input: Input;
}

const DispatchContext = createContext<Dispatch<Action> | null>(null);

const StateContext = createContext<State | null>(null);

const initialState = storeService.createState<State>({
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
        requestStatus: StoreStatus.Pending
      };
    }
    case ActionType.Set: {
      const { data } = action;
      return {
        ...state,
        data,
        requestStatus: StoreStatus.Fulfilled
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

interface DispatchOptionsToClear extends StoreDispatchOptions {
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

type ShouldBeCanceled = () => boolean;

async function runDispatchToLoad (
  dispatch: Dispatch<Action>,
  callback: CallbackToSet | null,
  shouldBeCanceled: ShouldBeCanceled,
  input: Input
) {
  const actionToLoad: ActionToLoad = {
    type: ActionType.Load,
    input
  };

  dispatch(actionToLoad);

  const data = await (new Promise<Data>((resolve, reject) => {
    setTimeout(() => { resolve(`TopicTree, input=${(input ?? '')}: ${(new Date()).toString()}`); }, 1000)
  }));

  if (!shouldBeCanceled()) {
    runDispatchToSet(dispatch, callback, data);
  }
}

interface DispatchOptionsToLoad extends StoreDispatchOptions {
  callback?: CallbackToSet;
  inputAtDispatch?: Input;
}

interface DispatchToLoad {
  run: (input: Input, shouldBeCanceled: ShouldBeCanceled) => void;
}

function useDispatchToLoad ({
  dispatchType,
  callback,
  inputAtDispatch
}: DispatchOptionsToLoad = {}): DispatchToLoad {
  const dispatch = useDispatchContext();

  const callbackInner = callback ?? null;

  const inputAtDispatchInner = inputAtDispatch ?? null;

  useEffect(() => {
    let isCanceled = false;

    const shouldBeCanceledInner = () => isCanceled;

    if (dispatchType === StoreDispatchType.MountOrUpdate) {
      runDispatchToLoad(dispatch, callbackInner, shouldBeCanceledInner, inputAtDispatchInner);
    }

    return () => {
      if (dispatchType === StoreDispatchType.Unmount) {
        runDispatchToLoad(dispatch, callbackInner, shouldBeCanceledInner, inputAtDispatchInner);
      } else {
        isCanceled = true;
      }
    };
  }, [dispatch, dispatchType, callbackInner, inputAtDispatchInner]);

  return useRef({
    run: async (input: Input, shouldBeCanceled: ShouldBeCanceled = storeService.getFalse) => {
      runDispatchToLoad(dispatch, callbackInner, shouldBeCanceled, input)
    }
  }).current;
}

interface DispatchOptionsToSet extends StoreDispatchOptions {
  callback?: CallbackToSet;
  dataAtDispatch?: Data;
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

export interface TopicTreeStoreService {
  readonly DispatchContext: Context<Dispatch<Action> | null>;
  readonly StateContext: Context<State | null>;
  readonly initialState: State;
  readonly reducer: (state: State, action: Action) => State;
  readonly useDispatchToClear: (options?: DispatchOptionsToClear) => DispatchToClear;
  readonly useDispatchToLoad: (options?: DispatchOptionsToLoad) => DispatchToLoad;
  readonly useDispatchToSet: (options?: DispatchOptionsToSet) => DispatchToSet;
  readonly useState: () => State;
}

const service: TopicTreeStoreService = {
  DispatchContext,
  StateContext,
  initialState,
  reducer,
  useDispatchToClear,
  useDispatchToLoad,
  useDispatchToSet,
  useState: useStateContext,
};

export function getTopicTreeStoreService (): TopicTreeStoreService {
  return service;
}
