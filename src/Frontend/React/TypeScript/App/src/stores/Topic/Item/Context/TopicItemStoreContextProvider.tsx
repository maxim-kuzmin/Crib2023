import React, { type PropsWithChildren, memo, useReducer } from 'react';
import { OperationStatus, createStoreStateMap } from '../../../../common';
import {
  TopicItemStoreSliceName,
  type TopicItemStoreStateMap,
  createTopicItemStoreState,
} from '../../../../features';
import { TopicItemStoreActionType } from '../TopicItemStoreActionType';
import { type TopicItemStoreActionUnion } from '../TopicItemStoreActionUnion';
import {
  TopicItemStoreDispatchContext,
  TopicItemStoreStateContext
} from './TopicItemStoreContextDefinition';

const initialState: TopicItemStoreStateMap = createStoreStateMap({
  functionToCreateState: () => createTopicItemStoreState(),
  sliceNames: [TopicItemStoreSliceName.Default],
});

function reducer (
  stateMap: TopicItemStoreStateMap,
  action: TopicItemStoreActionUnion
): TopicItemStoreStateMap {
  const result: TopicItemStoreStateMap = createStoreStateMap({ stateMap });
  const { sliceName, type } = action;

  let state = result[sliceName];

  switch (type) {
    case TopicItemStoreActionType.Clear:
      state = initialState[sliceName];
      break;
    case TopicItemStoreActionType.Delete:
      state = {
        ...state,
        resultOfDeleteAction: action.payload.actionResult,
        statusOfDeleteAction: OperationStatus.Pending,
      };
      break;
    case TopicItemStoreActionType.DeleteCompleted:
      state = {
        ...state,
        resultOfDeleteCompletedAction: action.payload.actionResult,
        statusOfDeleteAction: OperationStatus.Fulfilled,
        resultOfSetAction: action.payload.actionResult?.error ? state.resultOfSetAction : null
      };
      break;
    case TopicItemStoreActionType.Load:
      state = {
        ...state,
        resultOfLoadAction: action.payload.actionResult,
        statusOfLoadAction: OperationStatus.Pending
      };
      break;
    case TopicItemStoreActionType.LoadCompleted:
      state = {
        ...state,
        resultOfLoadCompletedAction: action.payload.actionResult,
        statusOfLoadAction: OperationStatus.Fulfilled,
        resultOfSetAction: action.payload.actionResult?.error ? state.resultOfSetAction : action.payload.actionResult
      };
      break;
    case TopicItemStoreActionType.Save:
      state = {
        ...state,
        resultOfSaveAction: action.payload.actionResult,
        statusOfSaveAction: OperationStatus.Pending
      };
      break;
    case TopicItemStoreActionType.SaveCompleted:
      state = {
        ...state,
        resultOfSaveCompletedAction: action.payload.actionResult,
        statusOfSaveAction: OperationStatus.Fulfilled,
        resultOfSetAction: action.payload.actionResult?.error ? state.resultOfSetAction : action.payload.actionResult
      };
      break;
    case TopicItemStoreActionType.Set:
      state = {
        ...state,
        resultOfSetAction: action.payload.actionResult
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
