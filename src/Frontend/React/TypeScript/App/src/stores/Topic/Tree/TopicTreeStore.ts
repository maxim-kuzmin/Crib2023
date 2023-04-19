import { type Dispatch, useEffect, useRef } from 'react';
import { getModule } from '../../../app/ModuleImpl';
import {
  type TopicTreeStoreClearActionCallback,
  type TopicTreeStoreClearActionDispatch,
  type TopicTreeStoreClearActionOptions,
  type TopicTreeStoreHooks,
  type TopicTreeStoreLoadActionDispatch,
  type TopicTreeStoreLoadActionOptions,
  type TopicTreeStoreLoadActionPayload,
  type TopicTreeStoreSetActionCallback,
  type TopicTreeStoreSetActionDispatch,
  type TopicTreeStoreSetActionOptions,
  type TopicTreeStoreSetActionPayload,
  type TopicTreeStoreState
} from '../../../app/Stores';
import { type ShouldBeCanceled, StoreDispatchType } from '../../../common';
import {
  type TopicDomainTreeGetOperationInput,
  type TopicDomainTreeGetOperationRequestHandler,
  createTopicDomainTreeGetOperationRequest
} from '../../../domains';
import {
  type TopicTreeStoreClearAction,
  type TopicTreeStoreLoadAction,
  type TopicTreeStoreSetAction
} from './Actions';
import { TopicTreeStoreActionType } from './TopicTreeStoreActionType';
import { type TopicTreeStoreActionUnion } from './TopicTreeStoreActionUnion';
import {
  useTopicTreeStoreDispatchContext,
  useTopicTreeStoreStateContext
} from './TopicTreeStoreContext';

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

type StoreState = TopicTreeStoreState;

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

function useState (sliceName: string): StoreState {
  return useTopicTreeStoreStateContext(sliceName);
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

export function createTopicTreeStoreHooks (): TopicTreeStoreHooks {
  return {
    useClearActionDispatch: useDispatchToClear,
    useLoadActionDispatch: useDispatchToLoad,
    useSetActionDispatch: useDispatchToSet,
    useStoreState: useState
  };
}
