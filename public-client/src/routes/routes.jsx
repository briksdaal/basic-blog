import App from '../App';
import HomePage from '../pages/home-page';
import PostPage from '../pages/post-page';
import AuthorPage from '../pages/author-page';
import ErrorPage from '../pages/error-page';

const routes = [
  {
    path: '/',
    element: <App />,
    children: [
      {
        index: true,
        element: <HomePage />
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
