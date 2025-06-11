import { lazy, StrictMode, Suspense } from 'react';
import { createRoot } from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { Spin, ConfigProvider, ThemeConfig, theme } from 'antd';
import 'antd/dist/reset.css';
import '@ant-design/v5-patch-for-react-19';
import './index.css';
import AppPage from '@/pages/AppPage';
import NewsPage from '@/pages/NewsPage';

const ErrorPage = lazy(() => import('@/pages/ErrorPage'));

const router = createBrowserRouter([
  {
    element: <AppPage />,
    errorElement: (
      <Suspense fallback={<Spin />}>
        <ErrorPage errorCode={404} description="Страница не существует" hint="" />
      </Suspense>
    ),
    children: [
      {
        path: '/',
        element: <NewsPage />,
      },
    ],
  },
]);

const themeConfig: ThemeConfig = {
  algorithm: theme.defaultAlgorithm,
  cssVar: true,
};

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ConfigProvider theme={themeConfig}>
      <RouterProvider router={router} />
    </ConfigProvider>
  </StrictMode>,
);
