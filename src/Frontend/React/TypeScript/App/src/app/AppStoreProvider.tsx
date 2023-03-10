import React from 'react';
import ArticlePageStoreProvider from '../pages/Article/ArticlePageStoreProvider';
import TopicPageStoreProvider from '../pages/Topic/TopicPageStoreProvider';

export default function AppStoreProvider ({ children }: React.PropsWithChildren) {
  return (
  <ArticlePageStoreProvider>
    <TopicPageStoreProvider>
      {children}
    </TopicPageStoreProvider>
  </ArticlePageStoreProvider>
  );
}
