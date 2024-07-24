import App from '../App';
import HomePage from '../pages/home-page';
import ErrorPage from '../pages/error-page';
import Dashboard from '../pages/dashboard-page';
import ProtectedAccess from '../components/AuthComps/ProtectedAccess';

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
        element: <ProtectedAccess />,
        children: [
          {
            path: '/dashboard',
            element: <Dashboard />
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
