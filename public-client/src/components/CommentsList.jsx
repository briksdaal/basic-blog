import SingleComment from './SingleComment';
import Typography from './Typography';

function CommentsList({ data }) {
  const comments = data?.comments;

  return !comments || !comments.length ? (
    <Typography type="smaller" className="py-4">
      No comments yet. Be the first to comment!
    </Typography>
  ) : (
    <div className="flex flex-col gap-4 divide-y divide-slate-300 border-t border-slate-300 sm:max-w-xl">
      {comments.map((c) => (
        <SingleComment key={c._id} comment={c} />
      ))}
    </div>
  );
}

export default CommentsList;
