import React, {
  type Dispatch,
  type PropsWithChildren,
  createContext,
  memo,
  useContext,
  useReducer,
} from 'react';
import {
  TopicTreeStoreActionType,
  type TopicTreeStoreActionUnion,
  type TopicTreeStoreState,
  OperationStatus,
  createOperationState
} from '../../../all';
import { getModule } from '../../../app/ModuleImpl';
import { TopicTreeStoreSliceName } from '../../../app/Stores';

type ActionUnion = TopicTreeStoreActionUnion;
type State = TopicTreeStoreState;
type StateMap = Map<string, State>;

const DispatchContext = createContext<Dispatch<ActionUnion> | null>(null);
const StateContext = createContext<StateMap | null>(null);

const initialState = getModule().getStoreService().createInitialState<State>(
  [TopicTreeStoreSliceName.Global],
  () => createOperationState<State>({
    payloadFromLoadAction: null,
    payloadFromSetAction: null
  })
);

function reducer (stateMap: StateMap, action: ActionUnion): StateMap {
  const result = new Map<string, State>(stateMap);
  const { sliceName, type } = action;
  const state = result.get(sliceName)!;

  switch (type) {
    case TopicTreeStoreActionType.Clear:
      result.set(sliceName, initialState.get(sliceName)!);
      break;
    case TopicTreeStoreActionType.Load:
      result.set(sliceName, {
        ...state,
        payloadFromLoadAction: action.payload,
        status: OperationStatus.Pending
      });
      break;
    case TopicTreeStoreActionType.Set:
      result.set(sliceName, {
        ...state,
        payloadFromSetAction: action.payload,
        status: OperationStatus.Fulfilled
      });
      break;
  }

  return result;
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

export function useTopicTreeStoreStateContext (sliceName: string): State {
  return useContext(StateContext)!.get(sliceName)!;
}

export function useTopicTreeStoreDispatchContext () {
  return useContext(DispatchContext)!;
}
