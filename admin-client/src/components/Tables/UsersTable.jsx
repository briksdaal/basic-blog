import Typography from '../General/Typography';
import { format } from 'date-fns';

function UsersTable({ data }) {
  return (
    <>
      <Typography>Users Table</Typography>
      {data.users.map((u) => (
        <div key={u._id} className="flex max-w-xl justify-between">
          <span>{u.handle}</span>
          {/* <span>{format(u.createdAt, "dd/MM/yyyy 'at' h:mma")}</span> */}
        </div>
      ))}
    </>
  );
}

export default UsersTable;
