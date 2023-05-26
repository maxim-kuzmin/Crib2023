import React, { type PropsWithChildren, memo, useReducer } from 'react';
import { OperationStatus, createStoreStateMap } from '../../../../common';
import {
  ArticleListStoreSliceName,
  type ArticleListStoreStateMap,
  createArticleListStoreState,
} from '../../../../features';
import { ArticleListStoreActionType } from '../ArticleListStoreActionType';
import { type ArticleListStoreActionUnion } from '../ArticleListStoreActionUnion';
import {
  ArticleListStoreDispatchContext,
  ArticleListStoreStateContext
} from './ArticleListStoreContextDefinition';

const initialState: ArticleListStoreStateMap = createStoreStateMap({
  functionToCreateState: () => createArticleListStoreState(),
  sliceNames: [ArticleListStoreSliceName.Default],
});

function reducer (
  stateMap: ArticleListStoreStateMap,
  action: ArticleListStoreActionUnion
): ArticleListStoreStateMap {
  const result: ArticleListStoreStateMap = createStoreStateMap({ stateMap });
  const { payload: { sliceName }, type } = action;

  let state = result[sliceName];

  switch (type) {
    case ArticleListStoreActionType.Clear:
      state = initialState[sliceName];
      break;
    case ArticleListStoreActionType.Load: {
      const { payload: { actionResult } } = action;

      state = {
        ...state,
        resultOfLoadAction: actionResult,
        statusOfLoadAction: OperationStatus.Pending
      };
    } break;
    case ArticleListStoreActionType.LoadCompleted: {
      const { payload: { actionResult } } = action;

      state = {
        ...state,
        resultOfLoadCompletedAction: actionResult,
        statusOfLoadAction: OperationStatus.Fulfilled,
        resultOfSetAction: actionResult?.error ? state.resultOfSetAction : actionResult
      };
    } break;
    case ArticleListStoreActionType.Set: {
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

export const ArticleListStoreContextProvider: React.FC<PropsWithChildren> = memo(
function ArticleListStoreContextProvider ({
  children
}: PropsWithChildren): React.ReactElement<PropsWithChildren> | null {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <ArticleListStoreStateContext.Provider value={state}>
      <ArticleListStoreDispatchContext.Provider value={dispatch}>
        {children}
      </ArticleListStoreDispatchContext.Provider>
    </ArticleListStoreStateContext.Provider>
  );
});
