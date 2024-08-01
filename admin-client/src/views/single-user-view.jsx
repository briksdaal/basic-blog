import FetchWrapper from '../components/FetchWrapper';

function SingleUserForm({ data }) {
  return <div>{data.user.handle}</div>;
}

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
