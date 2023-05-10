import React, {
  type PropsWithChildren,
  memo,
  useReducer,
  useRef,
} from 'react';
import { useAppInstance } from '../../../../app';
import { OperationStatus } from '../../../../common';
import {
  ArticleItemStoreKey,
  type ArticleItemStoreState
} from '../../../../features';
import { ArticleItemStoreActionType } from '../ArticleItemStoreActionType';
import { type ArticleItemStoreActionUnion } from '../ArticleItemStoreActionUnion';
import {
  ArticleItemStoreDispatchContext,
  ArticleItemStoreStateContext
} from './ArticleItemStoreContextDefinition';

export const ArticleItemStoreContextProvider: React.FC<PropsWithChildren> = memo(
function ArticleItemStoreContextProvider ({
  children
}: PropsWithChildren): React.ReactElement<PropsWithChildren> | null {
  const { modules } = useAppInstance();

  const initialState = useRef(
    modules.Common.Store.getService().createInitialState<ArticleItemStoreState>(
      [ArticleItemStoreKey.ArticleItemView],
      () => {
        const result: ArticleItemStoreState = {
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
      stateMap: Map<string, ArticleItemStoreState>,
      action: ArticleItemStoreActionUnion
    ): Map<string, ArticleItemStoreState> {
      const result = new Map<string, ArticleItemStoreState>(stateMap);
      const { storeKey, type } = action;
      const state = result.get(storeKey)!;

      switch (type) {
        case ArticleItemStoreActionType.Clear:
          result.set(storeKey, initialState.get(storeKey)!);
          break;
        case ArticleItemStoreActionType.Delete:
          result.set(
            storeKey,
            {
              ...state,
              payloadOfDeleteAction: action.payload,
              statusOfDeleteAction: OperationStatus.Pending
            }
          );
          break;
        case ArticleItemStoreActionType.DeleteCompleted:
          result.set(
            storeKey,
            {
              ...state,
              payloadOfDeleteCompletedAction: action.payload,
              statusOfDeleteAction: OperationStatus.Fulfilled,
              payloadOfSetAction: action.payload?.error ? state.payloadOfSetAction : null
            }
          );
          break;
        case ArticleItemStoreActionType.Load:
          result.set(
            storeKey,
            {
              ...state,
              payloadOfLoadAction: action.payload,
              statusOfLoadAction: OperationStatus.Pending
            }
          );
          break;
        case ArticleItemStoreActionType.LoadCompleted:
          result.set(
            storeKey,
            {
              ...state,
              payloadOfLoadCompletedAction: action.payload,
              statusOfLoadAction: OperationStatus.Fulfilled,
              payloadOfSetAction: action.payload?.error ? state.payloadOfSetAction : action.payload
            }
          );
          break;
        case ArticleItemStoreActionType.Save:
          result.set(
            storeKey,
            {
              ...state,
              payloadOfSaveAction: action.payload,
              statusOfSaveAction: OperationStatus.Pending
            }
          );
          break;
        case ArticleItemStoreActionType.SaveCompleted:
          result.set(
            storeKey,
            {
              ...state,
              payloadOfSaveCompletedAction: action.payload,
              statusOfSaveAction: OperationStatus.Fulfilled,
              payloadOfSetAction: action.payload?.error ? state.payloadOfSetAction : action.payload
            }
          );
          break;
        case ArticleItemStoreActionType.Set:
          result.set(
            storeKey,
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
    <ArticleItemStoreStateContext.Provider value={state}>
      <ArticleItemStoreDispatchContext.Provider value={dispatch}>
        {children}
      </ArticleItemStoreDispatchContext.Provider>
    </ArticleItemStoreStateContext.Provider>
  );
});
