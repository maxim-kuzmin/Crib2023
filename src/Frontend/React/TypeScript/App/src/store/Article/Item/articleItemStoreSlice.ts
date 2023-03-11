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

export type ArticleItemStoreAction =
  | ActionToClear
  | ActionToLoadStart
  | ActionToLoadEnd;

export enum ArticleItemStoreStatus {
  Fulfilled,
  Pending,
  Rejected
}

export interface ArticleItemStoreState {
  data: string
  input: number
  operationCode: string
  requestStatus: ArticleItemStoreStatus
  responseDetails: string
  responseErrors: string
  responseStatusCode: number
}

export const ArticleItemStoreDispatchContext = createContext<Dispatch<ArticleItemStoreAction> | null>(null);

export const ArticleItemStoreStateContext = createContext<ArticleItemStoreState | null>(null);

export const initialArticleItemStoreState: ArticleItemStoreState = {
  data: '',
  input: 0,
  operationCode: '',
  requestStatus: ArticleItemStoreStatus.Fulfilled,
  responseDetails: '',
  responseErrors: '',
  responseStatusCode: 200
}

export default function reducer (state: ArticleItemStoreState, action: ArticleItemStoreAction): ArticleItemStoreState {
  switch (action.type) {
    case ActionType.LoadStart: {
      const { payload } = action;
      return {
        ...state,
        input: payload,
        requestStatus: ArticleItemStoreStatus.Pending
      };
    }
    case ActionType.LoadEnd: {
      const { payload } = action;
      return {
        ...state,
        data: payload,
        requestStatus: ArticleItemStoreStatus.Fulfilled
      };
    }
    case ActionType.Clear: {
      return initialArticleItemStoreState;
    }
  }
}

export function useArticleItemStoreState () {
  return useContext(ArticleItemStoreStateContext)!;
}

function useDispatch () {
  return useContext(ArticleItemStoreDispatchContext)!;
}

export function useArticleItemStoreDispatchToClear () {
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

export function useArticleItemStoreDispatchToLoad (articleId: number) {
  const dispatch = useDispatch();

  useEffect(() => {
    (async () => {
      const actionToLoadStart: ActionToLoadStart = {
        type: ActionType.LoadStart,
        payload: articleId
      };

      dispatch(actionToLoadStart);

      const data = await (new Promise<string>((resolve, reject) => {
        setTimeout(() => { resolve(`ArticleItem, articleId=${articleId}: ${(new Date()).toString()}`); }, 1000)
      }));

      const actionToLoadEnd: ActionToLoadEnd = {
        type: ActionType.LoadEnd,
        payload: data
      };

      dispatch(actionToLoadEnd);
    })();
  }, [articleId]);
}
