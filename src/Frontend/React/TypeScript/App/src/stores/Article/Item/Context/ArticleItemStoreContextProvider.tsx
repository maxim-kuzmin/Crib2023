import React, {
  type PropsWithChildren,
  memo,
  useReducer,
  useRef,
} from 'react';
import { useAppInstance } from '../../../../app';
import { OperationStatus } from '../../../../common';
import {
  ArticleItemStoreSliceName,
  type ArticleItemStoreState,
  createArticleItemStoreState,
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
      [ArticleItemStoreSliceName.Default],
      () => createArticleItemStoreState(),
    )
  ).current;

  const reducer = useRef(
    function (
      stateMap: Map<string, ArticleItemStoreState>,
      action: ArticleItemStoreActionUnion
    ): Map<string, ArticleItemStoreState> {
      const result = new Map<string, ArticleItemStoreState>(stateMap);
      const { sliceName, type } = action;
      const state = result.get(sliceName)!;

      switch (type) {
        case ArticleItemStoreActionType.Clear:
          result.set(sliceName, initialState.get(sliceName)!);
          break;
        case ArticleItemStoreActionType.Delete:
          result.set(
            sliceName,
            {
              ...state,
              payloadOfDeleteAction: action.payload,
              statusOfDeleteAction: OperationStatus.Pending
            }
          );
          break;
        case ArticleItemStoreActionType.DeleteCompleted:
          result.set(
            sliceName,
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
            sliceName,
            {
              ...state,
              payloadOfLoadAction: action.payload,
              statusOfLoadAction: OperationStatus.Pending
            }
          );
          break;
        case ArticleItemStoreActionType.LoadCompleted:
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
        case ArticleItemStoreActionType.Save:
          result.set(
            sliceName,
            {
              ...state,
              payloadOfSaveAction: action.payload,
              statusOfSaveAction: OperationStatus.Pending
            }
          );
          break;
        case ArticleItemStoreActionType.SaveCompleted:
          result.set(
            sliceName,
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
    <ArticleItemStoreStateContext.Provider value={state}>
      <ArticleItemStoreDispatchContext.Provider value={dispatch}>
        {children}
      </ArticleItemStoreDispatchContext.Provider>
    </ArticleItemStoreStateContext.Provider>
  );
});
