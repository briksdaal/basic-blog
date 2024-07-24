import { Outlet } from 'react-router-dom';
import useAuth from '../../hooks/useAuth';
import { Navigate } from 'react-router-dom';

function ProtectedAccess() {
  const { auth } = useAuth();

  return auth.user ? <Outlet /> : <Navigate to="/login" />;
}

export default ProtectedAccess;
