import React, { type PropsWithChildren } from 'react';
import {
  AppNotificationStoreProvider,
  ArticleItemStoreProvider,
  ArticleListStoreProvider,
  TopicItemStoreProvider,
  TopicTreeStoreProvider
} from '../../all';

export const ContextProvider: React.FC<PropsWithChildren> = ({ children }: PropsWithChildren) => {
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
