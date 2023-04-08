import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import './index.css';
import {
  App,
  ArticlePage,
  NotFoundPage,
  ContextProvider,
  reportWebVitals,
  TopicPage
} from './all';

const router = createBrowserRouter([{
  path: '/',
  element: <App />,
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
      path: 'article/:articleId',
      element: <ArticlePage />
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
