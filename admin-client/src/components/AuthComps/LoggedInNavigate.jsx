import { Outlet, useLocation, Navigate } from 'react-router-dom';
import useAuth from '../../hooks/useAuth';

function LoggedInNavigate() {
  const { auth } = useAuth();
  const location = useLocation();

  const from = location.state?.from?.pathname || '/';

  return auth?.user ? <Navigate to={from} replace={true} /> : <Outlet />;
}

export default LoggedInNavigate;
