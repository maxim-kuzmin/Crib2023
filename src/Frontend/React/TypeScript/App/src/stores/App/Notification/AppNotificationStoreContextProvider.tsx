import React, {
  type Dispatch,
  type PropsWithChildren,
  createContext,
  memo,
  useContext,
  useReducer
} from 'react';
import {
  AppNotificationStoreActionType,
  type AppNotificationStoreActionUnion,
  type AppNotificationStoreState,
} from '../../../all';

type ActionUnion = AppNotificationStoreActionUnion;
type State = AppNotificationStoreState;

const DispatchContext = createContext<Dispatch<ActionUnion> | null>(null);
const StateContext = createContext<State | null>(null);

const initialState: State = {
  data: null
};

function reducer (state: State, action: ActionUnion): State {
  switch (action.type) {
    case AppNotificationStoreActionType.Clear: {
      return initialState;
    }
    case AppNotificationStoreActionType.Set: {
      return {
        ...state,
        data: action.payload
      };
    }
  }
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

export function useAppNotificationStoreStateContext () {
  return useContext(StateContext)!;
}

export function useAppNotificationStoreDispatchContext () {
  return useContext(DispatchContext)!;
}
