import App from '../App';
import HomePage from '../pages/home-page';
import ErrorPage from '../pages/error-page';
import Dashboard from '../pages/dashboard-page';

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
        path: '/dashboard',
        element: <Dashboard />
      },
      {
        path: '*',
        element: <ErrorPage />
      }
    ]
  }
];

export default routes;
