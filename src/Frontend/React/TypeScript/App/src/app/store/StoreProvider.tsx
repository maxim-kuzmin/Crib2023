import React from 'react';
import {
  ArticleItemStoreProvider,
  ArticleListStoreProvider,
  TopicItemStoreProvider,
  TopicPathStoreProvider,
  TopicTreeStoreProvider
} from '../../stores';

export function StoreProvider ({ children }: React.PropsWithChildren) {
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
