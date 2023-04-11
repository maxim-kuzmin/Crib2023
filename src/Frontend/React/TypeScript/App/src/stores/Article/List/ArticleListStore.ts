import { type Dispatch, useEffect, useRef } from 'react';
import {
  StoreDispatchType,
  getModule,
  type ArticleDomainListGetOperationRequestHandler,
  createArticleDomainListGetOperationRequest,
  type ShouldBeCanceled,
  type ArticleListStoreHooks,
  type ArticleListStoreLoadActionDispatch,
  type ArticleListStoreLoadActionOptions,
  type ArticleListStoreSetActionPayload,
  type ArticleListStoreLoadActionPayload,
  type ArticleListStoreClearActionCallback,
  type ArticleListStoreClearActionDispatch,
  type ArticleListStoreClearActionOptions,
  type ArticleListStoreSetActionCallback,
  type ArticleListStoreSetActionDispatch,
  type ArticleListStoreSetActionOptions,
  type ArticleListStoreActionUnion,
  ArticleListStoreActionType,
  type ArticleListStoreClearAction,
  type ArticleListStoreLoadAction,
  type ArticleListStoreSetAction,
  useArticleListStoreDispatchContext,
  useArticleListStoreStateContext,
  type ArticleListStoreState,
  type ArticleDomainListGetOperationInput
} from '../../../all';

// ---Store---> //

type ActionUnion = ArticleListStoreActionUnion;

type ClearAction = ArticleListStoreClearAction;
type ClearActionCallback = ArticleListStoreClearActionCallback;
type ClearActionDispatch = ArticleListStoreClearActionDispatch;
type ClearActionOptions = ArticleListStoreClearActionOptions;

type GetOperationRequestHandler = ArticleDomainListGetOperationRequestHandler;

type LoadAction = ArticleListStoreLoadAction;
type LoadActionDispatch = ArticleListStoreLoadActionDispatch;
type LoadActionOptions = ArticleListStoreLoadActionOptions;
type LoadActionPayload = ArticleListStoreLoadActionPayload;

type SetAction = ArticleListStoreSetAction;
type SetActionCallback = ArticleListStoreSetActionCallback;
type SetActionDispatch = ArticleListStoreSetActionDispatch;
type SetActionOptions = ArticleListStoreSetActionOptions;
type SetActionPayload = ArticleListStoreSetActionPayload;

type State = ArticleListStoreState;

function createClearAction (): ClearAction {
  return {
    type: ArticleListStoreActionType.Clear
  };
};

function createGetOperationRequest (
  input: ArticleDomainListGetOperationInput,
  operationCode?: string
) {
  return createArticleDomainListGetOperationRequest(input, operationCode);
}

function createSetAction (payload: SetActionPayload): SetAction {
  return {
    type: ArticleListStoreActionType.Set,
    payload
  };
};

function createLoadAction (payload: LoadActionPayload): LoadAction {
  return {
    type: ArticleListStoreActionType.Load,
    payload
  };
};

function useDispatchContext (): Dispatch<ActionUnion> {
  return useArticleListStoreDispatchContext();
}

function useGetOperationRequestHandler (): GetOperationRequestHandler {
  return getModule().useArticleDomainListGetOperationRequestHandler();
}

function useState (): State {
  return useArticleListStoreStateContext();
}

// <---Store--- //

function runDispatchToClear (
  dispatch: Dispatch<ActionUnion>,
  callback: ClearActionCallback | null
) {
  dispatch(createClearAction());

  if (callback) {
    callback();
  }
}

function runDispatchToSet (
  dispatch: Dispatch<ActionUnion>,
  callback: SetActionCallback | null,
  response: SetActionPayload
) {
  dispatch(createSetAction(response));

  if (callback) {
    callback(response);
  }
}

async function runDispatchToLoad (
  requestHandler: GetOperationRequestHandler,
  dispatch: Dispatch<ActionUnion>,
  callback: SetActionCallback | null,
  shouldBeCanceled: ShouldBeCanceled,
  input: LoadActionPayload
) {
  if (shouldBeCanceled()) {
    return;
  }

  dispatch(createLoadAction(input));

  const response = input
    ? await requestHandler.handle(createGetOperationRequest(input), shouldBeCanceled)
    : null;

  if (shouldBeCanceled()) {
    return;
  }

  runDispatchToSet(dispatch, callback, response);
}

function useDispatchToClear ({
  dispatchType,
  callback
}: ClearActionOptions = {}): ClearActionDispatch {
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

function useDispatchToLoad (options?: LoadActionOptions): LoadActionDispatch {
  const dispatch = useDispatchContext();

  const callbackInner = options?.callback ?? null;

  const inputAtDispatchInner = options?.inputAtDispatch ?? null;

  const requestHandler = useRef(useGetOperationRequestHandler()).current;

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
    run: async (input: LoadActionPayload, shouldBeCanceled: ShouldBeCanceled = () => false) => {
      runDispatchToLoad(requestHandler, dispatch, callbackInner, shouldBeCanceled, input)
    }
  }).current;
}

function useDispatchToSet ({
  dispatchType,
  callback,
  responseAtDispatch
}: SetActionOptions = {}): SetActionDispatch {
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
    run: (response: SetActionPayload) => {
      runDispatchToSet(dispatch, callbackInner, response);
    }
  }).current;
}

export function createArticleListStoreHooks (): ArticleListStoreHooks {
  return {
    useDispatchToClear,
    useDispatchToLoad,
    useDispatchToSet,
    useState
  };
}
