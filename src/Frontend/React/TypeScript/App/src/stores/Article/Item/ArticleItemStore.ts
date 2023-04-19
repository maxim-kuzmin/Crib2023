import { type Dispatch, useEffect, useRef } from 'react';
import { getModule } from '../../../app/ModuleImpl';
import {
  type ArticleItemStoreDeleteActionDispatch,
  type ArticleItemStoreDeleteActionOptions,
  type ArticleItemStoreDeleteActionPayload,
  type ArticleItemStoreDeleteCompletedActionCallback,
  type ArticleItemStoreDeleteCompletedActionDispatch,
  type ArticleItemStoreDeleteCompletedActionOptions,
  type ArticleItemStoreDeleteCompletedActionPayload,
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
  type ArticleItemStoreState,
  type ArticleItemStoreSaveActionDispatch,
  type ArticleItemStoreSaveActionOptions,
  type ArticleItemStoreSaveActionPayload
} from '../../../app/Stores';
import { type ShouldBeCanceled, StoreDispatchType } from '../../../common';
import {
  type ArticleDomainItemGetOperationInput,
  type ArticleDomainItemGetOperationRequestHandler,
  createArticleDomainItemGetOperationRequest,
  type ArticleDomainItemDeleteOperationRequestHandler,
  createArticleDomainItemDeleteOperationRequest,
  type ArticleDomainItemSaveOperationRequestHandler,
  createArticleDomainItemSaveOperationRequest
} from '../../../domains';
import {
  type ArticleItemStoreDeleteAction,
  type ArticleItemStoreDeleteCompletedAction,
  type ArticleItemStoreClearAction,
  type ArticleItemStoreLoadAction,
  type ArticleItemStoreSaveAction,
  type ArticleItemStoreSetAction
} from './Actions';
import { ArticleItemStoreActionType } from './ArticleItemStoreActionType';
import {
  useArticleItemStoreDispatchContext,
  useArticleItemStoreStateContext
} from './ArticleItemStoreContext';
import { type ArticleItemStoreActionUnion } from './ArticleItemStoreActionUnion';
import { type ArticleTypeEntity } from '../../../data';

// ---Store---> //

type ActionUnion = ArticleItemStoreActionUnion;

type ClearAction = ArticleItemStoreClearAction;
type ClearActionCallback = ArticleItemStoreClearActionCallback;
type ClearActionDispatch = ArticleItemStoreClearActionDispatch;
type ClearActionOptions = ArticleItemStoreClearActionOptions;

type DeleteAction = ArticleItemStoreDeleteAction;
type DeleteActionDispatch = ArticleItemStoreDeleteActionDispatch;
type DeleteActionOptions = ArticleItemStoreDeleteActionOptions;
type DeleteActionPayload = ArticleItemStoreDeleteActionPayload;

type DeleteCompletedAction = ArticleItemStoreDeleteCompletedAction;
type DeleteCompletedActionCallback = ArticleItemStoreDeleteCompletedActionCallback;
type DeleteCompletedActionDispatch = ArticleItemStoreDeleteCompletedActionDispatch;
type DeleteCompletedActionOptions = ArticleItemStoreDeleteCompletedActionOptions;
type DeleteCompletedActionPayload = ArticleItemStoreDeleteCompletedActionPayload;

type DeleteOperationRequestHandler = ArticleDomainItemDeleteOperationRequestHandler;

type GetOperationRequestHandler = ArticleDomainItemGetOperationRequestHandler;

type LoadAction = ArticleItemStoreLoadAction;
type LoadActionDispatch = ArticleItemStoreLoadActionDispatch;
type LoadActionOptions = ArticleItemStoreLoadActionOptions;
type LoadActionPayload = ArticleItemStoreLoadActionPayload;

type SaveAction = ArticleItemStoreSaveAction;
type SaveActionDispatch = ArticleItemStoreSaveActionDispatch;
type SaveActionOptions = ArticleItemStoreSaveActionOptions;
type SaveActionPayload = ArticleItemStoreSaveActionPayload;

type SaveOperationRequestHandler = ArticleDomainItemSaveOperationRequestHandler;

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

function createDeleteAction (sliceName: string, payload: DeleteActionPayload): DeleteAction {
  return {
    type: ArticleItemStoreActionType.Delete,
    payload,
    sliceName
  };
};

function createDeleteCompletedAction (
  sliceName: string,
  payload: DeleteCompletedActionPayload
): DeleteCompletedAction {
  return {
    type: ArticleItemStoreActionType.DeleteCompleted,
    payload,
    sliceName
  };
};

function createDeleteOperationRequest (
  input: ArticleDomainItemGetOperationInput,
  operationCode?: string
) {
  return createArticleDomainItemDeleteOperationRequest(input, operationCode);
}

function createGetOperationRequest (
  input: ArticleDomainItemGetOperationInput,
  operationCode?: string
) {
  return createArticleDomainItemGetOperationRequest(input, operationCode);
}

function createLoadAction (sliceName: string, payload: LoadActionPayload): LoadAction {
  return {
    type: ArticleItemStoreActionType.Load,
    payload,
    sliceName
  };
};

function createSaveAction (sliceName: string, payload: SaveActionPayload): SaveAction {
  return {
    type: ArticleItemStoreActionType.Save,
    payload,
    sliceName
  };
};

function createSaveOperationRequest (
  input: ArticleTypeEntity,
  operationCode?: string
) {
  return createArticleDomainItemSaveOperationRequest(input, operationCode);
}

function createSetAction (sliceName: string, payload: SetActionPayload): SetAction {
  return {
    type: ArticleItemStoreActionType.Set,
    payload,
    sliceName
  };
};

function useDispatchContext (): Dispatch<ActionUnion> {
  return useArticleItemStoreDispatchContext();
}

function useDeleteOperationRequestHandler (): DeleteOperationRequestHandler {
  return getModule().useArticleDomainItemDeleteOperationRequestHandler();
}

function useGetOperationRequestHandler (): GetOperationRequestHandler {
  return getModule().useArticleDomainItemGetOperationRequestHandler();
}

function useSaveOperationRequestHandler (): SaveOperationRequestHandler {
  return getModule().useArticleDomainItemSaveOperationRequestHandler();
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

interface RunDeleteCompletedActionOptions {
  readonly callback?: DeleteCompletedActionCallback;
  readonly dispatch: Dispatch<ActionUnion>;
  readonly payload: DeleteCompletedActionPayload;
  readonly sliceName: string;
}

function runDeleteCompletedAction ({
  callback,
  dispatch,
  payload,
  sliceName
}: RunDeleteCompletedActionOptions) {
  dispatch(createDeleteCompletedAction(sliceName, payload));

  if (callback) {
    callback(payload);
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

interface RunDeleteActionOptions {
  readonly callback?: DeleteCompletedActionCallback;
  readonly dispatch: Dispatch<ActionUnion>;
  readonly payload: DeleteActionPayload;
  readonly requestHandler: DeleteOperationRequestHandler;
  readonly shouldBeCanceled: ShouldBeCanceled;
  readonly sliceName: string;
}

async function runDeleteAction ({
  callback,
  dispatch,
  shouldBeCanceled,
  sliceName,
  payload,
  requestHandler
}: RunDeleteActionOptions) {
  if (shouldBeCanceled()) {
    return;
  }

  dispatch(createDeleteAction(sliceName, payload));

  const response = payload
    ? await requestHandler.handle(createDeleteOperationRequest(payload), shouldBeCanceled)
    : null;

  if (shouldBeCanceled()) {
    return;
  }

  runDeleteCompletedAction({ sliceName, dispatch, callback, payload: response });
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

interface RunSaveActionOptions {
  readonly callback?: SetActionCallback;
  readonly dispatch: Dispatch<ActionUnion>;
  readonly payload: SaveActionPayload;
  readonly requestHandler: SaveOperationRequestHandler;
  readonly shouldBeCanceled: ShouldBeCanceled;
  readonly sliceName: string;
}

async function runSaveAction ({
  callback,
  dispatch,
  shouldBeCanceled,
  sliceName,
  payload,
  requestHandler
}: RunSaveActionOptions) {
  if (shouldBeCanceled()) {
    return;
  }

  dispatch(createSaveAction(sliceName, payload));

  const response = payload
    ? await requestHandler.handle(createSaveOperationRequest(payload), shouldBeCanceled)
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

function useDeleteActionDispatch (
  sliceName: string,
  {
    callback,
    dispatchType,
    isCanceled,
    payload
  }: DeleteActionOptions
): DeleteActionDispatch {
  const dispatch = useDispatchContext();

  const requestHandler = useRef(useDeleteOperationRequestHandler()).current;

  useEffect(() => {
    let isCanceledInner = isCanceled ?? false;

    const shouldBeCanceledInner = () => isCanceledInner;

    if (dispatchType === StoreDispatchType.MountOrUpdate && payload) {
      runDeleteAction({
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
        runDeleteAction({
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
    run: async (payload: DeleteActionPayload, shouldBeCanceled: ShouldBeCanceled = () => false) => {
      runDeleteAction({
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

function useDeleteCompletedActionDispatch (
  sliceName: string,
  {
    callback,
    dispatchType,
    payload
  }: DeleteCompletedActionOptions
): DeleteCompletedActionDispatch {
  const dispatch = useDispatchContext();

  const payloadInner = payload ?? null;

  useEffect(() => {
    if (dispatchType === StoreDispatchType.MountOrUpdate) {
      runDeleteCompletedAction({ sliceName, dispatch, callback, payload: payloadInner });
    };

    return () => {
      if (dispatchType === StoreDispatchType.Unmount) {
        runDeleteCompletedAction({ sliceName, dispatch, callback, payload: payloadInner });
      }
    };
  }, [sliceName, dispatch, dispatchType, callback, payloadInner]);

  return useRef({
    run: (payload: SetActionPayload) => {
      runDeleteCompletedAction({ sliceName, dispatch, callback, payload });
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

function useSaveActionDispatch (
  sliceName: string,
  {
    callback,
    dispatchType,
    isCanceled,
    payload
  }: SaveActionOptions
): SaveActionDispatch {
  const dispatch = useDispatchContext();

  const requestHandler = useRef(useSaveOperationRequestHandler()).current;

  useEffect(() => {
    let isCanceledInner = isCanceled ?? false;

    const shouldBeCanceledInner = () => isCanceledInner;

    if (dispatchType === StoreDispatchType.MountOrUpdate && payload) {
      runSaveAction({
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
        runSaveAction({
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
    run: async (payload: SaveActionPayload, shouldBeCanceled: ShouldBeCanceled = () => false) => {
      runSaveAction({
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
    useDeleteActionDispatch,
    useDeleteCompletedActionDispatch,
    useLoadActionDispatch,
    useSaveActionDispatch,
    useSetActionDispatch,
    useStoreState
  };
}
