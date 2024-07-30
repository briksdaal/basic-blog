import FetchWrapper from '../components/FetchWrapper';
import UsersTable from '../components/Tables/UsersTable';

function UsersView() {
  return (
    <div>
      <FetchWrapper Child={UsersTable} suffixUrl={'/users'} />
    </div>
  );
}

export default UsersView;
