import FetchWrapper from '../components/General/FetchWrapper';
import UsersTable from '../components/Tables/UsersTable';
import useAuth from '../hooks/useAuth';

function UsersView() {
  const { auth } = useAuth();

  return (
    <div>
      <FetchWrapper
        Child={UsersTable}
        suffixUrl={'/users'}
        title="Users"
        addNew={auth.admin}
      />
    </div>
  );
}

export default UsersView;
