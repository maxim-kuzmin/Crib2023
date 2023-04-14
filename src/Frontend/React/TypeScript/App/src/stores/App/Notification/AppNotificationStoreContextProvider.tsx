import React, {
  type Dispatch,
  type PropsWithChildren,
  createContext,
  memo,
  useContext,
  useReducer,
} from 'react';
import {
  AppNotificationStoreActionType,
  type AppNotificationStoreActionUnion,
  type AppNotificationStoreState,
} from '../../../all';
import { getModule } from '../../../app/ModuleImpl';
import { AppNotificationStoreSliceName } from '../../../app/Stores';

type ActionUnion = AppNotificationStoreActionUnion;
type State = AppNotificationStoreState;
type StateMap = Map<string, State>;

const DispatchContext = createContext<Dispatch<ActionUnion> | null>(null);
const StateContext = createContext<StateMap | null>(null);

const initialState = getModule().getStoreService().createInitialState<State>(
  [AppNotificationStoreSliceName.Global],
  () => ({ payloadFromSetAction: null })
);

function reducer (stateMap: StateMap, action: ActionUnion): StateMap {
  const result = new Map<string, State>(stateMap);
  const { sliceName, type } = action;
  const state = result.get(sliceName)!;

  switch (type) {
    case AppNotificationStoreActionType.Clear:
      result.set(sliceName, initialState.get(sliceName)!);
      break;
    case AppNotificationStoreActionType.Set:
      result.set(sliceName, { ...state, payloadFromSetAction: action.payload });
      break;
  }

  return result;
}

export const AppNotificationStoreContextProvider: React.FC<PropsWithChildren> = memo(
function AppNotificationStoreContextProvider ({
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

export function useAppNotificationStoreStateContext (sliceName: string): State {
  return useContext(StateContext)!.get(sliceName)!;
}

export function useAppNotificationStoreDispatchContext () {
  return useContext(DispatchContext)!;
}
