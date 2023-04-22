import React, { memo, type PropsWithChildren } from 'react';
import {
  AppNotificationStoreContextProvider,
  ArticleItemStoreContextProvider,
  ArticleListStoreContextProvider,
  TopicItemStoreContextProvider,
  TopicTreeStoreContextProvider
} from '../../stores';

export const StoresContextProvider: React.FC<PropsWithChildren> = memo(
function ContextProvider ({
  children
}: PropsWithChildren) {
  return (
    <AppNotificationStoreContextProvider>
      <ArticleItemStoreContextProvider>
        <ArticleListStoreContextProvider>
          <TopicItemStoreContextProvider>
            <TopicTreeStoreContextProvider>
              {children}
            </TopicTreeStoreContextProvider>
          </TopicItemStoreContextProvider>
        </ArticleListStoreContextProvider>
      </ArticleItemStoreContextProvider>
    </AppNotificationStoreContextProvider>
  );
});
