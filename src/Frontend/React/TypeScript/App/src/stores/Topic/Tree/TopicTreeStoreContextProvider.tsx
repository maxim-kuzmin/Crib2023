import React, {
  type PropsWithChildren,
  memo,
  useReducer,
} from 'react';
import { getModule } from '../../../app/ModuleImpl';
import { TopicTreeStoreSliceName, type TopicTreeStoreState } from '../../../app/Stores';
import { OperationStatus, createOperationState } from '../../../common';
import { TopicTreeStoreActionType } from './TopicTreeStoreActionType';
import { type TopicTreeStoreActionUnion } from './TopicTreeStoreActionUnion';
import {
  TopicTreeStoreDispatchContext,
  TopicTreeStoreStateContext
} from './TopicTreeStoreContext';

type ActionUnion = TopicTreeStoreActionUnion;
type StoreState = TopicTreeStoreState;
type StoreStateMap = Map<string, StoreState>;

const initialState = getModule().getStoreService().createInitialState<StoreState>(
  [TopicTreeStoreSliceName.TopicTreeView],
  () => createOperationState<StoreState>({ payloadFromLoadAction: null, payloadFromSetAction: null })
);

function reducer (stateMap: StoreStateMap, action: ActionUnion): StoreStateMap {
  const result = new Map<string, StoreState>(stateMap);
  const { sliceName, type } = action;
  const state = result.get(sliceName)!;

  switch (type) {
    case TopicTreeStoreActionType.Clear:
      result.set(sliceName, initialState.get(sliceName)!);
      break;
    case TopicTreeStoreActionType.Load:
      result.set(sliceName, { ...state, payloadFromLoadAction: action.payload, status: OperationStatus.Pending });
      break;
    case TopicTreeStoreActionType.Set:
      result.set(sliceName, { ...state, payloadFromSetAction: action.payload, status: OperationStatus.Fulfilled });
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
