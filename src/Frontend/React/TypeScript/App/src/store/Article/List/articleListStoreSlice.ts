import { useContext, createContext, type Dispatch, useEffect } from 'react';

enum ActionType {
  Clear,
  LoadEnd,
  LoadStart
}

interface ActionToClear {
  type: ActionType.Clear
}

interface ActionToLoadEnd {
  type: ActionType.LoadEnd
  payload: string
}

interface ActionToLoadStart {
  type: ActionType.LoadStart
  payload: number
}

export type ArticleListStoreAction =
  | ActionToClear
  | ActionToLoadStart
  | ActionToLoadEnd;

export enum ArticleListStoreStatus {
  Fulfilled,
  Pending,
  Rejected
}

export interface ArticleListStoreState {
  data: string
  input: number
  operationCode: string
  requestStatus: ArticleListStoreStatus
  responseDetails: string
  responseErrors: string
  responseStatusCode: number
}

export const ArticleListStoreDispatchContext = createContext<Dispatch<ArticleListStoreAction> | null>(null);

export const ArticleListStoreStateContext = createContext<ArticleListStoreState | null>(null);

export const initialArticleListStoreState: ArticleListStoreState = {
  data: '',
  input: 0,
  operationCode: '',
  requestStatus: ArticleListStoreStatus.Fulfilled,
  responseDetails: '',
  responseErrors: '',
  responseStatusCode: 200
}

export default function reducer (state: ArticleListStoreState, action: ArticleListStoreAction): ArticleListStoreState {
  switch (action.type) {
    case ActionType.LoadStart: {
      const { payload } = action;
      return {
        ...state,
        input: payload,
        requestStatus: ArticleListStoreStatus.Pending
      };
    }
    case ActionType.LoadEnd: {
      const { payload } = action;
      return {
        ...state,
        data: payload,
        requestStatus: ArticleListStoreStatus.Fulfilled
      };
    }
    case ActionType.Clear: {
      return initialArticleListStoreState;
    }
  }
}

export function useArticleListStoreState () {
  return useContext(ArticleListStoreStateContext)!;
}

function useDispatch () {
  return useContext(ArticleListStoreDispatchContext)!;
}

export function useArticleListStoreDispatchToClear () {
  const dispatch = useDispatch();

  useEffect(() => {
    const actionToClear: ActionToClear = {
      type: ActionType.Clear
    };

    return () => {
      dispatch(actionToClear);
    };
  }, []);
}

export function useArticleListStoreDispatchToLoad (topicId: number) {
  const dispatch = useDispatch();

  useEffect(() => {
    (async () => {
      const actionToLoadStart: ActionToLoadStart = {
        type: ActionType.LoadStart,
        payload: topicId
      };

      dispatch(actionToLoadStart);

      const data = await (new Promise<string>((resolve, reject) => {
        setTimeout(() => { resolve(`ArticleList, topicId=${topicId}: ${(new Date()).toString()}`); }, 1000)
      }));

      const actionToLoadEnd: ActionToLoadEnd = {
        type: ActionType.LoadEnd,
        payload: data
      };

      dispatch(actionToLoadEnd);
    })();
  }, [topicId]);
}
