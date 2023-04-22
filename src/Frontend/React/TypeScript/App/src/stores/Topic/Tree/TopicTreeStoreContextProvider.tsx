import React, {
  type PropsWithChildren,
  memo,
  useReducer,
} from 'react';
import { getModule } from '../../../app';
import { TopicTreeStoreSliceName, type TopicTreeStoreState } from '../../../app/Stores';
import { OperationStatus } from '../../../common';
import { TopicTreeStoreActionType } from './TopicTreeStoreActionType';
import { type TopicTreeStoreActionUnion } from './TopicTreeStoreActionUnion';
import {
  TopicTreeStoreDispatchContext,
  TopicTreeStoreStateContext
} from './TopicTreeStoreContext';

const initialState = getModule().getStoreService().createInitialState<TopicTreeStoreState>(
  [TopicTreeStoreSliceName.TopicTreeView],
  () => ({
    payloadOfLoadAction: null,
    payloadOfLoadCompletedAction: null,
    payloadOfSetAction: null,
    statusOfLoadAction: OperationStatus.Initial
  })
);

function reducer (
  stateMap: Map<string, TopicTreeStoreState>,
  action: TopicTreeStoreActionUnion
): Map<string, TopicTreeStoreState> {
  const result = new Map<string, TopicTreeStoreState>(stateMap);
  const { sliceName, type } = action;
  const state = result.get(sliceName)!;

  switch (type) {
    case TopicTreeStoreActionType.Clear:
      result.set(sliceName, initialState.get(sliceName)!);
      break;
    case TopicTreeStoreActionType.Load:
      result.set(
        sliceName,
        {
          ...state,
          payloadOfLoadAction: action.payload,
          statusOfLoadAction: OperationStatus.Pending
        }
      );
      break;
    case TopicTreeStoreActionType.LoadCompleted:
      result.set(
        sliceName,
        {
          ...state,
          payloadOfLoadCompletedAction: action.payload,
          statusOfLoadAction: OperationStatus.Fulfilled,
          payloadOfSetAction: action.payload?.error ? state.payloadOfSetAction : action.payload
        }
      );
      break;
    case TopicTreeStoreActionType.Set:
      result.set(
        sliceName,
        {
          ...state,
          payloadOfSetAction: action.payload
        }
      );
      break;
  }

  return result;
}

export const TopicTreeStoreContextProvider: React.FC<PropsWithChildren> = memo(
function TopicTreeStoreContextProvider ({
    children
  }: PropsWithChildren
) {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <TopicTreeStoreStateContext.Provider value={state}>
      <TopicTreeStoreDispatchContext.Provider value={dispatch}>
        {children}
      </TopicTreeStoreDispatchContext.Provider>
    </TopicTreeStoreStateContext.Provider>
  );
});
