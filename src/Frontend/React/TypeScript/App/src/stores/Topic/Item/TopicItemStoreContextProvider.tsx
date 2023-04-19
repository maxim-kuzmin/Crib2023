import React, {
  type PropsWithChildren,
  memo,
  useReducer,
} from 'react';
import { getModule } from '../../../app/ModuleImpl';
import { TopicItemStoreSliceName, type TopicItemStoreState } from '../../../app/Stores';
import { OperationStatus } from '../../../common';
import { TopicItemStoreActionType } from './TopicItemStoreActionType';
import { type TopicItemStoreActionUnion } from './TopicItemStoreActionUnion';
import {
  TopicItemStoreDispatchContext,
  TopicItemStoreStateContext
} from './TopicItemStoreContext';

type ActionUnion = TopicItemStoreActionUnion;
type StoreState = TopicItemStoreState;
type StoreStateMap = Map<string, StoreState>;

const initialState = getModule().getStoreService().createInitialState<StoreState>(
  [TopicItemStoreSliceName.TopicItemView],
  () => ({
    payloadOfLoadAction: null,
    payloadOfSetAction: null,
    statusOfLoadAction: OperationStatus.Initial
  })
);

function reducer (stateMap: StoreStateMap, action: ActionUnion): StoreStateMap {
  const result = new Map<string, StoreState>(stateMap);
  const { sliceName, type } = action;
  const state = result.get(sliceName)!;

  switch (type) {
    case TopicItemStoreActionType.Clear:
      result.set(sliceName, initialState.get(sliceName)!);
      break;
    case TopicItemStoreActionType.Load:
      result.set(
        sliceName,
        {
          ...state,
          payloadOfLoadAction: action.payload,
          statusOfLoadAction: OperationStatus.Pending
        }
      );
      break;
    case TopicItemStoreActionType.Set:
      result.set(
        sliceName,
        {
          ...state,
          payloadOfSetAction: action.payload,
          statusOfLoadAction: OperationStatus.Fulfilled
        }
      );
      break;
  }

  return result;
}

export const TopicItemStoreContextProvider: React.FC<PropsWithChildren> = memo(
function TopicItemStoreContextProvider ({
    children
  }: PropsWithChildren
) {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <TopicItemStoreStateContext.Provider value={state}>
      <TopicItemStoreDispatchContext.Provider value={dispatch}>
        {children}
      </TopicItemStoreDispatchContext.Provider>
    </TopicItemStoreStateContext.Provider>
  );
});
