import FetchWrapper from '../components/FetchWrapper';

function SingleCommentForm({ data }) {
  return <div>{data.comment.content}</div>;
}

function SingleCommentView({ id }) {
  return (
    <div>
      <FetchWrapper
        Child={SingleCommentForm}
        suffixUrl={`/comments/${id}`}
        title="Edit Comment"
      />
    </div>
  );
}

export default SingleCommentView;
