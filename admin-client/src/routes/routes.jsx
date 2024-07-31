import App from '../App';
import LoginPage from '../pages/login-page';
import ErrorPage from '../pages/error-page';
import DashboardPage from '../pages/dashboard-page';
import PostsPage from '../pages/posts-page';
import CommentsPage from '../pages/comments-page';
import UsersPage from '../pages/users-page';
import UnauthorizedPage from '../pages/unauthorized-page';
import ProtectedAccess from '../components/AuthComps/ProtectedAccess';
import PersistentLogin from '../components/AuthComps/PersistentLogin';
import LoggedInNavigate from '../components/AuthComps/LoggedInNavigate';
import { Navigate } from 'react-router-dom';
import { element } from 'prop-types';

const routes = [
  {
    path: '/',
    element: <App />,
    children: [
      {
        path: '/',
        element: <PersistentLogin />,
        children: [
          {
            path: '/',
            element: <ProtectedAccess />,
            children: [
              { index: true, element: <Navigate to="/dashboard" /> },
              {
                path: '/dashboard',
                element: <DashboardPage />
              },
              {
                path: '/posts',
                element: <PostsPage />
              },
              {
                path: '/comments',
                element: <CommentsPage />
              },
              {
                path: '/users',
                element: <ProtectedAccess adminOnly={true} />,
                children: [
                  {
                    index: true,
                    element: <UsersPage />
                  }
                ]
              },
              {
                path: '/unauthorized',
                element: <UnauthorizedPage />
              }
            ]
          },
          {
            path: '/login',
            element: <LoggedInNavigate />,
            children: [
              {
                index: true,
                element: <LoginPage />
              }
            ]
          }
        ]
      },
      {
        path: '*',
        element: <ErrorPage />
      }
    ]
  }
];

export default routes;
