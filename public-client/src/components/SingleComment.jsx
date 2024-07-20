import { format } from 'date-fns';
import Typography from './Typography';

function SingleComment({ comment = null }) {
  if (!comment) {
    return <div>No comment data</div>;
  }

  return (
    <div className="flex flex-col gap-4 pt-4">
      <div className="flex justify-between">
        <Typography type="smallerBold" className="whitespace-pre">
          {comment.author}
        </Typography>
        <Typography type="smaller">
          {format(comment.createdAt, "dd/MM/yyyy 'at' h:mma")}
        </Typography>
      </div>
      <Typography type="smaller">{comment.content}</Typography>
    </div>
  );
}

export default SingleComment;
