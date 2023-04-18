import { type Dispatch, useEffect, useRef } from 'react';
import { getModule } from '../../../app/ModuleImpl';
import { type ArticleListStoreActionUnion } from './ArticleListStoreActionUnion';
import {
  type ArticleListStoreClearAction,
  type ArticleListStoreLoadAction,
  type ArticleListStoreSetAction
} from './Actions';
import {
  type ArticleListStoreClearActionCallback,
  type ArticleListStoreClearActionDispatch,
  type ArticleListStoreClearActionOptions,
  type ArticleListStoreHooks,
  type ArticleListStoreLoadActionDispatch,
  type ArticleListStoreLoadActionOptions,
  type ArticleListStoreLoadActionPayload,
  type ArticleListStoreSetActionCallback,
  type ArticleListStoreSetActionDispatch,
  type ArticleListStoreSetActionOptions,
  type ArticleListStoreSetActionPayload,
  type ArticleListStoreState
} from '../../../app/Stores';
import { type ShouldBeCanceled, StoreDispatchType } from '../../../common';
import {
  type ArticleDomainListGetOperationInput,
  type ArticleDomainListGetOperationRequestHandler,
  createArticleDomainListGetOperationRequest
} from '../../../domains';
import { ArticleListStoreActionType } from './ArticleListStoreActionType';
import {
  useArticleListStoreDispatchContext,
  useArticleListStoreStateContext
} from './ArticleListStoreContext';

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

function createClearAction (sliceName: string): ClearAction {
  return {
    type: ArticleListStoreActionType.Clear,
    sliceName
  };
};

function createGetOperationRequest (
  input: ArticleDomainListGetOperationInput,
  operationCode?: string
) {
  return createArticleDomainListGetOperationRequest(input, operationCode);
}

function createSetAction (sliceName: string, payload: SetActionPayload): SetAction {
  return {
    type: ArticleListStoreActionType.Set,
    payload,
    sliceName
  };
};

function createLoadAction (sliceName: string, payload: LoadActionPayload): LoadAction {
  return {
    type: ArticleListStoreActionType.Load,
    payload,
    sliceName
  };
};

function useDispatchContext (): Dispatch<ActionUnion> {
  return useArticleListStoreDispatchContext();
}

function useGetOperationRequestHandler (): GetOperationRequestHandler {
  return getModule().useArticleDomainListGetOperationRequestHandler();
}

function useState (sliceName: string): State {
  return useArticleListStoreStateContext(sliceName);
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

function useDispatchToClear (
  sliceName: string,
  {
    callback,
    dispatchType
  }: ClearActionOptions
): ClearActionDispatch {
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

function useDispatchToLoad (
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

function useDispatchToSet (
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

export function createArticleListStoreHooks (): ArticleListStoreHooks {
  return {
    useClearActionDispatch: useDispatchToClear,
    useLoadActionDispatch: useDispatchToLoad,
    useSetActionDispatch: useDispatchToSet,
    useStoreState: useState
  };
}
