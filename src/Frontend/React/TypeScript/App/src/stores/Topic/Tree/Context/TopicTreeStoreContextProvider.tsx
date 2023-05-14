import React, {
  type PropsWithChildren,
  memo,
  useReducer,
  useRef,
} from 'react';
import { useAppInstance } from '../../../../app';
import { OperationStatus } from '../../../../common';
import {
  TopicTreeStoreSlice,
  type TopicTreeStoreState
} from '../../../../features';
import { TopicTreeStoreActionType } from '../TopicTreeStoreActionType';
import { type TopicTreeStoreActionUnion } from '../TopicTreeStoreActionUnion';
import {
  TopicTreeStoreDispatchContext,
  TopicTreeStoreStateContext
} from './TopicTreeStoreContextDefinition';

export const TopicTreeStoreContextProvider: React.FC<PropsWithChildren> = memo(
function TopicTreeStoreContextProvider ({
  children
}: PropsWithChildren): React.ReactElement<PropsWithChildren> | null {
  const { modules } = useAppInstance();

  const initialState = useRef(
    modules.Common.Store.getService().createInitialState<TopicTreeStoreState>(
      [TopicTreeStoreSlice.Default],
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
      const { slice, type } = action;
      const state = result.get(slice)!;

      switch (type) {
        case TopicTreeStoreActionType.Clear:
          result.set(slice, initialState.get(slice)!);
          break;
        case TopicTreeStoreActionType.Load:
          result.set(
            slice,
            {
              ...state,
              payloadOfLoadAction: action.payload,
              statusOfLoadAction: OperationStatus.Pending
            }
          );
          break;
        case TopicTreeStoreActionType.LoadCompleted:
          result.set(
            slice,
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
            slice,
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
