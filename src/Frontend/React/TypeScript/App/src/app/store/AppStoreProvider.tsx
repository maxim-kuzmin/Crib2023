import React from 'react';
import ArticleItemStoreProvider from '../../store/Article/Item/ArticleItemStoreProvider';
import ArticleListStoreProvider from '../../store/Article/List/ArticleListStoreProvider';
import TopicItemStoreProvider from '../../store/Topic/Item/TopicItemStoreProvider';
import TopicPathStoreProvider from '../../store/Topic/Path/TopicPathStoreProvider';
import TopicTreeStoreProvider from '../../store/Topic/Tree/TopicTreeStoreProvider';

export default function AppStoreProvider ({ children }: React.PropsWithChildren) {
  return (
  <ArticleItemStoreProvider>
    <ArticleListStoreProvider>
      <TopicItemStoreProvider>
        <TopicPathStoreProvider>
          <TopicTreeStoreProvider>
            {children}
          </TopicTreeStoreProvider>
        </TopicPathStoreProvider>
      </TopicItemStoreProvider>
    </ArticleListStoreProvider>
  </ArticleItemStoreProvider>
  );
}
