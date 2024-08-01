import FetchWrapper from '../components/General/FetchWrapper';
import UsersTable from '../components/Tables/UsersTable';

function UsersView() {
  return (
    <div>
      <FetchWrapper Child={UsersTable} suffixUrl={'/users'} title="Users" />
    </div>
  );
}

export default UsersView;
