import React from 'react';
import { createRoot } from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import { ContextProvider, createAppInstance, createAppSetup } from './app';
import { ArticlePage, NotFoundPage, TopicPage } from './pages';
import { AppRootView, ArticleItemViewMode } from './views';
import { reportWebVitals } from './reportWebVitals';

import './index.css';

const instanceOfApp = createAppInstance();

const setupOfApp = createAppSetup({ instanceOfApp });

setupOfApp.run();

const router = createBrowserRouter([{
  path: '/',
  element: <AppRootView />,
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
},
]);

const container = document.getElementById('root')!;
const root = createRoot(container);

root.render(
  <React.StrictMode>
    <HelmetProvider>
      <ContextProvider instanceOfApp={instanceOfApp}>
        <RouterProvider router={router} />
      </ContextProvider>
    </HelmetProvider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
