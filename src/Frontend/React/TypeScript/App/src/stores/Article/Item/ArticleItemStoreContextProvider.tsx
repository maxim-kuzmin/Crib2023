import React, {
  type PropsWithChildren,
  memo,
  useReducer,
} from 'react';
import { getModule } from '../../../app/ModuleImpl';
import { ArticleItemStoreSliceName, type ArticleItemStoreState } from '../../../app/Stores';
import { OperationStatus, createOperationState } from '../../../common';
import { ArticleItemStoreActionType } from './ArticleItemStoreActionType';
import { type ArticleItemStoreActionUnion } from './ArticleItemStoreActionUnion';
import {
  ArticleItemStoreDispatchContext,
  ArticleItemStoreStateContext
} from './ArticleItemStoreContext';

type ActionUnion = ArticleItemStoreActionUnion;
type State = ArticleItemStoreState;
type StateMap = Map<string, State>;

const initialState = getModule().getStoreService().createInitialState<State>(
  [ArticleItemStoreSliceName.ArticleItemView],
  () => createOperationState<State>({ payloadFromLoadAction: null, payloadFromSetAction: null })
);

function reducer (stateMap: StateMap, action: ActionUnion): StateMap {
  const result = new Map<string, State>(stateMap);
  const { sliceName, type } = action;
  const state = result.get(sliceName)!;

  switch (type) {
    case ArticleItemStoreActionType.Clear:
      result.set(sliceName, initialState.get(sliceName)!);
      break;
    case ArticleItemStoreActionType.Load:
      result.set(sliceName, { ...state, payloadFromLoadAction: action.payload, status: OperationStatus.Pending });
      break;
    case ArticleItemStoreActionType.Set:
      result.set(sliceName, { ...state, payloadFromSetAction: action.payload, status: OperationStatus.Fulfilled });
      break;
  }

  return result;
}

export const ArticleItemStoreContextProvider: React.FC<PropsWithChildren> = memo(
function ArticleItemStoreContextProvider ({
    children
  }: PropsWithChildren
) {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <ArticleItemStoreStateContext.Provider value={state}>
      <ArticleItemStoreDispatchContext.Provider value={dispatch}>
        {children}
      </ArticleItemStoreDispatchContext.Provider>
    </ArticleItemStoreStateContext.Provider>
  );
});
