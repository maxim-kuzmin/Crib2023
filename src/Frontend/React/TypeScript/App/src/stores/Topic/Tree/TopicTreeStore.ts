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

function createClearAction (): ClearAction {
  return {
    type: TopicTreeStoreActionType.Clear
  };
};

function createGetOperationRequest (
  input: TopicDomainTreeGetOperationInput,
  operationCode?: string
) {
  return createTopicDomainTreeGetOperationRequest(input, operationCode);
}

function createSetAction (payload: SetActionPayload): SetAction {
  return {
    type: TopicTreeStoreActionType.Set,
    payload
  };
};

function createLoadAction (payload: LoadActionPayload): LoadAction {
  return {
    type: TopicTreeStoreActionType.Load,
    payload
  };
};

function useDispatchContext (): Dispatch<ActionUnion> {
  return useTopicTreeStoreDispatchContext();
}

function useGetOperationRequestHandler (): GetOperationRequestHandler {
  return getModule().useTopicDomainTreeGetOperationRequestHandler();
}

function useState (): State {
  return useTopicTreeStoreStateContext();
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

export function createTopicTreeStoreHooks (): TopicTreeStoreHooks {
  return {
    useDispatchToClear,
    useDispatchToLoad,
    useDispatchToSet,
    useState
  };
}
