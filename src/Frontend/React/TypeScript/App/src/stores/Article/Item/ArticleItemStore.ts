import { type Dispatch, useEffect, useRef } from 'react';
import {
  StoreDispatchType,
  getModule,
  type ArticleDomainItemGetOperationRequestHandler,
  createArticleDomainItemGetOperationRequest,
  type ShouldBeCanceled,
  type ArticleItemStoreHooks,
  type ArticleItemStoreLoadActionDispatch,
  type ArticleItemStoreLoadActionOptions,
  type ArticleItemStoreSetActionPayload,
  type ArticleItemStoreLoadActionPayload,
  type ArticleItemStoreClearActionCallback,
  type ArticleItemStoreClearActionDispatch,
  type ArticleItemStoreClearActionOptions,
  type ArticleItemStoreSetActionCallback,
  type ArticleItemStoreSetActionDispatch,
  type ArticleItemStoreSetActionOptions,
  type ArticleItemStoreActionUnion,
  ArticleItemStoreActionType,
  type ArticleItemStoreClearAction,
  type ArticleItemStoreLoadAction,
  type ArticleItemStoreSetAction,
  useArticleItemStoreDispatchContext,
  useArticleItemStoreStateContext,
  type ArticleItemStoreState,
  type ArticleDomainItemGetOperationInput
} from '../../../all';

// ---Store---> //

type ActionUnion = ArticleItemStoreActionUnion;

type ClearAction = ArticleItemStoreClearAction;
type ClearActionCallback = ArticleItemStoreClearActionCallback;
type ClearActionDispatch = ArticleItemStoreClearActionDispatch;
type ClearActionOptions = ArticleItemStoreClearActionOptions;

type GetOperationRequestHandler = ArticleDomainItemGetOperationRequestHandler;

type LoadAction = ArticleItemStoreLoadAction;
type LoadActionDispatch = ArticleItemStoreLoadActionDispatch;
type LoadActionOptions = ArticleItemStoreLoadActionOptions;
type LoadActionPayload = ArticleItemStoreLoadActionPayload;

type SetAction = ArticleItemStoreSetAction;
type SetActionCallback = ArticleItemStoreSetActionCallback;
type SetActionDispatch = ArticleItemStoreSetActionDispatch;
type SetActionOptions = ArticleItemStoreSetActionOptions;
type SetActionPayload = ArticleItemStoreSetActionPayload;

type State = ArticleItemStoreState;

function createClearAction (): ClearAction {
  return {
    type: ArticleItemStoreActionType.Clear
  };
};

function createGetOperationRequest (
  input: ArticleDomainItemGetOperationInput,
  operationCode?: string
) {
  return createArticleDomainItemGetOperationRequest(input, operationCode);
}

function createSetAction (payload: SetActionPayload): SetAction {
  return {
    type: ArticleItemStoreActionType.Set,
    payload
  };
};

function createLoadAction (payload: LoadActionPayload): LoadAction {
  return {
    type: ArticleItemStoreActionType.Load,
    payload
  };
};

function useDispatchContext (): Dispatch<ActionUnion> {
  return useArticleItemStoreDispatchContext();
}

function useGetOperationRequestHandler (): GetOperationRequestHandler {
  return getModule().useArticleDomainItemGetOperationRequestHandler();
}

function useState (): State {
  return useArticleItemStoreStateContext();
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
  payload: SetActionPayload
) {
  dispatch(createSetAction(payload));

  if (callback) {
    callback(payload);
  }
}

async function runDispatchToLoad (
  requestHandler: GetOperationRequestHandler,
  dispatch: Dispatch<ActionUnion>,
  callback: SetActionCallback | null,
  shouldBeCanceled: ShouldBeCanceled,
  payload: LoadActionPayload
) {
  if (shouldBeCanceled()) {
    return;
  }

  dispatch(createLoadAction(payload));

  const response = payload
    ? await requestHandler.handle(createGetOperationRequest(payload), shouldBeCanceled)
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

  const payloadInner = options?.payload ?? null;

  const requestHandler = useRef(useGetOperationRequestHandler()).current;

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
    run: async (payload: LoadActionPayload, shouldBeCanceled: ShouldBeCanceled = () => false) => {
      runDispatchToLoad(requestHandler, dispatch, callbackInner, shouldBeCanceled, payload)
    }
  }).current;
}

function useDispatchToSet ({
  dispatchType,
  callback,
  payload
}: SetActionOptions = {}): SetActionDispatch {
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
    run: (payload: SetActionPayload) => {
      runDispatchToSet(dispatch, callbackInner, payload);
    }
  }).current;
}

export function createArticleItemStoreHooks (): ArticleItemStoreHooks {
  return {
    useDispatchToClear,
    useDispatchToLoad,
    useDispatchToSet,
    useState
  };
}
