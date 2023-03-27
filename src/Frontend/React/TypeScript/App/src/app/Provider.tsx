import React, { type PropsWithChildren } from 'react';
import {
  AppNotificationStoreProvider,
  ArticleItemStoreProvider,
  ArticleListStoreProvider,
  TopicItemStoreProvider,
  TopicTreeStoreProvider
} from '../all';

export function Provider ({ children }: PropsWithChildren) {
  return (
    <AppNotificationStoreProvider>
      <ArticleItemStoreProvider>
        <ArticleListStoreProvider>
          <TopicItemStoreProvider>
            <TopicTreeStoreProvider>
              {children}
            </TopicTreeStoreProvider>
          </TopicItemStoreProvider>
        </ArticleListStoreProvider>
      </ArticleItemStoreProvider>
  </AppNotificationStoreProvider>
  );
}
