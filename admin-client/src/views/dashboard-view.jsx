import useAuth from '../hooks/useAuth';
import PageTitle from '../components/General/PageTitle';
import Table from '../components/Tables/Table';

function DashboardView() {
  const { auth } = useAuth();

  const types = [
    { _id: 1, type: 'Posts', link: '/posts' },
    { _id: 2, type: 'Comments', link: '/comments' }
  ];

  if (auth?.admin) {
    types.push({ _id: 3, type: 'Users', link: '/users' });
  }

  return (
    <div>
      <PageTitle>JourneyJot Blog Management</PageTitle>
      <div>
        <Table
          data={types}
          columns={[
            {
              title: 'Type',
              field: 'type'
            }
          ]}
        />
      </div>
    </div>
  );
}

export default DashboardView;
