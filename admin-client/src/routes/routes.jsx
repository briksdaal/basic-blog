import App from '../App';
import LoginPage from '../pages/login-page';
import ErrorPage from '../pages/error-page';
import DashboardPage from '../pages/dashboard-page';
import ProtectedAccess from '../components/AuthComps/ProtectedAccess';

const routes = [
  {
    path: '/',
    element: <App />,
    children: [
      {
        path: '/',
        element: <ProtectedAccess />,
        children: [
          {
            path: '/dashboard',
            element: <DashboardPage />
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
