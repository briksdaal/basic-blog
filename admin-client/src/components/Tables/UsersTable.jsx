import Typography from '../General/Typography';
import { format } from 'date-fns';
import Table from './Table';

function UsersTable({ data }) {
  console.log(data);
  return (
    <div>
      <Typography>Users</Typography>
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
