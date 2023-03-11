import React from 'react';
import ArticleItemStoreProvider from '../store/Article/Item/ArticleItemStoreProvider';
import ArticleListStoreProvider from '../store/Article/List/ArticleListStoreProvider';
import TopicItemStoreProvider from '../store/Topic/Item/TopicItemStoreProvider';
import TopicListStoreProvider from '../store/Topic/List/TopicListStoreProvider';

export default function AppStoreProvider ({ children }: React.PropsWithChildren) {
  return (
  <ArticleItemStoreProvider>
    <ArticleListStoreProvider>
    <TopicItemStoreProvider>
      <TopicListStoreProvider>
      {children}
      </TopicListStoreProvider>
    </TopicItemStoreProvider>
    </ArticleListStoreProvider>
  </ArticleItemStoreProvider>
  );
}
