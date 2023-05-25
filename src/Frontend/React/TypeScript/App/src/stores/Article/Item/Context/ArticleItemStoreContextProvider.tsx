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
  const { sliceName, type } = action;

  let state = result[sliceName];

  switch (type) {
    case ArticleItemStoreActionType.Clear:
      state = initialState[sliceName];
      break;
    case ArticleItemStoreActionType.Delete:
      state = {
        ...state,
        resultOfDeleteAction: action.payload.actionResult,
        statusOfDeleteAction: OperationStatus.Pending,
      };
      break;
    case ArticleItemStoreActionType.DeleteCompleted:
      state = {
        ...state,
        resultOfDeleteCompletedAction: action.payload.actionResult,
        statusOfDeleteAction: OperationStatus.Fulfilled,
        resultOfSetAction: action.payload.actionResult?.error ? state.resultOfSetAction : null
      };
      break;
    case ArticleItemStoreActionType.Load:
      state = {
        ...state,
        resultOfLoadAction: action.payload.actionResult,
        statusOfLoadAction: OperationStatus.Pending
      };
      break;
    case ArticleItemStoreActionType.LoadCompleted:
      state = {
        ...state,
        resultOfLoadCompletedAction: action.payload.actionResult,
        statusOfLoadAction: OperationStatus.Fulfilled,
        resultOfSetAction: action.payload.actionResult?.error ? state.resultOfSetAction : action.payload.actionResult
      };
      break;
    case ArticleItemStoreActionType.Save:
      state = {
        ...state,
        resultOfSaveAction: action.payload.actionResult,
        statusOfSaveAction: OperationStatus.Pending
      };
      break;
    case ArticleItemStoreActionType.SaveCompleted:
      state = {
        ...state,
        resultOfSaveCompletedAction: action.payload.actionResult,
        statusOfSaveAction: OperationStatus.Fulfilled,
        resultOfSetAction: action.payload.actionResult?.error ? state.resultOfSetAction : action.payload.actionResult
      };
      break;
    case ArticleItemStoreActionType.Set:
      state = {
        ...state,
        resultOfSetAction: action.payload.actionResult
      };
      break;
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
