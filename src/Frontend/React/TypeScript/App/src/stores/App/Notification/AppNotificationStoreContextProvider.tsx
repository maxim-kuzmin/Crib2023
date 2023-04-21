import React, {
  type PropsWithChildren,
  memo,
  useReducer,
} from 'react';
import { getModule } from '../../../app/ModuleImpl';
import { AppNotificationStoreSliceName, type AppNotificationStoreState } from '../../../app/Stores';
import { AppNotificationStoreActionType } from './AppNotificationStoreActionType';
import { type AppNotificationStoreActionUnion } from './AppNotificationStoreActionUnion';
import {
  AppNotificationStoreDispatchContext,
  AppNotificationStoreStateContext
} from './AppNotificationStoreContext';

const initialState = getModule().getStoreService().createInitialState<AppNotificationStoreState>(
  [AppNotificationStoreSliceName.AppNotificationView],
  () => ({
    payloadOfSetAction: null
  })
);

function reducer (
  stateMap: Map<string, AppNotificationStoreState>,
  action: AppNotificationStoreActionUnion
): Map<string, AppNotificationStoreState> {
  const result = new Map<string, AppNotificationStoreState>(stateMap);
  const { sliceName, type } = action;
  const state = result.get(sliceName)!;

  switch (type) {
    case AppNotificationStoreActionType.Clear:
      result.set(sliceName, initialState.get(sliceName)!);
      break;
    case AppNotificationStoreActionType.Set:
      result.set(
        sliceName,
        {
          ...state,
          payloadOfSetAction: action.payload
        }
      );
      break;
  }

  return result;
}

export const AppNotificationStoreContextProvider: React.FC<PropsWithChildren> = memo(
function AppNotificationStoreContextProvider ({
    children
  }: PropsWithChildren
) {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <AppNotificationStoreStateContext.Provider value={state}>
      <AppNotificationStoreDispatchContext.Provider value={dispatch}>
        {children}
      </AppNotificationStoreDispatchContext.Provider>
    </AppNotificationStoreStateContext.Provider>
  );
});
