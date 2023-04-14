import { type Dispatch, useEffect, useRef } from 'react';
import {
  StoreDispatchType,
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
import { getModule } from '../../../app/ModuleImpl';

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

function createClearAction (sliceName: string): ClearAction {
  return {
    type: ArticleItemStoreActionType.Clear,
    sliceName
  };
};

function createGetOperationRequest (
  input: ArticleDomainItemGetOperationInput,
  operationCode?: string
) {
  return createArticleDomainItemGetOperationRequest(input, operationCode);
}

function createSetAction (sliceName: string, payload: SetActionPayload): SetAction {
  return {
    type: ArticleItemStoreActionType.Set,
    payload,
    sliceName
  };
};

function createLoadAction (sliceName: string, payload: LoadActionPayload): LoadAction {
  return {
    type: ArticleItemStoreActionType.Load,
    payload,
    sliceName
  };
};

function useDispatchContext (): Dispatch<ActionUnion> {
  return useArticleItemStoreDispatchContext();
}

function useGetOperationRequestHandler (): GetOperationRequestHandler {
  return getModule().useArticleDomainItemGetOperationRequestHandler();
}

function useState (sliceName: string): State {
  return useArticleItemStoreStateContext(sliceName);
}

// <---Store--- //

interface RunDispatchToClearOptions {
  readonly callback?: ClearActionCallback;
  readonly dispatch: Dispatch<ActionUnion>;
  readonly sliceName: string;
}

function runDispatchToClear ({
  callback,
  dispatch,
  sliceName
}: RunDispatchToClearOptions) {
  dispatch(createClearAction(sliceName));

  if (callback) {
    callback();
  }
}

interface RunDispatchToSetOptions {
  readonly callback?: SetActionCallback;
  readonly dispatch: Dispatch<ActionUnion>;
  readonly payload: SetActionPayload;
  readonly sliceName: string;
}

function runDispatchToSet ({
  callback,
  dispatch,
  payload,
  sliceName
}: RunDispatchToSetOptions) {
  dispatch(createSetAction(sliceName, payload));

  if (callback) {
    callback(payload);
  }
}

interface RunDispatchToLoadOptions {
  readonly callback?: SetActionCallback;
  readonly dispatch: Dispatch<ActionUnion>;
  readonly payload: LoadActionPayload;
  readonly requestHandler: GetOperationRequestHandler;
  readonly shouldBeCanceled: ShouldBeCanceled;
  readonly sliceName: string;
}

async function runDispatchToLoad ({
  callback,
  dispatch,
  shouldBeCanceled,
  sliceName,
  payload,
  requestHandler
}: RunDispatchToLoadOptions) {
  if (shouldBeCanceled()) {
    return;
  }

  dispatch(createLoadAction(sliceName, payload));

  const response = payload
    ? await requestHandler.handle(createGetOperationRequest(payload), shouldBeCanceled)
    : null;

  if (shouldBeCanceled()) {
    return;
  }

  runDispatchToSet({ sliceName, dispatch, callback, payload: response });
}

function useDispatchToClear ({
  callback,
  dispatchType,
  sliceName
}: ClearActionOptions): ClearActionDispatch {
  const dispatch = useDispatchContext();

  useEffect(() => {
    if (dispatchType === StoreDispatchType.MountOrUpdate) {
      runDispatchToClear({ sliceName, dispatch, callback });
    };

    return () => {
      if (dispatchType === StoreDispatchType.Unmount) {
        runDispatchToClear({ sliceName, dispatch, callback });
      }
    };
  }, [sliceName, dispatch, dispatchType, callback]);

  return useRef({
    run: () => {
      runDispatchToClear({ sliceName, dispatch, callback });
    }
  }).current;
}

function useDispatchToLoad ({
  callback,
  dispatchType,
  isCanceled,
  payload,
  sliceName
}: LoadActionOptions): LoadActionDispatch {
  const dispatch = useDispatchContext();

  const requestHandler = useRef(useGetOperationRequestHandler()).current;

  useEffect(() => {
    let isCanceledInner = isCanceled ?? false;

    const shouldBeCanceledInner = () => isCanceledInner;

    if (dispatchType === StoreDispatchType.MountOrUpdate && payload) {
      runDispatchToLoad({
        sliceName,
        requestHandler,
        dispatch,
        callback,
        shouldBeCanceled: shouldBeCanceledInner,
        payload
      });
    }

    return () => {
      if (dispatchType === StoreDispatchType.Unmount && payload) {
        runDispatchToLoad({
          sliceName,
          requestHandler,
          dispatch,
          callback,
          shouldBeCanceled: shouldBeCanceledInner,
          payload
        });
      } else {
        isCanceledInner = true;
      }
    };
  }, [sliceName, requestHandler, dispatch, dispatchType, isCanceled, callback, payload]);

  return useRef({
    run: async (payload: LoadActionPayload, shouldBeCanceled: ShouldBeCanceled = () => false) => {
      runDispatchToLoad({
        sliceName,
        requestHandler,
        dispatch,
        callback,
        shouldBeCanceled,
        payload
      });
    }
  }).current;
}

function useDispatchToSet ({
  callback,
  dispatchType,
  payload,
  sliceName
}: SetActionOptions): SetActionDispatch {
  const dispatch = useDispatchContext();

  const payloadInner = payload ?? null;

  useEffect(() => {
    if (dispatchType === StoreDispatchType.MountOrUpdate) {
      runDispatchToSet({ sliceName, dispatch, callback, payload: payloadInner });
    };

    return () => {
      if (dispatchType === StoreDispatchType.Unmount) {
        runDispatchToSet({ sliceName, dispatch, callback, payload: payloadInner });
      }
    };
  }, [sliceName, dispatch, dispatchType, callback, payloadInner]);

  return useRef({
    run: (payload: SetActionPayload) => {
      runDispatchToSet({ sliceName, dispatch, callback, payload });
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
