import Table from './Table';

function UsersTable({ data }) {
  return (
    <div>
      <Table
        data={data.users}
        columns={[
          {
            title: 'Handle',
            field: 'handle'
          },
          {
            title: 'Name',
            field: 'fullname'
          },
          {
            title: 'Admin',
            field: 'admin',
            fn: (v) => (v.admin ? 'Yes' : 'No')
          }
        ]}
        route="/users"
      />
    </div>
  );
}

export default UsersTable;
