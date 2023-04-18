import { type Dispatch, useEffect, useRef } from 'react';
import { getModule } from '../../../app/ModuleImpl';
import {
  type ArticleItemStoreClearActionCallback,
  type ArticleItemStoreClearActionDispatch,
  type ArticleItemStoreClearActionOptions,
  type ArticleItemStoreHooks,
  type ArticleItemStoreLoadActionDispatch,
  type ArticleItemStoreLoadActionOptions,
  type ArticleItemStoreLoadActionPayload,
  type ArticleItemStoreSetActionCallback,
  type ArticleItemStoreSetActionDispatch,
  type ArticleItemStoreSetActionOptions,
  type ArticleItemStoreSetActionPayload,
  type ArticleItemStoreState
} from '../../../app/Stores';
import { type ShouldBeCanceled, StoreDispatchType } from '../../../common';
import {
  type ArticleDomainItemGetOperationInput,
  type ArticleDomainItemGetOperationRequestHandler,
  createArticleDomainItemGetOperationRequest
} from '../../../domains';
import {
  type ArticleItemStoreClearAction,
  type ArticleItemStoreLoadAction,
  type ArticleItemStoreSetAction
} from './Actions';
import { ArticleItemStoreActionType } from './ArticleItemStoreActionType';
import {
  useArticleItemStoreDispatchContext,
  useArticleItemStoreStateContext
} from './ArticleItemStoreContext';
import { type ArticleItemStoreActionUnion } from './ArticleItemStoreActionUnion';

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

type StoreState = ArticleItemStoreState;

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

function useStoreState (sliceName: string): StoreState {
  return useArticleItemStoreStateContext(sliceName);
}

// <---Store--- //

interface RunClearActionOptions {
  readonly callback?: ClearActionCallback;
  readonly dispatch: Dispatch<ActionUnion>;
  readonly sliceName: string;
}

function runClearAction ({
  callback,
  dispatch,
  sliceName
}: RunClearActionOptions) {
  dispatch(createClearAction(sliceName));

  if (callback) {
    callback();
  }
}

interface RunSetActionOptions {
  readonly callback?: SetActionCallback;
  readonly dispatch: Dispatch<ActionUnion>;
  readonly payload: SetActionPayload;
  readonly sliceName: string;
}

function runSetAction ({
  callback,
  dispatch,
  payload,
  sliceName
}: RunSetActionOptions) {
  dispatch(createSetAction(sliceName, payload));

  if (callback) {
    callback(payload);
  }
}

interface RunLoadActionOptions {
  readonly callback?: SetActionCallback;
  readonly dispatch: Dispatch<ActionUnion>;
  readonly payload: LoadActionPayload;
  readonly requestHandler: GetOperationRequestHandler;
  readonly shouldBeCanceled: ShouldBeCanceled;
  readonly sliceName: string;
}

async function runLoadAction ({
  callback,
  dispatch,
  shouldBeCanceled,
  sliceName,
  payload,
  requestHandler
}: RunLoadActionOptions) {
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

  runSetAction({ sliceName, dispatch, callback, payload: response });
}

function useClearActionDispatch (
  sliceName: string,
  {
    callback,
    dispatchType
  }: ClearActionOptions
): ClearActionDispatch {
  const dispatch = useDispatchContext();

  useEffect(() => {
    if (dispatchType === StoreDispatchType.MountOrUpdate) {
      runClearAction({ sliceName, dispatch, callback });
    };

    return () => {
      if (dispatchType === StoreDispatchType.Unmount) {
        runClearAction({ sliceName, dispatch, callback });
      }
    };
  }, [sliceName, dispatch, dispatchType, callback]);

  return useRef({
    run: () => {
      runClearAction({ sliceName, dispatch, callback });
    }
  }).current;
}

function useLoadActionDispatch (
  sliceName: string,
  {
    callback,
    dispatchType,
    isCanceled,
    payload
  }: LoadActionOptions
): LoadActionDispatch {
  const dispatch = useDispatchContext();

  const requestHandler = useRef(useGetOperationRequestHandler()).current;

  useEffect(() => {
    let isCanceledInner = isCanceled ?? false;

    const shouldBeCanceledInner = () => isCanceledInner;

    if (dispatchType === StoreDispatchType.MountOrUpdate && payload) {
      runLoadAction({
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
        runLoadAction({
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
      runLoadAction({
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

function useSetActionDispatch (
  sliceName: string,
  {
    callback,
    dispatchType,
    payload
  }: SetActionOptions
): SetActionDispatch {
  const dispatch = useDispatchContext();

  const payloadInner = payload ?? null;

  useEffect(() => {
    if (dispatchType === StoreDispatchType.MountOrUpdate) {
      runSetAction({ sliceName, dispatch, callback, payload: payloadInner });
    };

    return () => {
      if (dispatchType === StoreDispatchType.Unmount) {
        runSetAction({ sliceName, dispatch, callback, payload: payloadInner });
      }
    };
  }, [sliceName, dispatch, dispatchType, callback, payloadInner]);

  return useRef({
    run: (payload: SetActionPayload) => {
      runSetAction({ sliceName, dispatch, callback, payload });
    }
  }).current;
}

export function createArticleItemStoreHooks (): ArticleItemStoreHooks {
  return {
    useClearActionDispatch,
    useLoadActionDispatch,
    useSetActionDispatch,
    useStoreState
  };
}
