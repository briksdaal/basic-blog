import App from '../App';
import LoginPage from '../pages/login-page';
import ErrorPage from '../pages/error-page';
import DashboardPage from '../pages/dashboard-page';
import UsersPage from '../pages/users-page';
import UnauthorizedPage from '../pages/unauthorized-page';
import ProtectedAccess from '../components/AuthComps/ProtectedAccess';
import { Navigate } from 'react-router-dom';

const routes = [
  {
    path: '/',
    element: <App />,
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
        element: <LoginPage />
      },
      {
        path: '*',
        element: <ErrorPage />
      }
    ]
  }
];

export default routes;
