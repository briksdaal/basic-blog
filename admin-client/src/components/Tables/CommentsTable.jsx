import Typography from '../General/Typography';
import { format } from 'date-fns';

function CommentsTable({ data }) {
  return (
    <>
      <Typography>Comments Table</Typography>
      {data.comments.map((c) => (
        <div key={c._id} className="flex max-w-xl justify-between">
          <span>{c.author}</span>
          <span>{format(c.createdAt, "dd/MM/yyyy 'at' h:mma")}</span>
        </div>
      ))}
    </>
  );
}

export default CommentsTable;
