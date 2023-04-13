import React, {
  type Dispatch,
  type PropsWithChildren,
  createContext,
  memo,
  useContext,
  useReducer,
  useRef
} from 'react';
import {
  TopicTreeStoreActionType,
  type TopicTreeStoreActionUnion,
  type TopicTreeStoreState,
  OperationStatus,
  createOperationState,
  getModule,
  TopicTreeStoreSliceName
} from '../../../all';

type ActionUnion = TopicTreeStoreActionUnion;
type State = TopicTreeStoreState;
type StateMap = Map<string, State>;

const DispatchContext = createContext<Dispatch<ActionUnion> | null>(null);
const StateContext = createContext<StateMap | null>(null);

export const TopicTreeStoreContextProvider: React.FC<PropsWithChildren> = memo(
function TopicTreeStoreContextProvider ({
  children
}: PropsWithChildren) {
  const initialState = useRef(
    getModule().getStoreService().createInitialState<State>(
      [TopicTreeStoreSliceName.Global],
      () => createOperationState<State>({
        payloadFromLoadAction: null,
        payloadFromSetAction: null
      })
    )
  );

  const reducer = useRef(
    function (stateMap: StateMap, action: ActionUnion): StateMap {
      const result = new Map<string, State>(stateMap);
      const { sliceName, type } = action;
      const state = result.get(sliceName)!;

      switch (type) {
        case TopicTreeStoreActionType.Clear:
          result.set(sliceName, initialState.current.get(sliceName)!);
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
  );

  const [state, dispatch] = useReducer(reducer.current, initialState.current);

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
