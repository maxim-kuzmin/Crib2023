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

function createClearAction (sliceName: string): ClearAction {
  return {
    type: TopicItemStoreActionType.Clear,
    sliceName
  };
};

function createGetOperationRequest (
  input: TopicDomainItemGetOperationInput,
  operationCode?: string
) {
  return createTopicDomainItemGetOperationRequest(input, operationCode);
}

function createSetAction (sliceName: string, payload: SetActionPayload): SetAction {
  return {
    type: TopicItemStoreActionType.Set,
    payload,
    sliceName
  };
};

function createLoadAction (sliceName: string, payload: LoadActionPayload): LoadAction {
  return {
    type: TopicItemStoreActionType.Load,
    payload,
    sliceName
  };
};

function useDispatchContext (): Dispatch<ActionUnion> {
  return useTopicItemStoreDispatchContext();
}

function useGetOperationRequestHandler (): GetOperationRequestHandler {
  return getModule().useTopicDomainItemGetOperationRequestHandler();
}

function useState (sliceName: string): State {
  return useTopicItemStoreStateContext(sliceName);
}

// <---Store--- //

function runDispatchToClear (
  sliceName: string,
  dispatch: Dispatch<ActionUnion>,
  callback: ClearActionCallback | null
) {
  dispatch(createClearAction(sliceName));

  if (callback) {
    callback();
  }
}

function runDispatchToSet (
  sliceName: string,
  dispatch: Dispatch<ActionUnion>,
  callback: SetActionCallback | null,
  payload: SetActionPayload
) {
  dispatch(createSetAction(sliceName, payload));

  if (callback) {
    callback(payload);
  }
}

async function runDispatchToLoad (
  sliceName: string,
  requestHandler: GetOperationRequestHandler,
  dispatch: Dispatch<ActionUnion>,
  callback: SetActionCallback | null,
  shouldBeCanceled: ShouldBeCanceled,
  payload: LoadActionPayload
) {
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

  runDispatchToSet(sliceName, dispatch, callback, response);
}

function useDispatchToClear ({
  callback,
  dispatchType,
  sliceName
}: ClearActionOptions): ClearActionDispatch {
  const dispatch = useDispatchContext();

  const callbackInner = callback ?? null;

  useEffect(() => {
    if (dispatchType === StoreDispatchType.MountOrUpdate) {
      runDispatchToClear(sliceName, dispatch, callbackInner);
    };

    return () => {
      if (dispatchType === StoreDispatchType.Unmount) {
        runDispatchToClear(sliceName, dispatch, callbackInner);
      }
    };
  }, [sliceName, dispatch, dispatchType, callbackInner]);

  return useRef({
    run: () => {
      runDispatchToClear(sliceName, dispatch, callbackInner);
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

  const callbackInner = callback ?? null;

  const payloadInner = payload ?? null;

  const requestHandler = useRef(useGetOperationRequestHandler()).current;

  useEffect(() => {
    let isCanceledInner = isCanceled ?? false;

    const shouldBeCanceledInner = () => isCanceledInner;

    if (dispatchType === StoreDispatchType.MountOrUpdate && payloadInner) {
      runDispatchToLoad(sliceName, requestHandler, dispatch, callbackInner, shouldBeCanceledInner, payloadInner);
    }

    return () => {
      if (dispatchType === StoreDispatchType.Unmount && payloadInner) {
        runDispatchToLoad(sliceName, requestHandler, dispatch, callbackInner, shouldBeCanceledInner, payloadInner);
      } else {
        isCanceledInner = true;
      }
    };
  }, [sliceName, requestHandler, dispatch, dispatchType, isCanceled, callbackInner, payloadInner]);

  return useRef({
    run: async (payload: LoadActionPayload, shouldBeCanceled: ShouldBeCanceled = () => false) => {
      runDispatchToLoad(sliceName, requestHandler, dispatch, callbackInner, shouldBeCanceled, payload)
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

  const callbackInner = callback ?? null;

  const payloadInner = payload ?? null;

  useEffect(() => {
    if (dispatchType === StoreDispatchType.MountOrUpdate) {
      runDispatchToSet(sliceName, dispatch, callbackInner, payloadInner);
    };

    return () => {
      if (dispatchType === StoreDispatchType.Unmount) {
        runDispatchToSet(sliceName, dispatch, callbackInner, payloadInner);
      }
    };
  }, [sliceName, dispatch, dispatchType, callbackInner, payloadInner]);

  return useRef({
    run: (payload: SetActionPayload) => {
      runDispatchToSet(sliceName, dispatch, callbackInner, payload);
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
