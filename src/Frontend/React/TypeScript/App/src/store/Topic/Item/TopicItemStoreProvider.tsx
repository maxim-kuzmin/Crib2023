import React, { useReducer } from 'react';
import reducer, {
  TopicItemStoreDispatchContext,
  TopicItemStoreStateContext,
  initialTopicItemStoreState,
} from './topicItemStoreSlice';

export default function TopicItemStoreProvider ({ children }: React.PropsWithChildren) {
  const [state, dispatch] = useReducer(reducer, initialTopicItemStoreState);

  return (
    <TopicItemStoreStateContext.Provider value={state}>
      <TopicItemStoreDispatchContext.Provider value={dispatch}>
        {children}
      </TopicItemStoreDispatchContext.Provider>
    </TopicItemStoreStateContext.Provider>
  );
}
