import React, { type PropsWithChildren, memo, useReducer } from 'react';
import { OperationStatus, createStoreStateMap } from '../../../../common';
import {
  ArticleListStoreSliceName,
  type ArticleListStoreState,
  type ArticleListStoreStateMap,
  createArticleListStoreState,
} from '../../../../features';
import { ArticleListStoreActionType } from '../ArticleListStoreActionType';
import { type ArticleListStoreActionUnion } from '../ArticleListStoreActionUnion';
import {
  ArticleListStoreDispatchContext,
  ArticleListStoreStateContext
} from './ArticleListStoreContextDefinition';

type StateMap = ArticleListStoreStateMap;

const initialState = createStoreStateMap({
  functionToCreateState: () => createArticleListStoreState(),
  sliceNames: [ArticleListStoreSliceName.Default],
});

function reducer (stateMap: StateMap, action: ArticleListStoreActionUnion): StateMap {
  const result: StateMap = createStoreStateMap({ stateMap });
  const { sliceName, type } = action;

  let state: ArticleListStoreState = result[sliceName];

  switch (type) {
    case ArticleListStoreActionType.Clear:
      state = initialState[sliceName];
      break;
    case ArticleListStoreActionType.Load:
      state = {
        ...state,
        payloadOfLoadAction: action.payload,
        statusOfLoadAction: OperationStatus.Pending
      };
      break;
    case ArticleListStoreActionType.LoadCompleted:
      state = {
        ...state,
        payloadOfLoadCompletedAction: action.payload,
        statusOfLoadAction: OperationStatus.Fulfilled,
        payloadOfSetAction: action.payload?.error ? state.payloadOfSetAction : action.payload
      };
      break;
    case ArticleListStoreActionType.Set:
      state = {
        ...state,
        payloadOfSetAction: action.payload
      };
      break;
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
