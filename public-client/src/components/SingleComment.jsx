function SingleComment({ comment = null }) {
  if (!comment) {
    return <div>No comment data</div>;
  }

  return (
    <div className="text-md">
      <p>{comment.author}</p>
      <p>{comment.content}</p>
    </div>
  );
}

export default SingleComment;
