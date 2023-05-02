import React, {
  type PropsWithChildren,
  memo,
  useReducer,
  useRef,
} from 'react';
import { useAppInstance } from '../../../app';
import {
  AppNotificationStoreSliceName,
  type AppNotificationStoreState
} from '../../../features';
import { AppNotificationStoreActionType } from './AppNotificationStoreActionType';
import { type AppNotificationStoreActionUnion } from './AppNotificationStoreActionUnion';
import {
  AppNotificationStoreDispatchContext,
  AppNotificationStoreStateContext
} from './AppNotificationStoreContext';

export const AppNotificationStoreContextProvider: React.FC<PropsWithChildren> = memo(
function AppNotificationStoreContextProvider ({
  children
}: PropsWithChildren): React.ReactElement<PropsWithChildren> | null {
  const { modules } = useAppInstance();

  const initialState = useRef(
    modules.Common.Store.getService().createInitialState<AppNotificationStoreState>(
      [AppNotificationStoreSliceName.AppNotificationView],
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
