import React from 'react';
import {
  ArticleItemStoreProvider,
  ArticleListStoreProvider
} from '../Article';
import {
  TopicItemStoreProvider,
  TopicPathStoreProvider,
  TopicTreeStoreProvider
} from '../Topic';
import {
  AppNotificationStoreProvider
} from './Notification';

export function AppStoreProvider ({ children }: React.PropsWithChildren) {
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
