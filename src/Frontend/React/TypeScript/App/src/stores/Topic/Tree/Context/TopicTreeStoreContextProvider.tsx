import React, {
  type PropsWithChildren,
  memo,
  useReducer,
  useRef,
} from 'react';
import { useAppInstance } from '../../../../app';
import { OperationStatus } from '../../../../common';
import {
  TopicTreeStoreOwner,
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
      [TopicTreeStoreOwner.TopicTreeView],
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
      const { owner, type } = action;
      const state = result.get(owner)!;

      switch (type) {
        case TopicTreeStoreActionType.Clear:
          result.set(owner, initialState.get(owner)!);
          break;
        case TopicTreeStoreActionType.Load:
          result.set(
            owner,
            {
              ...state,
              payloadOfLoadAction: action.payload,
              statusOfLoadAction: OperationStatus.Pending
            }
          );
          break;
        case TopicTreeStoreActionType.LoadCompleted:
          result.set(
            owner,
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
            owner,
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
