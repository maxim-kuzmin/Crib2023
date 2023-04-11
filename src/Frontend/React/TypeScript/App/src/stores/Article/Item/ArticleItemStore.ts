import { useContext, createContext, type Dispatch, useEffect, useRef, type Context } from 'react';
import {
  createOperationState,
  StoreDispatchType,
  OperationStatus,
  getModule,
  type ArticleDomainItemGetOperationRequestHandler,
  createArticleDomainItemGetOperationRequest,
  type ShouldBeCanceled,
  type ArticleItemStoreHooks,
  type ArticleItemStoreOptionsToLoad,
  type ArticleItemStoreDispatchToLoad,
  type ArticleItemStoreContentForResponse,
  type ArticleItemStoreContentForInput,
  type ArticleItemStoreState,
  type ArticleItemStoreCallbackToClear,
  type ArticleItemStoreOptionsToClear,
  type ArticleItemStoreCallbackToSet,
  type ArticleItemStoreOptionsToSet,
  type ArticleItemStoreDispatchToSet,
  type ArticleItemStoreDispatchToClear
} from '../../../all';

type CallbackToClear = ArticleItemStoreCallbackToClear;
type CallbackToSet = ArticleItemStoreCallbackToSet;
type DispatchOptionsToClear = ArticleItemStoreOptionsToClear;
type DispatchOptionsToLoad = ArticleItemStoreOptionsToLoad;
type DispatchOptionsToSet = ArticleItemStoreOptionsToSet;
type DispatchToClear = ArticleItemStoreDispatchToClear;
type DispatchToLoad = ArticleItemStoreDispatchToLoad;
type DispatchToSet = ArticleItemStoreDispatchToSet;
type Input = ArticleItemStoreContentForInput;
type Response = ArticleItemStoreContentForResponse;
type State = ArticleItemStoreState;

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
  requestHandler: ArticleDomainItemGetOperationRequestHandler,
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
        createArticleDomainItemGetOperationRequest(input),
        shouldBeCanceled
      )
    : null;

  if (shouldBeCanceled()) {
    return;
  }

  runDispatchToSet(dispatch, callback, response);
}

function useDispatchToLoad (options?: DispatchOptionsToLoad): DispatchToLoad {
  const dispatch = useDispatchContext();

  const callbackInner = options?.callback ?? null;

  const inputAtDispatchInner = options?.inputAtDispatch ?? null;

  const requestHandler = useRef(getModule().useArticleDomainItemGetOperationRequestHandler()).current;

  useEffect(() => {
    let isCanceled = options?.isCanceled ?? false;

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
  }, [
    requestHandler,
    dispatch,
    options?.dispatchType,
    options?.isCanceled,
    callbackInner,
    inputAtDispatchInner
  ]);

  return useRef({
    run: async (input: Input, shouldBeCanceled: ShouldBeCanceled = () => false) => {
      runDispatchToLoad(requestHandler, dispatch, callbackInner, shouldBeCanceled, input)
    }
  }).current;
}

function useDispatchToSet ({
  dispatchType,
  callback,
  responseAtDispatch
}: DispatchOptionsToSet = {}): DispatchToSet {
  const dispatch = useDispatchContext();

  const callbackInner = callback ?? null;

  const responseAtDispatchInner = responseAtDispatch ?? null;

  useEffect(() => {
    if (dispatchType === StoreDispatchType.MountOrUpdate) {
      runDispatchToSet(dispatch, callbackInner, responseAtDispatchInner);
    };

    return () => {
      if (dispatchType === StoreDispatchType.Unmount) {
        runDispatchToSet(dispatch, callbackInner, responseAtDispatchInner);
      }
    };
  }, [dispatch, dispatchType, callbackInner, responseAtDispatchInner]);

  return useRef({
    run: (response: Response) => {
      runDispatchToSet(dispatch, callbackInner, response);
    }
  }).current;
}

export interface ArticleItemStoreService {
  readonly DispatchContext: Context<Dispatch<Action> | null>;
  readonly StateContext: Context<State | null>;
  readonly initialState: State;
  readonly reducer: (state: State, action: Action) => State;
}

export function createArticleItemStoreService (): ArticleItemStoreService {
  return {
    DispatchContext,
    StateContext,
    initialState,
    reducer
  };
}

export function createArticleItemStoreHooks (): ArticleItemStoreHooks {
  return {
    useDispatchToClear,
    useDispatchToLoad,
    useDispatchToSet,
    useState: useStateContext,
  };
}
