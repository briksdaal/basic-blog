import { Outlet } from 'react-router-dom';
import useAuth from '../../hooks/useAuth';
import useRefresh from '../../hooks/useRefresh';
import Loading from '../General/Loading';
import { useEffect, useState } from 'react';

function PersistentLogin() {
  const resfresh = useRefresh();
  const { auth } = useAuth();
  const [tryingToRefresh, setTryingToRefresh] = useState(true);

  useEffect(() => {
    function tryToRefresh() {
      resfresh().then(() => setTryingToRefresh(false));
    }

    if (!auth.token) {
      tryToRefresh();
    } else {
      setTryingToRefresh(false);
    }
  }, []);

  return tryingToRefresh ? <Loading /> : <Outlet />;
}

export default PersistentLogin;
