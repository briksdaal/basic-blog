import FetchWrapper from '../components/General/FetchWrapper';
import SingleUserForm from '../components/Forms/SingleUserForm';

function SingleUserView({ id }) {
  return (
    <div>
      <FetchWrapper
        Child={SingleUserForm}
        suffixUrl={`/users/${id}`}
        title="Edit User"
      />
    </div>
  );
}

export default SingleUserView;
