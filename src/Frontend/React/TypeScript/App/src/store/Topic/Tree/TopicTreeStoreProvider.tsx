import React, { useReducer } from 'react';
import reducer, {
  TopicTreeStoreDispatchContext,
  TopicTreeStoreStateContext,
  initialTopicTreeStoreState,
} from './topicTreeStoreSlice';

export default function TopicTreeStoreProvider ({ children }: React.PropsWithChildren) {
  const [state, dispatch] = useReducer(reducer, initialTopicTreeStoreState);

  return (
    <TopicTreeStoreStateContext.Provider value={state}>
      <TopicTreeStoreDispatchContext.Provider value={dispatch}>
        {children}
      </TopicTreeStoreDispatchContext.Provider>
    </TopicTreeStoreStateContext.Provider>
  );
}
