import React, { useReducer } from 'react';
import reducer, {
  TopicPathStoreDispatchContext,
  TopicPathStoreStateContext,
  initialTopicPathStoreState,
} from './topicPathStoreSlice';

export default function TopicPathStoreProvider ({ children }: React.PropsWithChildren) {
  const [state, dispatch] = useReducer(reducer, initialTopicPathStoreState);

  return (
    <TopicPathStoreStateContext.Provider value={state}>
      <TopicPathStoreDispatchContext.Provider value={dispatch}>
        {children}
      </TopicPathStoreDispatchContext.Provider>
    </TopicPathStoreStateContext.Provider>
  );
}
