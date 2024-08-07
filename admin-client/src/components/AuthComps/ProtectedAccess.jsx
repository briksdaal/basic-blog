import { Outlet, useLocation, useParams } from 'react-router-dom';
import useAuth from '../../hooks/useAuth';
import { Navigate } from 'react-router-dom';

function ProtectedAccess({ adminOnly }) {
  const { auth } = useAuth();
  const location = useLocation();
  const params = useParams();

  if (!auth.user) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  if (adminOnly && !auth.admin && params.id !== auth.id) {
    return <Navigate to="/unauthorized" state={{ from: location }} replace />;
  }

  return <Outlet />;
}

export default ProtectedAccess;
