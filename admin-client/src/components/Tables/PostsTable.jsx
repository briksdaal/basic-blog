import Typography from '../General/Typography';
import { format } from 'date-fns';

function PostsTable({ data }) {
  return (
    <>
      <Typography>Post Table</Typography>
      {data.posts.map((p) => (
        <div key={p._id} className="flex max-w-xl justify-between">
          <span>{p.title}</span>
          <span>{format(p.createdAt, "dd/MM/yyyy 'at' h:mma")}</span>
        </div>
      ))}
    </>
  );
}

export default PostsTable;
