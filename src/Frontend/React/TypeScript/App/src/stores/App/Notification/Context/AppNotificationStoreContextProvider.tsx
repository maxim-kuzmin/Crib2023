import React, { type PropsWithChildren, memo, useReducer } from 'react';
import { createStoreStateMap } from '../../../../common';
import {
  AppNotificationStoreSliceName,
  type AppNotificationStoreState,
  type AppNotificationStoreStateMap,
  createAppNotificationStoreState,
} from '../../../../features';
import { AppNotificationStoreActionType } from '../AppNotificationStoreActionType';
import { type AppNotificationStoreActionUnion } from '../AppNotificationStoreActionUnion';
import {
  AppNotificationStoreDispatchContext,
  AppNotificationStoreStateContext
} from './AppNotificationStoreContextDefinition';

type StateMap = AppNotificationStoreStateMap;

const initialState: AppNotificationStoreStateMap = createStoreStateMap({
  functionToCreateState: () => createAppNotificationStoreState(),
  sliceNames: [AppNotificationStoreSliceName.Default],
});

function reducer (stateMap: StateMap, action: AppNotificationStoreActionUnion): StateMap {
  const result: StateMap = createStoreStateMap({ stateMap });
  const { sliceName, type } = action;

  let state: AppNotificationStoreState = result[sliceName];

  switch (type) {
    case AppNotificationStoreActionType.Clear:
      state = initialState[sliceName];
      break;
    case AppNotificationStoreActionType.Set:
      state = {
        ...state,
        payloadOfSetAction: action.payload
      };
      break;
  }

  result[sliceName] = state;

  return result;
}

export const AppNotificationStoreContextProvider: React.FC<PropsWithChildren> = memo(
function AppNotificationStoreContextProvider ({
  children
}: PropsWithChildren): React.ReactElement<PropsWithChildren> | null {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <AppNotificationStoreStateContext.Provider value={state}>
      <AppNotificationStoreDispatchContext.Provider value={dispatch}>
        {children}
      </AppNotificationStoreDispatchContext.Provider>
    </AppNotificationStoreStateContext.Provider>
  );
});
