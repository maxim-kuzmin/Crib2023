import React, { type PropsWithChildren } from 'react';
import {
  AppNotificationStoreProvider,
  ArticleItemStoreProvider,
  ArticleListStoreProvider,
  TopicItemStoreProvider,
  TopicPathStoreProvider,
  TopicTreeStoreProvider
} from '../../stores';

export function AppStoreProvider ({ children }: PropsWithChildren) {
  return (
    <AppNotificationStoreProvider>
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
  </AppNotificationStoreProvider>
  );
}
