import React, {
  type PropsWithChildren,
  memo,
  useReducer,
  useRef,
} from 'react';
import { useAppInstance } from '../../../../app';
import {
  AppNotificationStoreKey,
  type AppNotificationStoreState
} from '../../../../features';
import { AppNotificationStoreActionType } from '../AppNotificationStoreActionType';
import { type AppNotificationStoreActionUnion } from '../AppNotificationStoreActionUnion';
import {
  AppNotificationStoreDispatchContext,
  AppNotificationStoreStateContext
} from './AppNotificationStoreContextDefinition';

export const AppNotificationStoreContextProvider: React.FC<PropsWithChildren> = memo(
function AppNotificationStoreContextProvider ({
  children
}: PropsWithChildren): React.ReactElement<PropsWithChildren> | null {
  const { modules } = useAppInstance();

  const initialState = useRef(
    modules.Common.Store.getService().createInitialState<AppNotificationStoreState>(
      [AppNotificationStoreKey.AppNotificationView],
      () => {
        const result: AppNotificationStoreState = {
          payloadOfSetAction: null
        };

        return result;
      }
    )
  ).current;

  const reducer = useRef(
    function (
      stateMap: Map<string, AppNotificationStoreState>,
      action: AppNotificationStoreActionUnion
    ): Map<string, AppNotificationStoreState> {
      const result = new Map<string, AppNotificationStoreState>(stateMap);
      const { storeKey, type } = action;
      const state = result.get(storeKey)!;

      switch (type) {
        case AppNotificationStoreActionType.Clear:
          result.set(storeKey, initialState.get(storeKey)!);
          break;
        case AppNotificationStoreActionType.Set:
          result.set(
            storeKey,
            {
              ...state,
              payloadOfSetAction: action.payload
            }
          );
          break;
      }

      return result;
    }
  ).current;

  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <AppNotificationStoreStateContext.Provider value={state}>
      <AppNotificationStoreDispatchContext.Provider value={dispatch}>
        {children}
      </AppNotificationStoreDispatchContext.Provider>
    </AppNotificationStoreStateContext.Provider>
  );
});
