import { Outlet } from 'react-router-dom';
import useAuth from '../../hooks/useAuth';
import { Navigate } from 'react-router-dom';

function ProtectedAccess({ adminOnly }) {
  const { auth } = useAuth();

  if (!auth.user) {
    return <Navigate to="/login" />;
  }

  if (adminOnly && !auth.admin) {
    return <Navigate to="/unauthorized" />;
  }

  return <Outlet />;
}

export default ProtectedAccess;
