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
  ArticleItemStoreActionType,
  type ArticleItemStoreActionUnion,
  type ArticleItemStoreState,
  OperationStatus,
  createOperationState,
  getModule,
  ArticleItemStoreSliceName
} from '../../../all';

type ActionUnion = ArticleItemStoreActionUnion;
type State = ArticleItemStoreState;
type StateMap = Map<string, State>;

const DispatchContext = createContext<Dispatch<ActionUnion> | null>(null);
const StateContext = createContext<StateMap | null>(null);

export const ArticleItemStoreContextProvider: React.FC<PropsWithChildren> = memo(
function ArticleItemStoreContextProvider ({
  children
}: PropsWithChildren) {
  const initialState = useRef(
    getModule().getStoreService().createInitialState<State>(
      [ArticleItemStoreSliceName.Global],
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
        case ArticleItemStoreActionType.Clear:
          result.set(sliceName, initialState.current.get(sliceName)!);
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

export function useArticleItemStoreStateContext (sliceName: string): State {
  return useContext(StateContext)!.get(sliceName)!;
}

export function useArticleItemStoreDispatchContext () {
  return useContext(DispatchContext)!;
}
