import { useContext, createContext, type Dispatch, useEffect, useRef, type Context } from 'react';
import {
  createOperationState,
  StoreDispatchType,
  OperationStatus,
  type StoreActionOptions,
  type OperationState,
  type TopicDomainTreeGetOperationInput,
  type TopicDomainTreeGetOperationResponse,
  getModule,
  type TopicDomainTreeGetOperationRequestHandler,
  createTopicDomainTreeGetOperationRequest,
  type ShouldBeCanceled
} from '../../../all';

type Response = TopicDomainTreeGetOperationResponse | null;

type Input = TopicDomainTreeGetOperationInput | null;

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
  response: Response;
}

type Action = ActionToClear | ActionToLoad | ActionToSet;

interface State extends OperationState {
  response: Response;
  input: Input;
}

const DispatchContext = createContext<Dispatch<Action> | null>(null);

const StateContext = createContext<State | null>(null);

const initialState = createOperationState<State>({
  response: null,
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
      const { response } = action;
      return {
        ...state,
        response,
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

type CallbackToSet = (response: Response) => void;

function runDispatchToSet (
  dispatch: Dispatch<Action>,
  callback: CallbackToSet | null,
  response: Response
) {
  const actionToSet: ActionToSet = {
    type: ActionType.Set,
    response
  };

  dispatch(actionToSet);

  if (callback) {
    callback(response);
  }
}

async function runDispatchToLoad (
  requestHandler: TopicDomainTreeGetOperationRequestHandler,
  dispatch: Dispatch<Action>,
  callback: CallbackToSet | null,
  shouldBeCanceled: ShouldBeCanceled,
  input: Input
) {
  if (shouldBeCanceled()) {
    return;
  }

  const actionToLoad: ActionToLoad = {
    type: ActionType.Load,
    input
  };

  dispatch(actionToLoad);

  const response = input
    ? await requestHandler.handle(
      createTopicDomainTreeGetOperationRequest(input),
      shouldBeCanceled
    )
    : null;

  if (shouldBeCanceled()) {
    return;
  }

  runDispatchToSet(dispatch, callback, response);
}

interface DispatchOptionsToLoad extends StoreActionOptions {
  callback?: CallbackToSet;
  payload: Input;
}

interface DispatchToLoad {
  run: (input: Input, shouldBeCanceled: ShouldBeCanceled) => void;
}

function useDispatchToLoad (options?: DispatchOptionsToLoad): DispatchToLoad {
  const dispatch = useDispatchContext();

  const callbackInner = options?.callback ?? null;

  const payloadInner = options?.payload ?? null;

  const requestHandler = useRef(getModule().useTopicDomainTreeGetOperationRequestHandler()).current;

  useEffect(() => {
    let isCanceled = options?.isCanceled ?? false;

    const shouldBeCanceledInner = () => isCanceled;

    if (options?.dispatchType === StoreDispatchType.MountOrUpdate && payloadInner) {
      runDispatchToLoad(requestHandler, dispatch, callbackInner, shouldBeCanceledInner, payloadInner);
    }

    return () => {
      if (options?.dispatchType === StoreDispatchType.Unmount && payloadInner) {
        runDispatchToLoad(requestHandler, dispatch, callbackInner, shouldBeCanceledInner, payloadInner);
      } else {
        isCanceled = true;
      }
    };
  }, [
    requestHandler,
    dispatch,
    options?.dispatchType,
    options?.isCanceled,
    callbackInner,
    payloadInner
  ]);

  return useRef({
    run: async (input: Input, shouldBeCanceled: ShouldBeCanceled = () => false) => {
      runDispatchToLoad(requestHandler, dispatch, callbackInner, shouldBeCanceled, input)
    }
  }).current;
}

interface DispatchOptionsToSet extends StoreActionOptions {
  callback?: CallbackToSet;
  payload?: Response;
}

interface DispatchToSet {
  run: (response: Response) => void;
}

function useDispatchToSet ({
  dispatchType,
  callback,
  payload
}: DispatchOptionsToSet = {}): DispatchToSet {
  const dispatch = useDispatchContext();

  const callbackInner = callback ?? null;

  const payloadInner = payload ?? null;

  useEffect(() => {
    if (dispatchType === StoreDispatchType.MountOrUpdate) {
      runDispatchToSet(dispatch, callbackInner, payloadInner);
    };

    return () => {
      if (dispatchType === StoreDispatchType.Unmount) {
        runDispatchToSet(dispatch, callbackInner, payloadInner);
      }
    };
  }, [dispatch, dispatchType, callbackInner, payloadInner]);

  return useRef({
    run: (response: Response) => {
      runDispatchToSet(dispatch, callbackInner, response);
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

export function createTopicTreeStoreService (): TopicTreeStoreService {
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
