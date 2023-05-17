import React from 'react';
import { type RouteObject, createBrowserRouter } from 'react-router-dom';
import { AppPage, ArticlePage, NotFoundPage, TopicPage } from '../pages';
import { ArticleItemViewMode } from '../views';

const routes: RouteObject[] = [{
  path: '/',
  element: <AppPage />,
  children: [
    {
      path: '',
      element: <TopicPage />
    },
    {
      path: 'topic/:topicId',
      element: <TopicPage />
    },
    {
      path: 'article',
      element: <ArticlePage mode={ArticleItemViewMode.New} />
    },
    {
      path: 'article/:articleId',
      element: <ArticlePage mode={ArticleItemViewMode.Display} />
    },
    {
      path: 'article/:articleId/edit',
      element: <ArticlePage mode={ArticleItemViewMode.Edit} />
    },
    {
      path: '*',
      element: <NotFoundPage />
    }
  ],
}];

export function createAppRouter () {
  return createBrowserRouter(routes);
}
