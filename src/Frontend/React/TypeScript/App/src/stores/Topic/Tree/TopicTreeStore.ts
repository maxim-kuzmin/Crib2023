import { type Dispatch, useEffect, useRef } from 'react';
import {
  StoreDispatchType,
  getModule,
  type TopicDomainTreeGetOperationRequestHandler,
  createTopicDomainTreeGetOperationRequest,
  type ShouldBeCanceled,
  type TopicTreeStoreHooks,
  type TopicTreeStoreLoadActionDispatch,
  type TopicTreeStoreLoadActionOptions,
  type TopicTreeStoreSetActionPayload,
  type TopicTreeStoreLoadActionPayload,
  type TopicTreeStoreClearActionCallback,
  type TopicTreeStoreClearActionDispatch,
  type TopicTreeStoreClearActionOptions,
  type TopicTreeStoreSetActionCallback,
  type TopicTreeStoreSetActionDispatch,
  type TopicTreeStoreSetActionOptions,
  type TopicTreeStoreActionUnion,
  TopicTreeStoreActionType,
  type TopicTreeStoreClearAction,
  type TopicTreeStoreLoadAction,
  type TopicTreeStoreSetAction,
  useTopicTreeStoreDispatchContext,
  useTopicTreeStoreStateContext,
  type TopicTreeStoreState,
  type TopicDomainTreeGetOperationInput
} from '../../../all';

// ---Store---> //

type ActionUnion = TopicTreeStoreActionUnion;

type ClearAction = TopicTreeStoreClearAction;
type ClearActionCallback = TopicTreeStoreClearActionCallback;
type ClearActionDispatch = TopicTreeStoreClearActionDispatch;
type ClearActionOptions = TopicTreeStoreClearActionOptions;

type GetOperationRequestHandler = TopicDomainTreeGetOperationRequestHandler;

type LoadAction = TopicTreeStoreLoadAction;
type LoadActionDispatch = TopicTreeStoreLoadActionDispatch;
type LoadActionOptions = TopicTreeStoreLoadActionOptions;
type LoadActionPayload = TopicTreeStoreLoadActionPayload;

type SetAction = TopicTreeStoreSetAction;
type SetActionCallback = TopicTreeStoreSetActionCallback;
type SetActionDispatch = TopicTreeStoreSetActionDispatch;
type SetActionOptions = TopicTreeStoreSetActionOptions;
type SetActionPayload = TopicTreeStoreSetActionPayload;

type State = TopicTreeStoreState;

function createClearAction (sliceName: string): ClearAction {
  return {
    type: TopicTreeStoreActionType.Clear,
    sliceName
  };
};

function createGetOperationRequest (
  input: TopicDomainTreeGetOperationInput,
  operationCode?: string
) {
  return createTopicDomainTreeGetOperationRequest(input, operationCode);
}

function createSetAction (sliceName: string, payload: SetActionPayload): SetAction {
  return {
    type: TopicTreeStoreActionType.Set,
    payload,
    sliceName
  };
};

function createLoadAction (sliceName: string, payload: LoadActionPayload): LoadAction {
  return {
    type: TopicTreeStoreActionType.Load,
    payload,
    sliceName
  };
};

function useDispatchContext (): Dispatch<ActionUnion> {
  return useTopicTreeStoreDispatchContext();
}

function useGetOperationRequestHandler (): GetOperationRequestHandler {
  return getModule().useTopicDomainTreeGetOperationRequestHandler();
}

function useState (sliceName: string): State {
  return useTopicTreeStoreStateContext(sliceName);
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

export function createTopicTreeStoreHooks (): TopicTreeStoreHooks {
  return {
    useDispatchToClear,
    useDispatchToLoad,
    useDispatchToSet,
    useState
  };
}
