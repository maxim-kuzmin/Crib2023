import { type Dispatch, useEffect, useRef } from 'react';
import { getModule } from '../../../app/ModuleImpl';
import {
  type TopicItemStoreClearActionCallback,
  type TopicItemStoreClearActionDispatch,
  type TopicItemStoreClearActionOptions,
  type TopicItemStoreHooks,
  type TopicItemStoreLoadActionDispatch,
  type TopicItemStoreLoadActionOptions,
  type TopicItemStoreLoadActionPayload,
  type TopicItemStoreSetActionCallback,
  type TopicItemStoreSetActionDispatch,
  type TopicItemStoreSetActionOptions,
  type TopicItemStoreSetActionPayload,
  type TopicItemStoreState
} from '../../../app/Stores';
import { type ShouldBeCanceled, StoreDispatchType } from '../../../common';
import {
  type TopicDomainItemGetOperationInput,
  type TopicDomainItemGetOperationRequestHandler,
  createTopicDomainItemGetOperationRequest
} from '../../../domains';
import {
  type TopicItemStoreClearAction,
  type TopicItemStoreLoadAction,
  type TopicItemStoreSetAction
} from './Actions';
import { TopicItemStoreActionType } from './TopicItemStoreActionType';
import { type TopicItemStoreActionUnion } from './TopicItemStoreActionUnion';
import {
  useTopicItemStoreDispatchContext,
  useTopicItemStoreStateContext
} from './TopicItemStoreContext';

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

type StoreState = TopicItemStoreState;

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

function useState (sliceName: string): StoreState {
  return useTopicItemStoreStateContext(sliceName);
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

export function createTopicItemStoreHooks (): TopicItemStoreHooks {
  return {
    useClearActionDispatch: useDispatchToClear,
    useLoadActionDispatch: useDispatchToLoad,
    useSetActionDispatch: useDispatchToSet,
    useStoreState: useState
  };
}
