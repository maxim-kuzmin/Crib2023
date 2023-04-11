import React, {
  type Dispatch,
  type PropsWithChildren,
  createContext,
  memo,
  useContext,
  useReducer
} from 'react';
import {
  TopicTreeStoreActionType,
  type TopicTreeStoreActionUnion,
  type TopicTreeStoreState,
  OperationStatus,
  createOperationState
} from '../../../all';

type ActionUnion = TopicTreeStoreActionUnion;
type State = TopicTreeStoreState;

const DispatchContext = createContext<Dispatch<ActionUnion> | null>(null);
const StateContext = createContext<State | null>(null);

const initialState = createOperationState<State>({
  response: null,
  input: null
});

function reducer (state: State, action: ActionUnion): State {
  switch (action.type) {
    case TopicTreeStoreActionType.Clear: {
      return initialState;
    }
    case TopicTreeStoreActionType.Load: {
      return {
        ...state,
        payloadFromLoadAction: action.payload,
        status: OperationStatus.Pending
      };
    }
    case TopicTreeStoreActionType.Set: {
      return {
        ...state,
        payloadFromSetAction: action.payload,
        status: OperationStatus.Fulfilled
      };
    }
  }
}

export const TopicTreeStoreContextProvider: React.FC<PropsWithChildren> = memo(
    function TopicTreeStoreContextProvider ({
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

export function useTopicTreeStoreStateContext () {
  return useContext(StateContext)!;
}

export function useTopicTreeStoreDispatchContext () {
  return useContext(DispatchContext)!;
}
