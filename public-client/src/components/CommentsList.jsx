import SingleComment from './SingleComment';

function CommentsList({ data }) {
  const comments = data?.comments;

  return (
    <div className="text-lg">
      {!comments || !comments.length
        ? 'No comments yet. Be the first to comment!'
        : comments.map((c) => <SingleComment key={c._id} comment={c} />)}
    </div>
  );
}

export default CommentsList;
