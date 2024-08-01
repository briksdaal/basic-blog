import FetchWrapper from '../components/General/FetchWrapper';
import SinglePostForm from '../components/Forms/SinglePostForm';

function SinglePostView({ id }) {
  return (
    <div>
      <FetchWrapper
        Child={SinglePostForm}
        suffixUrl={`/posts/${id}`}
        title="Edit Post"
      />
    </div>
  );
}

export default SinglePostView;
