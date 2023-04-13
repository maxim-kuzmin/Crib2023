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
  AppNotificationStoreActionType,
  type AppNotificationStoreActionUnion,
  type AppNotificationStoreState,
  getModule,
  AppNotificationStoreSliceName
} from '../../../all';

type ActionUnion = AppNotificationStoreActionUnion;
type State = AppNotificationStoreState;
type StateMap = Map<string, State>;

const DispatchContext = createContext<Dispatch<ActionUnion> | null>(null);
const StateContext = createContext<StateMap | null>(null);

export const AppNotificationStoreContextProvider: React.FC<PropsWithChildren> = memo(
function AppNotificationStoreContextProvider ({
  children
}: PropsWithChildren) {
  const initialState = useRef(
    getModule().getStoreService().createInitialState<State>(
      [AppNotificationStoreSliceName.Global],
      () => ({
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
        case AppNotificationStoreActionType.Clear:
          result.set(sliceName, initialState.current.get(sliceName)!);
          break;
        case AppNotificationStoreActionType.Set:
          result.set(sliceName, {
            ...state,
            payloadFromSetAction: action.payload,
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

export function useAppNotificationStoreStateContext (sliceName: string): State {
  return useContext(StateContext)!.get(sliceName)!;
}

export function useAppNotificationStoreDispatchContext () {
  return useContext(DispatchContext)!;
}
