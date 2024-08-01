import FetchWrapper from '../components/General/FetchWrapper';
import SingleCommentForm from '../components/Forms/SingleCommentForm';

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
