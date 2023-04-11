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

export function createArticleListStoreHooks (): ArticleListStoreHooks {
  return {
    useDispatchToClear,
    useDispatchToLoad,
    useDispatchToSet,
    useState
  };
}
