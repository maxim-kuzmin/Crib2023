import React, {
  type PropsWithChildren,
  memo,
  useReducer,
  useRef,
} from 'react';
import { useAppInstance } from '../../../../app';
import { OperationStatus } from '../../../../common';
import {
  TopicItemStoreOwner,
  type TopicItemStoreState
} from '../../../../features';
import { TopicItemStoreActionType } from '../TopicItemStoreActionType';
import { type TopicItemStoreActionUnion } from '../TopicItemStoreActionUnion';
import {
  TopicItemStoreDispatchContext,
  TopicItemStoreStateContext
} from './TopicItemStoreContextDefinition';

export const TopicItemStoreContextProvider: React.FC<PropsWithChildren> = memo(
function TopicItemStoreContextProvider ({
  children
}: PropsWithChildren): React.ReactElement<PropsWithChildren> | null {
  const { modules } = useAppInstance();

  const initialState = useRef(
    modules.Common.Store.getService().createInitialState<TopicItemStoreState>(
      [TopicItemStoreOwner.TopicItemView],
      () => {
        const result: TopicItemStoreState = {
          payloadOfDeleteAction: null,
          payloadOfDeleteCompletedAction: null,
          payloadOfLoadAction: null,
          payloadOfLoadCompletedAction: null,
          payloadOfSaveAction: null,
          payloadOfSaveCompletedAction: null,
          payloadOfSetAction: null,
          statusOfDeleteAction: OperationStatus.Initial,
          statusOfLoadAction: OperationStatus.Initial,
          statusOfSaveAction: OperationStatus.Initial
        };

        return result;
      }
    )
  ).current;

  const reducer = useRef(
    function (
      stateMap: Map<string, TopicItemStoreState>,
      action: TopicItemStoreActionUnion
    ): Map<string, TopicItemStoreState> {
      const result = new Map<string, TopicItemStoreState>(stateMap);
      const { owner, type } = action;
      const state = result.get(owner)!;

      switch (type) {
        case TopicItemStoreActionType.Clear:
          result.set(owner, initialState.get(owner)!);
          break;
        case TopicItemStoreActionType.Delete:
          result.set(
            owner,
            {
              ...state,
              payloadOfDeleteAction: action.payload,
              statusOfDeleteAction: OperationStatus.Pending
            }
          );
          break;
        case TopicItemStoreActionType.DeleteCompleted:
          result.set(
            owner,
            {
              ...state,
              payloadOfDeleteCompletedAction: action.payload,
              statusOfDeleteAction: OperationStatus.Fulfilled,
              payloadOfSetAction: action.payload?.error ? state.payloadOfSetAction : null
            }
          );
          break;
        case TopicItemStoreActionType.Load:
          result.set(
            owner,
            {
              ...state,
              payloadOfLoadAction: action.payload,
              statusOfLoadAction: OperationStatus.Pending
            }
          );
          break;
        case TopicItemStoreActionType.LoadCompleted:
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
        case TopicItemStoreActionType.Save:
          result.set(
            owner,
            {
              ...state,
              payloadOfSaveAction: action.payload,
              statusOfSaveAction: OperationStatus.Pending
            }
          );
          break;
        case TopicItemStoreActionType.SaveCompleted:
          result.set(
            owner,
            {
              ...state,
              payloadOfSaveCompletedAction: action.payload,
              statusOfSaveAction: OperationStatus.Fulfilled,
              payloadOfSetAction: action.payload?.error ? state.payloadOfSetAction : action.payload
            }
          );
          break;
        case TopicItemStoreActionType.Set:
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
    <TopicItemStoreStateContext.Provider value={state}>
      <TopicItemStoreDispatchContext.Provider value={dispatch}>
        {children}
      </TopicItemStoreDispatchContext.Provider>
    </TopicItemStoreStateContext.Provider>
  );
});
