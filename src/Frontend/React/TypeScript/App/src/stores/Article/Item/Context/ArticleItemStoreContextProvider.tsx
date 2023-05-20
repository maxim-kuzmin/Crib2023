import React, { type PropsWithChildren, memo, useReducer } from 'react';
import { OperationStatus, createStoreStateMap } from '../../../../common';
import {
  ArticleItemStoreSliceName,
  type ArticleItemStoreState,
  type ArticleItemStoreStateMap,
  createArticleItemStoreState,
} from '../../../../features';
import { ArticleItemStoreActionType } from '../ArticleItemStoreActionType';
import { type ArticleItemStoreActionUnion } from '../ArticleItemStoreActionUnion';
import {
  ArticleItemStoreDispatchContext,
  ArticleItemStoreStateContext
} from './ArticleItemStoreContextDefinition';

type StateMap = ArticleItemStoreStateMap;

const initialState: StateMap = createStoreStateMap({
  functionToCreateState: () => createArticleItemStoreState(),
  sliceNames: [ArticleItemStoreSliceName.Default],
});

function reducer (stateMap: StateMap, action: ArticleItemStoreActionUnion): StateMap {
  const result: StateMap = createStoreStateMap({ stateMap });
  const { sliceName, type } = action;

  let state: ArticleItemStoreState = result[sliceName];

  switch (type) {
    case ArticleItemStoreActionType.Clear:
      state = initialState[sliceName];
      break;
    case ArticleItemStoreActionType.Delete:
      state = {
        ...state,
        payloadOfDeleteAction: action.payload,
        statusOfDeleteAction: OperationStatus.Pending,
      };
      break;
    case ArticleItemStoreActionType.DeleteCompleted:
      state = {
        ...state,
        payloadOfDeleteCompletedAction: action.payload,
        statusOfDeleteAction: OperationStatus.Fulfilled,
        payloadOfSetAction: action.payload?.error ? state.payloadOfSetAction : null
      };
      break;
    case ArticleItemStoreActionType.Load:
      state = {
        ...state,
        payloadOfLoadAction: action.payload,
        statusOfLoadAction: OperationStatus.Pending
      };
      break;
    case ArticleItemStoreActionType.LoadCompleted:
      state = {
        ...state,
        payloadOfLoadCompletedAction: action.payload,
        statusOfLoadAction: OperationStatus.Fulfilled,
        payloadOfSetAction: action.payload?.error ? state.payloadOfSetAction : action.payload
      };
      break;
    case ArticleItemStoreActionType.Save:
      state = {
        ...state,
        payloadOfSaveAction: action.payload,
        statusOfSaveAction: OperationStatus.Pending
      };
      break;
    case ArticleItemStoreActionType.SaveCompleted:
      state = {
        ...state,
        payloadOfSaveCompletedAction: action.payload,
        statusOfSaveAction: OperationStatus.Fulfilled,
        payloadOfSetAction: action.payload?.error ? state.payloadOfSetAction : action.payload
      };
      break;
    case ArticleItemStoreActionType.Set:
      state = {
        ...state,
        payloadOfSetAction: action.payload
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
