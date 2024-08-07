import PageTitle from '../components/General/PageTitle';
import GoBack from '../components/General/GoBack';
import useAuth from '../hooks/useAuth';
import { Navigate } from 'react-router-dom';

function UnauthorizedView() {
  const { auth } = useAuth();

  if (auth.admin) {
    return <Navigate to="/dashboard" />;
  }
  return (
    <div>
      <PageTitle>You're not authorized to view this page</PageTitle>
      <GoBack />
    </div>
  );
}

export default UnauthorizedView;
