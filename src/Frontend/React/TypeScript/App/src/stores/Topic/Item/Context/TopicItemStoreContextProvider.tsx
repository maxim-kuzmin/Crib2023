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
  const { payload: { sliceName }, type } = action;

  let state = result[sliceName];

  switch (type) {
    case TopicItemStoreActionType.Clear:
      state = initialState[sliceName];
      break;
    case TopicItemStoreActionType.Delete: {
      const { payload: { actionResult } } = action;

      state = {
        ...state,
        resultOfDeleteAction: actionResult,
        statusOfDeleteAction: OperationStatus.Pending,
      };
    } break;
    case TopicItemStoreActionType.DeleteCompleted: {
      const { payload: { actionResult } } = action;

      state = {
        ...state,
        resultOfDeleteCompletedAction: actionResult,
        statusOfDeleteAction: OperationStatus.Fulfilled,
        resultOfSetAction: actionResult?.error ? state.resultOfSetAction : null
      };
    } break;
    case TopicItemStoreActionType.Load: {
      const { payload: { actionResult } } = action;

      state = {
        ...state,
        resultOfLoadAction: actionResult,
        statusOfLoadAction: OperationStatus.Pending
      };
    } break;
    case TopicItemStoreActionType.LoadCompleted: {
      const { payload: { actionResult } } = action;

      state = {
        ...state,
        resultOfLoadCompletedAction: actionResult,
        statusOfLoadAction: OperationStatus.Fulfilled,
        resultOfSetAction: actionResult?.error ? state.resultOfSetAction : actionResult
      };
    } break;
    case TopicItemStoreActionType.Save: {
      const { payload: { actionResult } } = action;

      state = {
        ...state,
        resultOfSaveAction: actionResult,
        statusOfSaveAction: OperationStatus.Pending
      };
    } break;
    case TopicItemStoreActionType.SaveCompleted: {
      const { payload: { actionResult } } = action;

      state = {
        ...state,
        resultOfSaveCompletedAction: actionResult,
        statusOfSaveAction: OperationStatus.Fulfilled,
        resultOfSetAction: actionResult?.error ? state.resultOfSetAction : actionResult
      };
    } break;
    case TopicItemStoreActionType.Set: {
      const { payload: { actionResult } } = action;

      state = {
        ...state,
        resultOfSetAction: actionResult
      };
    } break;
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
