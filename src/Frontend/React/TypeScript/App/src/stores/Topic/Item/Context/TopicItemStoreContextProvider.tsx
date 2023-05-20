import React, { type PropsWithChildren, memo, useReducer } from 'react';
import { OperationStatus, createStoreStateMap } from '../../../../common';
import {
  TopicItemStoreSliceName,
  type TopicItemStoreState,
  type TopicItemStoreStateMap,
  createTopicItemStoreState,
} from '../../../../features';
import { TopicItemStoreActionType } from '../TopicItemStoreActionType';
import { type TopicItemStoreActionUnion } from '../TopicItemStoreActionUnion';
import {
  TopicItemStoreDispatchContext,
  TopicItemStoreStateContext
} from './TopicItemStoreContextDefinition';

type StateMap = TopicItemStoreStateMap;

const initialState: StateMap = createStoreStateMap({
  functionToCreateState: () => createTopicItemStoreState(),
  sliceNames: [TopicItemStoreSliceName.Default],
});

function reducer (stateMap: StateMap, action: TopicItemStoreActionUnion): StateMap {
  const result: StateMap = createStoreStateMap({ stateMap });
  const { sliceName, type } = action;

  let state: TopicItemStoreState = result[sliceName];

  switch (type) {
    case TopicItemStoreActionType.Clear:
      state = initialState[sliceName];
      break;
    case TopicItemStoreActionType.Delete:
      state = {
        ...state,
        payloadOfDeleteAction: action.payload,
        statusOfDeleteAction: OperationStatus.Pending
      };
      break;
    case TopicItemStoreActionType.DeleteCompleted:
      state = {
        ...state,
        payloadOfDeleteCompletedAction: action.payload,
        statusOfDeleteAction: OperationStatus.Fulfilled,
        payloadOfSetAction: action.payload?.error ? state.payloadOfSetAction : null
      };
      break;
    case TopicItemStoreActionType.Load:
      state = {
        ...state,
        payloadOfLoadAction: action.payload,
        statusOfLoadAction: OperationStatus.Pending
      };
      break;
    case TopicItemStoreActionType.LoadCompleted:
      state = {
        ...state,
        payloadOfLoadCompletedAction: action.payload,
        statusOfLoadAction: OperationStatus.Fulfilled,
        payloadOfSetAction: action.payload?.error ? state.payloadOfSetAction : action.payload
      };
      break;
    case TopicItemStoreActionType.Save:
      state = {
        ...state,
        payloadOfSaveAction: action.payload,
        statusOfSaveAction: OperationStatus.Pending
      };
      break;
    case TopicItemStoreActionType.SaveCompleted:
      state = {
        ...state,
        payloadOfSaveCompletedAction: action.payload,
        statusOfSaveAction: OperationStatus.Fulfilled,
        payloadOfSetAction: action.payload?.error ? state.payloadOfSetAction : action.payload
      };
      break;
    case TopicItemStoreActionType.Set:
      state = {
        ...state,
        payloadOfSetAction: action.payload
      };
      break;
  }

  result[sliceName] = state;

  return result;
}

export const TopicItemStoreContextProvider: React.FC<PropsWithChildren> = memo(
function TopicItemStoreContextProvider ({
  children
}: PropsWithChildren): React.ReactElement<PropsWithChildren> | null {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <TopicItemStoreStateContext.Provider value={state}>
      <TopicItemStoreDispatchContext.Provider value={dispatch}>
        {children}
      </TopicItemStoreDispatchContext.Provider>
    </TopicItemStoreStateContext.Provider>
  );
});
