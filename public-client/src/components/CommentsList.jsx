import SingleComment from './SingleComment';

function CommentsList({ data }) {
  const comments = data?.comments;

  if (!comments || !comments.length) {
    return (
      <div>
        <h2 className="text-lg">No comments yet. Be the first to comment!</h2>
      </div>
    );
  }

  return (
    <div className="text-lg">
      {comments.map((c) => (
        <SingleComment key={c._id} comment={c} />
      ))}
    </div>
  );
}

export default CommentsList;
