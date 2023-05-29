import React, { type PropsWithChildren, memo, useReducer } from 'react';
import { OperationStatus, createStoreStateMap } from '../../../../common';
import {
  TopicTreeStoreSliceName,
  type TopicTreeStoreStateMap,
  createTopicTreeStoreState,
} from '../../../../features';
import { TopicTreeStoreActionType } from '../TopicTreeStoreActionType';
import { type TopicTreeStoreActionUnion } from '../TopicTreeStoreActionUnion';
import {
  TopicTreeStoreDispatchContext,
  TopicTreeStoreStateContext
} from './TopicTreeStoreContextDefinition';

const initialState: TopicTreeStoreStateMap = createStoreStateMap({
  functionToCreateState: () => createTopicTreeStoreState(),
  sliceNames: [TopicTreeStoreSliceName.Default],
});

function reducer (
  stateMap: TopicTreeStoreStateMap,
  action: TopicTreeStoreActionUnion
): TopicTreeStoreStateMap {
  const result: TopicTreeStoreStateMap = createStoreStateMap({ stateMap });
  const { payload: { sliceName }, type } = action;

  let state = result[sliceName];

  switch (type) {
    case TopicTreeStoreActionType.Clear:
      state = initialState[sliceName];
      break;
      case TopicTreeStoreActionType.Load: {
        const { payload: { actionResult } } = action;

        state = {
          ...state,
          resultOfLoadAction: actionResult,
          statusOfLoadAction: OperationStatus.Pending
        };
      } break;
      case TopicTreeStoreActionType.LoadCompleted: {
        const { payload: { actionResult } } = action;

        state = {
          ...state,
          resultOfLoadCompletedAction: actionResult,
        };

        if (actionResult?.error) {
          state.statusOfLoadAction = OperationStatus.Rejected;
        } else {
          state.statusOfLoadAction = OperationStatus.Fulfilled;
          state.resultOfSetAction = actionResult;
        }
      } break;
      case TopicTreeStoreActionType.Set: {
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
