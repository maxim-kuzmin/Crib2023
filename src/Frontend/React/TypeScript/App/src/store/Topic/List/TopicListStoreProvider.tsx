import React, { useReducer } from 'react';
import reducer, {
  TopicListStoreDispatchContext,
  TopicListStoreStateContext,
  initialTopicListStoreState,
} from './topicListStoreSlice';

export default function TopicListStoreProvider ({ children }: React.PropsWithChildren) {
  const [state, dispatch] = useReducer(reducer, initialTopicListStoreState);

  return (
    <TopicListStoreStateContext.Provider value={state}>
      <TopicListStoreDispatchContext.Provider value={dispatch}>
        {children}
      </TopicListStoreDispatchContext.Provider>
    </TopicListStoreStateContext.Provider>
  );
}
