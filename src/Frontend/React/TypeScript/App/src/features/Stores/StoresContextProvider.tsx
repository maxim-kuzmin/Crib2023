import React, { memo, type PropsWithChildren } from 'react';
import {
  AppNotificationStoreContextProvider,
  ArticleItemStoreContextProvider,
  ArticleListStoreContextProvider,
  TopicItemStoreContextProvider,
  TopicTreeStoreContextProvider,
} from '../../stores';

export const StoresContextProvider: React.FC<PropsWithChildren> = memo(
function StoresContextProvider ({
  children
}: PropsWithChildren): React.ReactElement<PropsWithChildren> | null {
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
