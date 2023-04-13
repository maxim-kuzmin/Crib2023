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
  TopicItemStoreActionType,
  type TopicItemStoreActionUnion,
  type TopicItemStoreState,
  OperationStatus,
  createOperationState,
  getModule,
  TopicItemStoreSliceName
} from '../../../all';

type ActionUnion = TopicItemStoreActionUnion;
type State = TopicItemStoreState;
type StateMap = Map<string, State>;

const DispatchContext = createContext<Dispatch<ActionUnion> | null>(null);
const StateContext = createContext<StateMap | null>(null);

export const TopicItemStoreContextProvider: React.FC<PropsWithChildren> = memo(
function TopicItemStoreContextProvider ({
  children
}: PropsWithChildren) {
  const initialState = useRef(
    getModule().getStoreService().createInitialState<State>(
      [TopicItemStoreSliceName.Global],
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
        case TopicItemStoreActionType.Clear:
          result.set(sliceName, initialState.current.get(sliceName)!);
          break;
        case TopicItemStoreActionType.Load:
          result.set(sliceName, {
            ...state,
            payloadFromLoadAction: action.payload,
            status: OperationStatus.Pending
          });
          break;
        case TopicItemStoreActionType.Set:
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

export function useTopicItemStoreStateContext (sliceName: string): State {
  return useContext(StateContext)!.get(sliceName)!;
}

export function useTopicItemStoreDispatchContext () {
  return useContext(DispatchContext)!;
}
