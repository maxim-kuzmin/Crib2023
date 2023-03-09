import React from 'react';
import ArticleViewStoreProvider from '../views/Article/ArticleViewStoreProvider';
import TopicViewStoreProvider from '../views/Topic/TopicViewStoreProvider';

export default function AppStoreProvider ({ children }: React.PropsWithChildren) {
  return (
  <ArticleViewStoreProvider>
    <TopicViewStoreProvider>
      {children}
    </TopicViewStoreProvider>
  </ArticleViewStoreProvider>
  );
}
