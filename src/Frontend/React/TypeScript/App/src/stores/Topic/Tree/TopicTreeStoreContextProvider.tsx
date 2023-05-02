import React, {
  type PropsWithChildren,
  memo,
  useReducer,
  useRef,
} from 'react';
import { useAppInstance } from '../../../app';
import { OperationStatus } from '../../../common';
import {
  TopicTreeStoreSliceName,
  type TopicTreeStoreState
} from '../../../features';
import { TopicTreeStoreActionType } from './TopicTreeStoreActionType';
import { type TopicTreeStoreActionUnion } from './TopicTreeStoreActionUnion';
import {
  TopicTreeStoreDispatchContext,
  TopicTreeStoreStateContext
} from './TopicTreeStoreContext';

export const TopicTreeStoreContextProvider: React.FC<PropsWithChildren> = memo(
function TopicTreeStoreContextProvider ({
  children
}: PropsWithChildren): React.ReactElement<PropsWithChildren> | null {
  const { module } = useAppInstance();

  const initialState = useRef(
    module.Common.Store.getService().createInitialState<TopicTreeStoreState>(
      [TopicTreeStoreSliceName.TopicTreeView],
      () => {
        const result: TopicTreeStoreState = {
          payloadOfLoadAction: null,
          payloadOfLoadCompletedAction: null,
          payloadOfSetAction: null,
          statusOfLoadAction: OperationStatus.Initial
        };

        return result;
      }
    )
  ).current;

  const reducer = useRef(
    function (
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
  ).current;

  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <TopicTreeStoreStateContext.Provider value={state}>
      <TopicTreeStoreDispatchContext.Provider value={dispatch}>
        {children}
      </TopicTreeStoreDispatchContext.Provider>
    </TopicTreeStoreStateContext.Provider>
  );
});
