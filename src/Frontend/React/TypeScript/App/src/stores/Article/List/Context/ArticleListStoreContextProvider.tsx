import React, {
  type PropsWithChildren,
  memo,
  useReducer,
  useRef,
} from 'react';
import { useAppInstance } from '../../../../app';
import { OperationStatus } from '../../../../common';
import {
  ArticleListStoreKey,
  type ArticleListStoreState
} from '../../../../features';
import { ArticleListStoreActionType } from '../ArticleListStoreActionType';
import { type ArticleListStoreActionUnion } from '../ArticleListStoreActionUnion';
import {
  ArticleListStoreDispatchContext,
  ArticleListStoreStateContext
} from './ArticleListStoreContextDefinition';

export const ArticleListStoreContextProvider: React.FC<PropsWithChildren> = memo(
function ArticleListStoreContextProvider ({
  children
}: PropsWithChildren): React.ReactElement<PropsWithChildren> | null {
  const { modules } = useAppInstance();

  const initialState = useRef(
    modules.Common.Store.getService().createInitialState<ArticleListStoreState>(
      [ArticleListStoreKey.ArticleTableView],
      () => {
        const result: ArticleListStoreState = {
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
      stateMap: Map<string, ArticleListStoreState>,
      action: ArticleListStoreActionUnion
    ): Map<string, ArticleListStoreState> {
      const result = new Map<string, ArticleListStoreState>(stateMap);
      const { storeKey, type } = action;
      const state = result.get(storeKey)!;

      switch (type) {
        case ArticleListStoreActionType.Clear:
          result.set(storeKey, initialState.get(storeKey)!);
          break;
        case ArticleListStoreActionType.Load:
          result.set(
            storeKey,
            {
              ...state,
              payloadOfLoadAction: action.payload,
              statusOfLoadAction: OperationStatus.Pending
            }
          );
          break;
        case ArticleListStoreActionType.LoadCompleted:
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
        case ArticleListStoreActionType.Set:
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
    <ArticleListStoreStateContext.Provider value={state}>
      <ArticleListStoreDispatchContext.Provider value={dispatch}>
        {children}
      </ArticleListStoreDispatchContext.Provider>
    </ArticleListStoreStateContext.Provider>
  );
});
