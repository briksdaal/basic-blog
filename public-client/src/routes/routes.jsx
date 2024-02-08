import App from '../App';
import HomePage from '../pages/home-page';
import PostPage from '../pages/post-page';
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
        path: '*',
        element: <ErrorPage />
      }
    ]
  }
];

export default routes;
