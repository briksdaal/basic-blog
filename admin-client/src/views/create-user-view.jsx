import SingleUserForm from '../components/Forms/SingleUserForm';
import PageTitle from '../components/General/PageTitle';
import Breadcrumbs from '../components/General/Breadcrumbs';
import { useParams } from 'react-router-dom';

function CreateUserView() {
  return (
    <div>
      <Breadcrumbs />
      <PageTitle>Create New User</PageTitle>
      <SingleUserForm />
    </div>
  );
}

export default CreateUserView;
