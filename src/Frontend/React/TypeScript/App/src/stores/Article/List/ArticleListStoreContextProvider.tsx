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
  ArticleListStoreActionType,
  type ArticleListStoreActionUnion,
  type ArticleListStoreState,
  OperationStatus,
  createOperationState,
  ArticleListStoreSliceName
} from '../../../all';
import { getModule } from '../../../app/Module/Impls';

type ActionUnion = ArticleListStoreActionUnion;
type State = ArticleListStoreState;
type StateMap = Map<string, State>;

const DispatchContext = createContext<Dispatch<ActionUnion> | null>(null);
const StateContext = createContext<StateMap | null>(null);

export const ArticleListStoreContextProvider: React.FC<PropsWithChildren> = memo(
function ArticleListStoreContextProvider ({
  children
}: PropsWithChildren) {
  const initialState = useRef(
    getModule().getStoreService().createInitialState<State>(
      [ArticleListStoreSliceName.Global],
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
        case ArticleListStoreActionType.Clear:
          result.set(sliceName, initialState.current.get(sliceName)!);
          break;
        case ArticleListStoreActionType.Load:
          result.set(sliceName, {
            ...state,
            payloadFromLoadAction: action.payload,
            status: OperationStatus.Pending
          });
          break;
        case ArticleListStoreActionType.Set:
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

export function useArticleListStoreStateContext (sliceName: string): State {
  return useContext(StateContext)!.get(sliceName)!;
}

export function useArticleListStoreDispatchContext () {
  return useContext(DispatchContext)!;
}
