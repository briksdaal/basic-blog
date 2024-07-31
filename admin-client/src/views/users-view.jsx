import FetchWrapper from '../components/FetchWrapper';
import UsersTable from '../components/Tables/UsersTable';
import PageTitle from '../components/General/PageTitle';

function UsersView() {
  return (
    <div>
      <PageTitle>Users</PageTitle>
      <FetchWrapper Child={UsersTable} suffixUrl={'/users'} />
    </div>
  );
}

export default UsersView;
