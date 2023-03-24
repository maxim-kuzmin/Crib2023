import { useContext, createContext, type Dispatch, useEffect, useRef, type Context } from 'react';
import {
  createOperationState,
  StoreDispatchType,
  OperationStatus,
  type StoreDispatchOptions,
  type OperationState,
  type ArticleDomainListGetOperationInput,
  type ArticleDomainListGetOperationResponse,
  getModule,
  type ArticleDomainListGetOperationRequestHandler,
  createArticleDomainListGetOperationRequest,
  type ShouldBeCanceled
} from '../../../all';

type Data = ArticleDomainListGetOperationResponse;

type Input = ArticleDomainListGetOperationInput;

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
  data: Data | null;
}

type Action = ActionToClear | ActionToLoad | ActionToSet;

interface State extends OperationState {
  data: Data | null;
  input: Input | null;
}

const DispatchContext = createContext<Dispatch<Action> | null>(null);

const StateContext = createContext<State | null>(null);

const initialState = createOperationState<State>({
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
        status: OperationStatus.Pending
      };
    }
    case ActionType.Set: {
      const { data } = action;
      return {
        ...state,
        data,
        status: OperationStatus.Fulfilled
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

type CallbackToSet = (data: Data | null) => void;

function runDispatchToSet (
  dispatch: Dispatch<Action>,
  callback: CallbackToSet | null,
  data: Data | null
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
  requestHandler: ArticleDomainListGetOperationRequestHandler,
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

  const data = await requestHandler.handle(
    createArticleDomainListGetOperationRequest(input),
    shouldBeCanceled
  );

  if (!shouldBeCanceled()) {
    runDispatchToSet(dispatch, callback, data);
  }
}

interface DispatchOptionsToLoad extends StoreDispatchOptions {
  callback?: CallbackToSet;
  inputAtDispatch: Input;
}

interface DispatchToLoad {
  run: (input: Input, shouldBeCanceled: ShouldBeCanceled) => void;
}

function useDispatchToLoad (options?: DispatchOptionsToLoad): DispatchToLoad {
  const dispatch = useDispatchContext();

  const callbackInner = options?.callback ?? null;

  const inputAtDispatchInner = options?.inputAtDispatch ?? null;

  const requestHandler = useRef(getModule().useArticleDomainListGetOperationRequestHandler()).current;

  useEffect(() => {
    let isCanceled = false;

    const shouldBeCanceledInner = () => isCanceled;

    if (options?.dispatchType === StoreDispatchType.MountOrUpdate && inputAtDispatchInner) {
      runDispatchToLoad(requestHandler, dispatch, callbackInner, shouldBeCanceledInner, inputAtDispatchInner);
    }

    return () => {
      if (options?.dispatchType === StoreDispatchType.Unmount && inputAtDispatchInner) {
        runDispatchToLoad(requestHandler, dispatch, callbackInner, shouldBeCanceledInner, inputAtDispatchInner);
      } else {
        isCanceled = true;
      }
    };
  }, [requestHandler, dispatch, options?.dispatchType, callbackInner, inputAtDispatchInner]);

  return useRef({
    run: async (input: Input, shouldBeCanceled: ShouldBeCanceled = () => false) => {
      runDispatchToLoad(requestHandler, dispatch, callbackInner, shouldBeCanceled, input)
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

export interface ArticleListStoreService {
  readonly DispatchContext: Context<Dispatch<Action> | null>;
  readonly StateContext: Context<State | null>;
  readonly initialState: State;
  readonly reducer: (state: State, action: Action) => State;
  readonly useDispatchToClear: (options?: DispatchOptionsToClear) => DispatchToClear;
  readonly useDispatchToLoad: (options?: DispatchOptionsToLoad) => DispatchToLoad;
  readonly useDispatchToSet: (options?: DispatchOptionsToSet) => DispatchToSet;
  readonly useState: () => State;
}

export function createArticleListStoreService (): ArticleListStoreService {
  return {
    DispatchContext,
    StateContext,
    initialState,
    reducer,
    useDispatchToClear,
    useDispatchToLoad,
    useDispatchToSet,
    useState: useStateContext,
  };
}
