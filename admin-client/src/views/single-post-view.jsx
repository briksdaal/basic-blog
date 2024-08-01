import FetchWrapper from '../components/FetchWrapper';

function SinglePostForm({ data }) {
  return <div>{data.post.title}</div>;
}

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
