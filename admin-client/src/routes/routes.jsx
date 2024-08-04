import App from '../App';
import LoginPage from '../pages/login-page';
import ErrorPage from '../pages/error-page';
import DashboardPage from '../pages/dashboard-page';
import PostsPage from '../pages/posts-page';
import CommentsPage from '../pages/comments-page';
import UsersPage from '../pages/users-page';
import SinglePostPage from '../pages/single-post-page';
import SingleCommentPage from '../pages/single-comment-page';
import SingleUserPage from '../pages/single-user-page';
import CreateUserPage from '../pages/create-user-page';
import CreateCommentPage from '../pages/create-comment-page';
import CreatePostPage from '../pages/create-post-page';
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
                element: <DashboardPage />,
                handle: { crumb: { title: 'Dashboard' } }
              },
              {
                path: '/posts',

                handle: { crumb: { title: 'Posts' } },
                children: [
                  {
                    index: true,
                    element: <PostsPage />
                  },
                  {
                    path: 'new',
                    element: <CreatePostPage />,
                    handle: { crumb: { staticTitle: 'Create New Post' } }
                  },
                  {
                    path: ':id',
                    element: <SinglePostPage />,
                    handle: { crumb: { fetchTitle: true } }
                  }
                ]
              },
              {
                path: '/comments',
                handle: { crumb: { title: 'Comments' } },
                children: [
                  {
                    index: true,
                    element: <CommentsPage />
                  },
                  {
                    path: 'new',
                    element: <CreateCommentPage />,
                    handle: { crumb: { staticTitle: 'Create New Comment' } }
                  },
                  {
                    path: ':id',
                    element: <SingleCommentPage />,
                    handle: { crumb: { fetchTitle: true } }
                  }
                ]
              },
              {
                path: '/users',
                element: <ProtectedAccess adminOnly={true} />,
                handle: { crumb: { title: 'Users' } },
                children: [
                  {
                    index: true,
                    element: <UsersPage />
                  },
                  {
                    path: 'new',
                    element: <CreateUserPage />,
                    handle: { crumb: { staticTitle: 'Create User Comment' } }
                  },
                  {
                    path: ':id',
                    element: <SingleUserPage />,
                    handle: { crumb: { fetchTitle: true } }
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
