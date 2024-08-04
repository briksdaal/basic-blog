import { Helmet } from 'react-helmet-async';
import CreateUserView from '../views/create-user-view';

function CreateUserPage() {
  return (
    <>
      <Helmet>
        <title>JourneyJot Admin - Create New User</title>
      </Helmet>

      <CreateUserView />
    </>
  );
}

export default CreateUserPage;
