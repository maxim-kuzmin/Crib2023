import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { ContextProvider } from './app/ContextProvider';
import {
  ArticlePage,
  ArticlePageMode,
  NotFoundPage,
  TopicPage
} from './pages';
import { AppRootView } from './views/App';
import { reportWebVitals } from './reportWebVitals';
import './index.css';

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
      element: <ArticlePage mode={ArticlePageMode.New} />
    },
    {
      path: 'article/:articleId',
      element: <ArticlePage mode={ArticlePageMode.Display} />
    },
    {
      path: 'article/:articleId/edit',
      element: <ArticlePage mode={ArticlePageMode.Edit} />
    },
    {
      path: '*',
      element: <NotFoundPage />
    }
  ],
},
]);

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
      <ContextProvider>
        <RouterProvider router={router} />
      </ContextProvider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
