import React, { memo, type PropsWithChildren } from 'react';
import { AppNotificationStoreContextProvider } from '../../stores/App/Notification/AppNotificationStoreContextProvider';
import { ArticleItemStoreContextProvider } from '../../stores/Article/Item/ArticleItemStoreContextProvider';
import { ArticleListStoreContextProvider } from '../../stores/Article/List/ArticleListStoreContextProvider';
import { TopicItemStoreContextProvider } from '../../stores/Topic/Item/TopicItemStoreContextProvider';
import { TopicTreeStoreContextProvider } from '../../stores/Topic/Tree/TopicTreeStoreContextProvider';

export const StoresContextProvider: React.FC<PropsWithChildren> = memo(
function StoresContextProvider ({
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
