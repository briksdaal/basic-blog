import { Navigate } from 'react-router-dom';
import App from '../App';
import HomePage from '../pages/home-page';
import PostPage from '../pages/post-page';
import AuthorPage from '../pages/author-page';
import ErrorPage from '../pages/error-page';
import ScrollToTop from '../components/ScrollToTop';

const routes = [
  {
    path: '/',
    element: (
      <>
        <ScrollToTop />
        <App />
      </>
    ),
    children: [
      {
        index: true,
        element: <HomePage />
      },
      {
        path: '/posts/',
        element: <Navigate to="/" replace={true} />
      },
      {
        path: '/posts/:postId',
        element: <PostPage />
      },
      {
        path: '/authors/:authorId',
        element: <AuthorPage />
      },
      {
        path: '*',
        element: <ErrorPage />
      }
    ]
  }
];

export default routes;
