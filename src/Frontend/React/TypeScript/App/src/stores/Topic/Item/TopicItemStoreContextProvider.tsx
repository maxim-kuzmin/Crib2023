import React, {
  type Dispatch,
  type PropsWithChildren,
  createContext,
  memo,
  useContext,
  useReducer,
} from 'react';
import {
  TopicItemStoreActionType,
  type TopicItemStoreActionUnion,
  type TopicItemStoreState,
  OperationStatus,
  createOperationState
} from '../../../all';
import { getModule } from '../../../app/ModuleImpl';
import { TopicItemStoreSliceName } from '../../../app/Stores';

type ActionUnion = TopicItemStoreActionUnion;
type State = TopicItemStoreState;
type StateMap = Map<string, State>;

const DispatchContext = createContext<Dispatch<ActionUnion> | null>(null);
const StateContext = createContext<StateMap | null>(null);

const initialState = getModule().getStoreService().createInitialState<State>(
  [TopicItemStoreSliceName.TopicItemView],
  () => createOperationState<State>({ payloadFromLoadAction: null, payloadFromSetAction: null })
);

function reducer (stateMap: StateMap, action: ActionUnion): StateMap {
  const result = new Map<string, State>(stateMap);
  const { sliceName, type } = action;
  const state = result.get(sliceName)!;

  switch (type) {
    case TopicItemStoreActionType.Clear:
      result.set(sliceName, initialState.get(sliceName)!);
      break;
    case TopicItemStoreActionType.Load:
      result.set(sliceName, { ...state, payloadFromLoadAction: action.payload, status: OperationStatus.Pending });
      break;
    case TopicItemStoreActionType.Set:
      result.set(sliceName, { ...state, payloadFromSetAction: action.payload, status: OperationStatus.Fulfilled });
      break;
  }

  return result;
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

export function useTopicItemStoreStateContext (sliceName: string): State {
  return useContext(StateContext)!.get(sliceName)!;
}

export function useTopicItemStoreDispatchContext () {
  return useContext(DispatchContext)!;
}
