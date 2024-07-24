import { Helmet } from 'react-helmet-async';
import UsersView from '../views/users-view';

function UsersPage() {
  return (
    <>
      <Helmet>
        <title>JourneyJot - Admin - Users</title>
      </Helmet>

      <UsersView />
    </>
  );
}

export default UsersPage;
