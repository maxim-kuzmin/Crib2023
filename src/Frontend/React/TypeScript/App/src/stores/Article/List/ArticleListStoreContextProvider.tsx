import React, {
  type Dispatch,
  type PropsWithChildren,
  createContext,
  memo,
  useContext,
  useReducer
} from 'react';
import {
  ArticleListStoreActionType,
  type ArticleListStoreActionUnion,
  type ArticleListStoreState,
  OperationStatus,
  createOperationState
} from '../../../all';

type ActionUnion = ArticleListStoreActionUnion;
type State = ArticleListStoreState;

const DispatchContext = createContext<Dispatch<ActionUnion> | null>(null);
const StateContext = createContext<State | null>(null);

const initialState = createOperationState<State>({
  response: null,
  input: null
});

function reducer (state: State, action: ActionUnion): State {
  switch (action.type) {
    case ArticleListStoreActionType.Clear: {
      return initialState;
    }
    case ArticleListStoreActionType.Load: {
      return {
        ...state,
        payloadFromLoadAction: action.payload,
        status: OperationStatus.Pending
      };
    }
    case ArticleListStoreActionType.Set: {
      return {
        ...state,
        payloadFromSetAction: action.payload,
        status: OperationStatus.Fulfilled
      };
    }
  }
}

export const ArticleListStoreContextProvider: React.FC<PropsWithChildren> = memo(
    function ArticleListStoreContextProvider ({
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

export function useArticleListStoreStateContext () {
  return useContext(StateContext)!;
}

export function useArticleListStoreDispatchContext () {
  return useContext(DispatchContext)!;
}
