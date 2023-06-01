import React, { type PropsWithChildren, memo, useReducer } from 'react';
import { OperationStatus, createStoreStateMap } from '../../../../common';
import {
  ArticleItemStoreSliceName,
  type ArticleItemStoreStateMap,
  createArticleItemStoreState,
} from '../../../../features';
import { ArticleItemStoreActionType } from '../ArticleItemStoreActionType';
import { type ArticleItemStoreActionUnion } from '../ArticleItemStoreActionUnion';
import {
  ArticleItemStoreDispatchContext,
  ArticleItemStoreStateContext
} from './ArticleItemStoreContextDefinition';

const initialState: ArticleItemStoreStateMap = createStoreStateMap({
  functionToCreateState: () => createArticleItemStoreState(),
  sliceNames: [ArticleItemStoreSliceName.Default],
});

function reducer (
  stateMap: ArticleItemStoreStateMap,
  action: ArticleItemStoreActionUnion
): ArticleItemStoreStateMap {
  const result: ArticleItemStoreStateMap = createStoreStateMap({ stateMap });
  const { payload: { sliceName }, type } = action;

  let state = result[sliceName];

  switch (type) {
    case ArticleItemStoreActionType.Clear:
      state = initialState[sliceName];
      break;
    case ArticleItemStoreActionType.Delete: {
      const { payload: { actionResult } } = action;

      state = {
        ...state,
        resultOfDeleteAction: actionResult,
        statusOfDeleteAction: OperationStatus.Pending,
      };
    } break;
    case ArticleItemStoreActionType.DeleteCompleted: {
      const { payload: { actionResult } } = action;

      state = {
        ...state,
        resultOfDeleteCompletedAction: actionResult,
      };

      if (actionResult?.error) {
        state.statusOfDeleteAction = OperationStatus.Rejected;
      } else {
        state.statusOfDeleteAction = OperationStatus.Fulfilled;
        state.resultOfSetAction = null;
      }
    } break;
    case ArticleItemStoreActionType.Load: {
      const { payload: { actionResult } } = action;

      state = {
        ...state,
        resultOfLoadAction: actionResult,
        statusOfLoadAction: OperationStatus.Pending
      };
    } break;
    case ArticleItemStoreActionType.LoadCompleted: {
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
    case ArticleItemStoreActionType.Save: {
      const { payload: { actionResult } } = action;

      state = {
        ...state,
        resultOfSaveAction: actionResult,
        statusOfSaveAction: OperationStatus.Pending
      };
    } break;
    case ArticleItemStoreActionType.SaveCompleted: {
      const { payload: { actionResult } } = action;

      state = {
        ...state,
        resultOfSaveCompletedAction: actionResult,
      };

      if (actionResult?.error) {
        state.statusOfSaveAction = OperationStatus.Rejected;
      } else {
        state.statusOfSaveAction = OperationStatus.Fulfilled;
        state.resultOfSetAction = actionResult;
      }
    } break;
    case ArticleItemStoreActionType.Set: {
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

export const ArticleItemStoreContextProvider: React.FC<PropsWithChildren> = memo(
function ArticleItemStoreContextProvider ({
  children
}: PropsWithChildren): React.ReactElement<PropsWithChildren> | null {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <ArticleItemStoreStateContext.Provider value={state}>
      <ArticleItemStoreDispatchContext.Provider value={dispatch}>
        {children}
      </ArticleItemStoreDispatchContext.Provider>
    </ArticleItemStoreStateContext.Provider>
  );
});
