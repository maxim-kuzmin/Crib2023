import React, {
  type Dispatch,
  type PropsWithChildren,
  createContext,
  memo,
  useContext,
  useReducer,
} from 'react';
import {
  ArticleItemStoreActionType,
  type ArticleItemStoreActionUnion,
  type ArticleItemStoreState,
  OperationStatus,
  createOperationState
} from '../../../all';
import { getModule } from '../../../app/ModuleImpl';
import { ArticleItemStoreSliceName } from '../../../app/Stores';

type ActionUnion = ArticleItemStoreActionUnion;
type State = ArticleItemStoreState;
type StateMap = Map<string, State>;

const DispatchContext = createContext<Dispatch<ActionUnion> | null>(null);
const StateContext = createContext<StateMap | null>(null);

const initialState = getModule().getStoreService().createInitialState<State>(
  [ArticleItemStoreSliceName.Global],
  () => createOperationState<State>({
    payloadFromLoadAction: null,
    payloadFromSetAction: null
  })
);

function reducer (stateMap: StateMap, action: ActionUnion): StateMap {
  const result = new Map<string, State>(stateMap);
  const { sliceName, type } = action;
  const state = result.get(sliceName)!;

  switch (type) {
    case ArticleItemStoreActionType.Clear:
      result.set(sliceName, initialState.get(sliceName)!);
      break;
    case ArticleItemStoreActionType.Load:
      result.set(sliceName, {
        ...state,
        payloadFromLoadAction: action.payload,
        status: OperationStatus.Pending
      });
      break;
    case ArticleItemStoreActionType.Set:
      result.set(sliceName, {
        ...state,
        payloadFromSetAction: action.payload,
        status: OperationStatus.Fulfilled
      });
      break;
  }

  return result;
}

export const ArticleItemStoreContextProvider: React.FC<PropsWithChildren> = memo(
function ArticleItemStoreContextProvider ({
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

export function useArticleItemStoreStateContext (sliceName: string): State {
  return useContext(StateContext)!.get(sliceName)!;
}

export function useArticleItemStoreDispatchContext () {
  return useContext(DispatchContext)!;
}
