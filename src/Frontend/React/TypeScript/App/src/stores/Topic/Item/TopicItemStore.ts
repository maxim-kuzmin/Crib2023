import { type Dispatch, useEffect, useRef } from 'react';
import {
  StoreDispatchType,
  getModule,
  type TopicDomainItemGetOperationRequestHandler,
  createTopicDomainItemGetOperationRequest,
  type ShouldBeCanceled,
  type TopicItemStoreHooks,
  type TopicItemStoreLoadActionDispatch,
  type TopicItemStoreLoadActionOptions,
  type TopicItemStoreSetActionPayload,
  type TopicItemStoreLoadActionPayload,
  type TopicItemStoreClearActionCallback,
  type TopicItemStoreClearActionDispatch,
  type TopicItemStoreClearActionOptions,
  type TopicItemStoreSetActionCallback,
  type TopicItemStoreSetActionDispatch,
  type TopicItemStoreSetActionOptions,
  type TopicItemStoreActionUnion,
  TopicItemStoreActionType,
  type TopicItemStoreClearAction,
  type TopicItemStoreLoadAction,
  type TopicItemStoreSetAction,
  useTopicItemStoreDispatchContext,
  useTopicItemStoreStateContext,
  type TopicItemStoreState,
  type TopicDomainItemGetOperationInput
} from '../../../all';

// ---Store---> //

type ActionUnion = TopicItemStoreActionUnion;

type ClearAction = TopicItemStoreClearAction;
type ClearActionCallback = TopicItemStoreClearActionCallback;
type ClearActionDispatch = TopicItemStoreClearActionDispatch;
type ClearActionOptions = TopicItemStoreClearActionOptions;

type GetOperationRequestHandler = TopicDomainItemGetOperationRequestHandler;

type LoadAction = TopicItemStoreLoadAction;
type LoadActionDispatch = TopicItemStoreLoadActionDispatch;
type LoadActionOptions = TopicItemStoreLoadActionOptions;
type LoadActionPayload = TopicItemStoreLoadActionPayload;

type SetAction = TopicItemStoreSetAction;
type SetActionCallback = TopicItemStoreSetActionCallback;
type SetActionDispatch = TopicItemStoreSetActionDispatch;
type SetActionOptions = TopicItemStoreSetActionOptions;
type SetActionPayload = TopicItemStoreSetActionPayload;

type State = TopicItemStoreState;

function createClearAction (): ClearAction {
  return {
    type: TopicItemStoreActionType.Clear
  };
};

function createGetOperationRequest (
  input: TopicDomainItemGetOperationInput,
  operationCode?: string
) {
  return createTopicDomainItemGetOperationRequest(input, operationCode);
}

function createSetAction (payload: SetActionPayload): SetAction {
  return {
    type: TopicItemStoreActionType.Set,
    payload
  };
};

function createLoadAction (payload: LoadActionPayload): LoadAction {
  return {
    type: TopicItemStoreActionType.Load,
    payload
  };
};

function useDispatchContext (): Dispatch<ActionUnion> {
  return useTopicItemStoreDispatchContext();
}

function useGetOperationRequestHandler (): GetOperationRequestHandler {
  return getModule().useTopicDomainItemGetOperationRequestHandler();
}

function useState (): State {
  return useTopicItemStoreStateContext();
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

export function createTopicItemStoreHooks (): TopicItemStoreHooks {
  return {
    useDispatchToClear,
    useDispatchToLoad,
    useDispatchToSet,
    useState
  };
}
