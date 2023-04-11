import React, {
  type Dispatch,
  type PropsWithChildren,
  createContext,
  memo,
  useContext,
  useReducer
} from 'react';
import {
  ArticleItemStoreActionType,
  type ArticleItemStoreActionUnion,
  type ArticleItemStoreState,
  OperationStatus,
  createOperationState
} from '../../../../all';

type ActionUnion = ArticleItemStoreActionUnion;
type State = ArticleItemStoreState;

const DispatchContext = createContext<Dispatch<ActionUnion> | null>(null);
const StateContext = createContext<State | null>(null);

const initialState = createOperationState<State>({
  response: null,
  input: null
});

function reducer (state: State, action: ActionUnion): State {
  switch (action.type) {
    case ArticleItemStoreActionType.Clear: {
      return initialState;
    }
    case ArticleItemStoreActionType.Load: {
      return {
        ...state,
        input: action.payload,
        status: OperationStatus.Pending
      };
    }
    case ArticleItemStoreActionType.Set: {
      return {
        ...state,
        response: action.payload,
        status: OperationStatus.Fulfilled
      };
    }
  }
}

export const ArticleItemStoreContextProvider: React.FC<PropsWithChildren> = memo(
    function ArticleItemStoreContextProvider ({
      children
    }: PropsWithChildren) {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <StateContext.Provider value={state}>
      <DispatchContext.Provider value={dispatch}>
        {children}
      </DispatchContext.Provider>
    </StateContext.Provider>
  );
});

export function useArticleItemStoreStateContext () {
  return useContext(StateContext)!;
}

export function useArticleItemStoreDispatchContext () {
  return useContext(DispatchContext)!;
}
