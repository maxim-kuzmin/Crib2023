import React, {
  type PropsWithChildren,
  memo,
  useReducer,
} from 'react';
import { getModule } from '../../../app/ModuleImpl';
import { ArticleListStoreSliceName, type ArticleListStoreState } from '../../../app/Stores';
import { OperationStatus, createOperationState } from '../../../common';
import { ArticleListStoreActionType } from './ArticleListStoreActionType';
import { type ArticleListStoreActionUnion } from './ArticleListStoreActionUnion';
import {
  ArticleListStoreDispatchContext,
  ArticleListStoreStateContext
} from './ArticleListStoreContext';

type ActionUnion = ArticleListStoreActionUnion;
type StoreState = ArticleListStoreState;
type StoreStateMap = Map<string, StoreState>;

const initialState = getModule().getStoreService().createInitialState<StoreState>(
  [ArticleListStoreSliceName.ArticleTableView],
  () => createOperationState<StoreState>({ payloadFromLoadAction: null, payloadFromSetAction: null })
);

function reducer (stateMap: StoreStateMap, action: ActionUnion): StoreStateMap {
  const result = new Map<string, StoreState>(stateMap);
  const { sliceName, type } = action;
  const state = result.get(sliceName)!;

  switch (type) {
    case ArticleListStoreActionType.Clear:
      result.set(sliceName, initialState.get(sliceName)!);
      break;
    case ArticleListStoreActionType.Load:
      result.set(sliceName, { ...state, payloadFromLoadAction: action.payload, status: OperationStatus.Pending });
      break;
    case ArticleListStoreActionType.Set:
      result.set(sliceName, { ...state, payloadFromSetAction: action.payload, status: OperationStatus.Fulfilled });
      break;
  }

  return result;
}

export const ArticleListStoreContextProvider: React.FC<PropsWithChildren> = memo(
function ArticleListStoreContextProvider ({
    children
  }: PropsWithChildren
) {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <ArticleListStoreStateContext.Provider value={state}>
      <ArticleListStoreDispatchContext.Provider value={dispatch}>
        {children}
      </ArticleListStoreDispatchContext.Provider>
    </ArticleListStoreStateContext.Provider>
  );
});
