import React, {
  type Dispatch,
  type PropsWithChildren,
  createContext,
  memo,
  useContext,
  useReducer
} from 'react';
import {
  TopicItemStoreActionType,
  type TopicItemStoreActionUnion,
  type TopicItemStoreState,
  OperationStatus,
  createOperationState
} from '../../../all';

type ActionUnion = TopicItemStoreActionUnion;
type State = TopicItemStoreState;

const DispatchContext = createContext<Dispatch<ActionUnion> | null>(null);
const StateContext = createContext<State | null>(null);

const initialState = createOperationState<State>({
  response: null,
  input: null
});

function reducer (state: State, action: ActionUnion): State {
  switch (action.type) {
    case TopicItemStoreActionType.Clear: {
      return initialState;
    }
    case TopicItemStoreActionType.Load: {
      return {
        ...state,
        input: action.payload,
        status: OperationStatus.Pending
      };
    }
    case TopicItemStoreActionType.Set: {
      return {
        ...state,
        response: action.payload,
        status: OperationStatus.Fulfilled
      };
    }
  }
}

export const TopicItemStoreContextProvider: React.FC<PropsWithChildren> = memo(
    function TopicItemStoreContextProvider ({
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

export function useTopicItemStoreStateContext () {
  return useContext(StateContext)!;
}

export function useTopicItemStoreDispatchContext () {
  return useContext(DispatchContext)!;
}
