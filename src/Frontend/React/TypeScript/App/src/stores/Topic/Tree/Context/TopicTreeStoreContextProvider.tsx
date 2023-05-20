import React, { type PropsWithChildren, memo, useReducer } from 'react';
import { OperationStatus, createStoreStateMap } from '../../../../common';
import {
  TopicTreeStoreSliceName,
  type TopicTreeStoreStateMap,
  createTopicTreeStoreState
} from '../../../../features';
import { TopicTreeStoreActionType } from '../TopicTreeStoreActionType';
import { type TopicTreeStoreActionUnion } from '../TopicTreeStoreActionUnion';
import {
  TopicTreeStoreDispatchContext,
  TopicTreeStoreStateContext
} from './TopicTreeStoreContextDefinition';

type StateMap = TopicTreeStoreStateMap;

const initialState: StateMap = createStoreStateMap({
  functionToCreateState: () => createTopicTreeStoreState(),
  sliceNames: [TopicTreeStoreSliceName.Default],
});

function reducer (stateMap: StateMap, action: TopicTreeStoreActionUnion): StateMap {
  const result: StateMap = createStoreStateMap({ stateMap });
  const { sliceName, type } = action;

  let state = result[sliceName];

  switch (type) {
    case TopicTreeStoreActionType.Clear:
      state = initialState[sliceName];
      break;
    case TopicTreeStoreActionType.Load:
      state = {
        ...state,
        payloadOfLoadAction: action.payload,
        statusOfLoadAction: OperationStatus.Pending
      };
      break;
    case TopicTreeStoreActionType.LoadCompleted:
      state = {
        ...state,
        payloadOfLoadCompletedAction: action.payload,
        statusOfLoadAction: OperationStatus.Fulfilled,
        payloadOfSetAction: action.payload?.error ? state.payloadOfSetAction : action.payload
      };
      break;
    case TopicTreeStoreActionType.Set:
      state = {
        ...state,
        payloadOfSetAction: action.payload
      };
      break;
  }

  result[sliceName] = state;

  return result;
}

export const TopicTreeStoreContextProvider: React.FC<PropsWithChildren> = memo(
function TopicTreeStoreContextProvider ({
  children
}: PropsWithChildren): React.ReactElement<PropsWithChildren> | null {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <TopicTreeStoreStateContext.Provider value={state}>
      <TopicTreeStoreDispatchContext.Provider value={dispatch}>
        {children}
      </TopicTreeStoreDispatchContext.Provider>
    </TopicTreeStoreStateContext.Provider>
  );
});
